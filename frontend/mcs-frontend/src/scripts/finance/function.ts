import axios from 'axios'
import dayjs from 'dayjs'
import { Finance } from '../../types/frontendTypes'

// Default Finance object
export const defaultFinance: Finance = {
    RecordID: '',
    MainEvent: '',
    ExpenseCategory: '',
    ExpenseDescription: '',
    Cost: 0,
    ExpenseDate: dayjs(),
    FundingAccount: '',
}

// Function to reformat Finance response data
function reformatFinanceResponseData(data: any): Finance {
    const finance: Finance = {
        ...defaultFinance,
        RecordID: data.id || defaultFinance.RecordID,
        MainEvent: data.MainEvent || defaultFinance.MainEvent,
        ExpenseCategory: data.ExpenseCategory || defaultFinance.ExpenseCategory,
        ExpenseDescription:
            data.ExpenseDescription || defaultFinance.ExpenseDescription,
        Cost: data.Cost || defaultFinance.Cost,
        ExpenseDate: data.ExpenseDate
            ? dayjs(data.ExpenseDate)
            : defaultFinance.ExpenseDate,
        FundingAccount: data.FundingAccount || defaultFinance.FundingAccount,
    }

    return finance
}

// Function to get all Finance records
export async function getAllFinance(): Promise<Finance[]> {
    try {
        const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + '/finance'
        )
        const rawFinanceData = res.data
        const formattedFinanceData = rawFinanceData.map((finance: any) =>
            reformatFinanceResponseData(finance)
        )
        return formattedFinanceData
    } catch (error) {
        console.error('Error fetching all finance records:', error)
        return []
    }
}
