import axios from 'axios'
import { FundingAccount as fundingAccountFrontend } from '../../types/frontendTypes'
import { FundingAccount as fundingAccountBackend } from '../../types/backendTypes'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

// Default funding account object
export const defaultFundingAccount: fundingAccountFrontend = {
    RecordID: '',
    ThemisString: '',
    Description: '',
    AccountUser: '',
    AccountType: '',
    Notes: '',
    Limit: 0,
    ExpiryDate: dayjs(),
    Accommodation: [],
    Miscellaneous: [],
    Venue: [],
    Catering: [],
    Flight: [],
    Service: [],
}

// Get all funding accounts
export async function getAllFundingAccounts(): Promise<
    fundingAccountFrontend[]
> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FUNDINGACCOUNT_API_PATH}`
        )
        const rawFundingAccounts = res.data
        const formattedFundingAccounts = rawFundingAccounts.map(
            (account: any) => reformatFundingAccountResponse(account)
        )
        console.log(formattedFundingAccounts)
        return formattedFundingAccounts
    } catch (error) {
        console.error('Error fetching all funding accounts:', error)
        return []
    }
}

// Get a specific funding account by its ID
export async function getFundingAccountByID(
    accountID: string
): Promise<fundingAccountFrontend | null> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FUNDINGACCOUNT_API_PATH}/${accountID}`
        )
        const fundingAccount = reformatFundingAccountResponse(res.data)
        console.log(fundingAccount)
        return fundingAccount
    } catch (error) {
        console.error('Error fetching the funding account:', error)
        return null
    }
}

// Function to reformat FundingAccount request data
function reformatFundingAccountRequest(
    fundingAccount: fundingAccountFrontend
): fundingAccountBackend {
    return {
        ThemisString: fundingAccount.ThemisString,
        Description: fundingAccount.Description,
        AccountUser: fundingAccount.AccountUser,
        AccountType: fundingAccount.AccountType,
        Notes: fundingAccount.Notes,
        Limit: Number(fundingAccount.Limit),
        ExpiryDate: fundingAccount.ExpiryDate.tz('Australia/Melbourne')
            .utc()
            .toString(),
        Accommodation: fundingAccount.Accommodation,
        Miscellaneous: fundingAccount.Miscellaneous,
        Venue: fundingAccount.Venue,
        Catering: fundingAccount.Catering,
        Flight: fundingAccount.Flight,
        Service: fundingAccount.Service,
    }
}

// Function to reformat FundingAccount response data
function reformatFundingAccountResponse(data: any): fundingAccountFrontend {
    const fundingAccount: fundingAccountFrontend = {
        ...defaultFundingAccount,
        RecordID: data.id || defaultFundingAccount.RecordID,
        ThemisString: data.ThemisString || defaultFundingAccount.ThemisString,
        Description: data.Description || defaultFundingAccount.Description,
        AccountUser: data.AccountUser || defaultFundingAccount.AccountUser,
        AccountType: data.AccountType || defaultFundingAccount.AccountType,
        Notes: data.Notes || defaultFundingAccount.Notes,
        Limit: data.Limit || defaultFundingAccount.Limit,
        ExpiryDate: data.ExpiryDate
            ? dayjs(data.ExpiryDate).utc().tz('Australia/Melbourne')
            : defaultFundingAccount.ExpiryDate,
        Accommodation:
            data.Accommodation || defaultFundingAccount.Accommodation,
        Miscellaneous:
            data.Miscellaneous || defaultFundingAccount.Miscellaneous,
        Venue: data.Venue || defaultFundingAccount.Venue,
        Catering: data.Catering || defaultFundingAccount.Catering,
        Flight: data.Flight || defaultFundingAccount.Flight,
        Service: data.Service || defaultFundingAccount.Service,
    }
    return fundingAccount
}
