import axios, { AxiosResponse } from 'axios'
import { Service } from '../../types/frontendTypes'
import dayjs from 'dayjs'

// Function to reformat room service request data 
function reformatRoomServiceRequestData(data: Service): any {
    const roomService = {
        Cost: parseFloat(String(data.Cost)),
        ServiceDescription: data.ServiceDescription,
        ExpenseDate: dayjs(data.ExpenseDate).format('YYYY-MM-DD'),
        Notes: data.Notes,
        FundingAccount: data.FundingAccount,
        MainEvent: data.MainEvent,
        Finance: data.Finance,
    }
    return roomService
}

// Function to reformat room serive response data
function reformatRoomServiceResponseData(data: any): Service {
    const roomService: Service = {
        ...defaultRoomService,
        RecordID: data.id || defaultRoomService.RecordID,
        Cost: data.Cost || defaultRoomService.Cost,
        ServiceDescription:
            data.ServiceDescription || defaultRoomService.ServiceDescription,
        Notes: data.Notes || defaultRoomService.Notes,
        ExpenseDate: data.ExpenseDate
            ? dayjs(data.ExpenseDate)
            : defaultRoomService.ExpenseDate,
        FundingAccount: data.FundingAccount || defaultRoomService.FundingAccount,
        MainEvent: data.MainEvent || defaultRoomService.MainEvent,
        Finance: data.Finance || defaultRoomService.Finance,
    }
    return roomService
}

// Default room service object
export const defaultRoomService: Service = {
    RecordID: '',
    Cost: 0,
    ServiceDescription: '',
    Notes: '',
    ExpenseDate: dayjs(),
    FundingAccount: [],
    MainEvent: [],
    Finance: [],
}

// Function to get room services by event ID
export async function getRoomServicesByEventID(
    mainEventId: string
): Promise<Service[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SERVICE_API_PATH}`
        )
        const rawRoomServices = res.data
        const formattedRoomServices = rawRoomServices
            .filter((roomService: any) =>
                roomService.MainEvent?.includes(mainEventId)
            )
            .map((roomService: any) => reformatRoomServiceResponseData(roomService))
        console.log("in functions" + formattedRoomServices)
        return formattedRoomServices
    } catch (error) {
        console.error('Error fetching room services:', error)
        return []
    }
}

// Function to create room service
export async function createRoomService(
    roomService: Service,
    id: string
) {
    try {
        roomService.MainEvent.push(id)
        const formatedRoomService = reformatRoomServiceRequestData(roomService)
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SERVICE_API_PATH}`,
            formatedRoomService
        )
        return res.data
    } catch (error) {
        console.error('Error creating room service:', error)
        throw error
    }
}

// Function to update a room service
export async function updateRomServiceByID(
    roomService: Service
): Promise<AxiosResponse> {
    try {
        const recordID = roomService.RecordID
        const formatedRoomService = reformatRoomServiceRequestData(roomService)
        const res = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SERVICE_API_PATH}/${recordID}`,
            formatedRoomService
        )
        return res 
    } catch (error) {
        console.error('Error updating room service:', error)
        throw error
    }
}

// Function to delete a room service
export async function deleteRoomServiceByID(id: string) {
    try {
        const res = await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SERVICE_API_PATH}/${id}`
        )
        return res.status
    } catch (error) {
        console.error('Error deleting room service by ID:', error)
    }
}