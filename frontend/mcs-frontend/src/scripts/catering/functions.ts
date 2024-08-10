import axios, {AxiosResponse} from 'axios';
import {Catering} from '../../types/frontendTypes';

// Function to reformat catering response data
function reformatCateringResponseData(data: any): Catering {
    const catering: Catering
        = {
        ...defaultCatering,
        RecordID: data.id || defaultCatering.RecordID,
        BookingReference: data.BookingReference || defaultCatering.BookingReference,
        Description: data.Description || defaultCatering.Description,
        Cost: data.Cost || defaultCatering.Cost,
        FundingAccount: data.FundingAccount || defaultCatering.FundingAccount,
        MainEvent: data.MainEvent || defaultCatering.MainEvent,
    };
    return catering;
}

// Default catering object
export const defaultCatering: Catering = {
    RecordID: '',
    BookingReference: 0,
    Description: '',
    Cost: 0,
    FundingAccount: '',
    MainEvent: '',
};

// Function to get all catering
export async function getCateringByEventID(id: string): Promise<Catering[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/catering/${id}`,
        );
        const rawCatering = res.data;
        const formattedCatering = rawCatering.map((catering: any) =>
            reformatCateringResponseData(catering),
        );
        return formattedCatering;
    } catch (error) {
        console.error('Error fetching catering:', error);
        return [];
    }
}
