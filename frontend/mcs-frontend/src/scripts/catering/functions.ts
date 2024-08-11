import axios, { AxiosResponse } from 'axios'
import { Catering } from '../../types/frontendTypes'
import dayjs from 'dayjs'

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

// Function to get all catering
export async function getCateringByEventID(id: string): Promise<Catering[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/catering/${id}`
        )
        const rawCatering = res.data
        const formattedCatering = rawCatering.map((catering: any) =>
            reformatCateringResponseData(catering)
        )
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
): Promise<AxiosResponse> {
    try {
        const toSend: any = {
            ...catering,
            ExpenseDate: dayjs(catering.ExpenseDate).format('YYYY-MM-DD'),
            Cost: parseFloat(String(catering.Cost)),
        }
        delete toSend.RecordID
        console.log(toSend)
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/catering/${id}`,
            toSend
        )
        return res
    } catch (error) {
        console.error('Error creating catering:', error)
        throw error
    }
}
