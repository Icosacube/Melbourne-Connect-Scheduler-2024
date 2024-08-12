import axios from 'axios';
import {FundingAccount} from '../../types/frontendTypes';
import dayjs from 'dayjs';

// Function to reformat funding account response data
function reformatFundingAccountResponseData(data: any): FundingAccount {
    const fundingAccount: FundingAccount = {
        ...defaultFundingAccount,
        RecordID: data.id || defaultFundingAccount.RecordID,
        ThemisString: data.ThemisString || defaultFundingAccount.ThemisString,
        Description: data.Description || defaultFundingAccount.Description,
        AccountUser:
            data.AccountUser || defaultFundingAccount.AccountUser,
        AccountType: data.AccountType || defaultFundingAccount.AccountType,
        Notes: data.Notes || defaultFundingAccount.Notes,
        Limit: data.Limit || defaultFundingAccount.Limit,
        ExpiryDate: data.ExpiryDate ? dayjs(data.ExpiryDate) : defaultFundingAccount.ExpiryDate,
        Accommodation: data.Accommodation || defaultFundingAccount.Accommodation,
        Miscellaneous: data.Miscellaneous || defaultFundingAccount.Miscellaneous,
        Venue: data.Venue || defaultFundingAccount.Venue,
        Catering: data.Catering || defaultFundingAccount.Catering,
        Flight: data.Flight || defaultFundingAccount.Flight,
        Service: data.Service || defaultFundingAccount.Service,
    };
    return fundingAccount;
}

// Default funding account object
export const defaultFundingAccount: FundingAccount = {
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
};

// Function to get all funding accounts
export async function getFundingAccounts(): Promise<FundingAccount[]> {
    try {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/funding-accounts');
        const rawFundingAccounts = res.data;
        const formattedFundingAccounts = rawFundingAccounts.map((event: any) =>
            reformatFundingAccountResponseData(event),
        );
        return formattedFundingAccounts;
    } catch (error) {
        console.error('Error fetching all funding accounts', error);
        return [];
    }
}