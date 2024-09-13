import axios, { AxiosResponse } from 'axios'
import { Catering } from '../../types/frontendTypes'
import dayjs from 'dayjs'

// Function to reformat catering request data 
function reformatCateringRequestData(data: Catering): any {
    const catering = {
        BookingReference: data.BookingReference,
        Description: data.Description,
        Cost: parseFloat(String(data.Cost)),
        ExpenseDate: dayjs(data.ExpenseDate).format('YYYY-MM-DD'),
        FundingAccount: data.FundingAccount,
        MainEvent: data.MainEvent,
        Finance: data.Finance,
    }
    return catering
}

// Function to reformat catering response data
function reformatCateringResponseData(data: any): Catering {
    const catering: Catering = {
        ...defaultCatering,
        RecordID: data.id || defaultCatering.RecordID,
        BookingReference:
            data.BookingReference || defaultCatering.BookingReference,
        Description: data.Description || defaultCatering.Description,
        Cost: data.Cost || defaultCatering.Cost,
        ExpenseDate: data.ExpenseDate
            ? dayjs(data.ExpenseDate)
            : defaultCatering.ExpenseDate,
        FundingAccount: data.FundingAccount || defaultCatering.FundingAccount,
        MainEvent: data.MainEvent || defaultCatering.MainEvent,
        Finance: data.Finance || defaultCatering.Finance,
    }
    return catering
}

// Default catering object
export const defaultCatering: Catering = {
    RecordID: '',
    BookingReference: '',
    Description: '',
    Cost: 0,
    ExpenseDate: dayjs(),
    FundingAccount: [],
    MainEvent: [],
    Finance: [],
}

// Function to get catering by event ID
export async function getCateringByEventID(
    mainEventId: string
): Promise<Catering[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CATERING_API_PATH}`
        )
        const rawCatering = res.data
        const formattedCatering = rawCatering
            .filter((catering: any) =>
                catering.MainEvent?.includes(mainEventId)
            )
            .map((catering: any) => reformatCateringResponseData(catering))
        return formattedCatering
    } catch (error) {
        console.error('Error fetching catering:', error)
        return []
    }
}

// Function to create catering entry
export async function createCatering(
    catering: Catering,
    id: string
) {
    try {
        catering.MainEvent.push(id)
        const toSend: any = {
            ...catering,
            ExpenseDate: dayjs(catering.ExpenseDate).format('YYYY-MM-DD'),
            Cost: parseFloat(String(catering.Cost)),
        }
        delete toSend.RecordID
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CATERING_API_PATH}`,
            toSend
        )
        return res.data
    } catch (error) {
        console.error('Error creating catering:', error)
        throw error
    }
}

// Function to update a catering entry
export async function updateCateringByID(
    catering: Catering
): Promise<AxiosResponse> {
    try {
        const recordID = catering.RecordID
        const formattedCatering = reformatCateringRequestData(catering)
        const res = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CATERING_API_PATH}/${recordID}`,
            formattedCatering
        )
        return res 
    } catch (error) {
        console.error('Error updating catering:', error)
        throw error
    }
}

// Function to delete a catering entry
export async function deleteCateringByID(id: string) {
    try {
        const res = await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CATERING_API_PATH}/${id}`
        )
        return res.status
    } catch (error) {
        console.error('Error deleting catering by ID:', error)
    }
}
