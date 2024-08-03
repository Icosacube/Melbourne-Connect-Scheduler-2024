import dayjs from 'dayjs';
import { Accommodation } from '../../types/types';
import axios from 'axios';

// Function to reformat Accommodation response data
function reformatAccommodationResponseData(data: any): Accommodation {
  const accommodation: Accommodation = {
    ...defaultAccommodation,
    RecordID: data.id || defaultAccommodation.RecordID,
    BookingReference:
      data.BookingReference || defaultAccommodation.BookingReference,
    HotelName: data.HotelName || defaultAccommodation.HotelName,
    Address: data.Address || defaultAccommodation.Address,
    Room: data.Room || defaultAccommodation.Room,
    CheckIn: data.CheckIn ? dayjs(data.CheckIn) : defaultAccommodation.CheckIn,
    CheckOut: data.CheckOut
      ? dayjs(data.CheckOut)
      : defaultAccommodation.CheckOut,
    NumberOfNight: data.NumberOfNight || defaultAccommodation.NumberOfNight,
    Cost: data.Cost || defaultAccommodation.Cost,
    Notes: data.Notes || defaultAccommodation.Notes,
    FundingAccount: data.FundingAccount || defaultAccommodation.FundingAccount,
    Trip: data.Trip || defaultAccommodation.Trip,
  };

  return accommodation;
}

// Default Accommodation object
export const defaultAccommodation: Accommodation = {
  RecordID: '',
  BookingReference: '',
  HotelName: '',
  Address: '',
  Room: '',
  CheckIn: dayjs(),
  CheckOut: dayjs(),
  NumberOfNight: 0,
  Cost: 0,
  Notes: '',
  FundingAccount: [],
  Trip: [],
};

// Get accommodation info for a specific trip, given the strip ID
export async function getAccomByTripID(
  tripID: string,
): Promise<Accommodation[]> {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + '/accommodation/' + tripID,
    );
    const rawAccommodations = res.data;
    const formattedAccommodations = rawAccommodations.map(
      (accommodation: any) => reformatAccommodationResponseData(accommodation),
    );
    console.log(formattedAccommodations);
    return formattedAccommodations;
  } catch (error) {
    console.error('Error fetching all accommodations:', error);
    return [];
  }
}

export async function getAllAccom(): Promise<Accommodation[]> {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + '/accommodations',
    );
    const rawAccommodations = res.data;
    const formattedAccommodations = rawAccommodations.map(
      (accommodation: any) => reformatAccommodationResponseData(accommodation),
    );
    console.log(formattedAccommodations);
    return formattedAccommodations;
  } catch (error) {
    console.error('Error fetching all accommodations:', error);
    return [];
  }
}

function convertAccommodationDatesToString(accommodation: Accommodation): any {
  return {
    ...accommodation,
    CheckIn: accommodation.CheckIn.format('YYYY-MM-DD'),
    CheckOut: accommodation.CheckOut.format('YYYY-MM-DD'),
  };
}

export async function createAccommodation(
  accommodation: Accommodation,
): Promise<Accommodation> {
  try {
    // TODO replace the hardcoded tripid
    const accommodationData = convertAccommodationDatesToString(accommodation);
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/accommodation/recH3rQzJMWavjKGA`,
      accommodationData,
    );
    console.log(res.data);
    return res.data as Accommodation;
  } catch (error) {
    console.error('Error creating accommodation:', error);
    return {} as Accommodation;
  }
}
