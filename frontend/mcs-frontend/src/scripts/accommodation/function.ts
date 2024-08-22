import dayjs from 'dayjs';
import { Accommodation as AccommodationFrontend } from '../../types/frontendTypes';
import { Accommodation as AccommodationBackend } from '../../types/backendTypes';
import axios from 'axios';

// Get accommodation info for a specific trip, given the trip ID
export async function getAccomByTripID(
  tripID: string,
): Promise<AccommodationFrontend[]> {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/accommodation/${tripID}`,
    );
    const rawAccommodations = res.data;
    const formattedAccommodations = rawAccommodations.map(
      (accommodation: any) => reformatAccommodationResponse(accommodation),
    );
    console.log(formattedAccommodations);
    return formattedAccommodations;
  } catch (error) {
    console.error(`Error fetching trip ${tripID} accommodations:`, error);
    return [];
  }
}


export async function getAllAccom(): Promise<AccommodationFrontend[]> {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + '/accommodations',
    );
    const rawAccommodations = res.data;
    const formattedAccommodations = rawAccommodations.map(
      (accommodation: any) => reformatAccommodationResponse(accommodation),
    );
    console.log(formattedAccommodations);
    return formattedAccommodations;
  } catch (error) {
    console.error('Error fetching all accommodations:', error);
    return [];
  }
}

export async function createAccommodation(
  accommodation: AccommodationFrontend,
): Promise<AccommodationFrontend> {
  try {
    const tripID = accommodation.Trip[0];
    const accommodationData = reformatAccommodationRequest(accommodation);
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/accommodation/${tripID}`,
      accommodationData,
    );
    console.log(res.data);
    return res.data as AccommodationFrontend;
  } catch (error) {
    console.error('Error creating accommodation:', error);
    return {} as AccommodationFrontend;
  }
}


export async function updateAccom(accom: AccommodationFrontend) {
  const AccommBackend = reformatAccommodationRequest(accom)
  const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/accommodation/${accom.RecordID}`,
      AccommBackend
  )
  return res.status
}

export async function deleteAccom(accomID: string) {
  const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/accommodation/${accomID}`
  )
  return res.status
}


// Default Accommodation object
export const defaultAccommodation: AccommodationFrontend = {
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

// Function to reformat Accommodation response data
function reformatAccommodationResponse(data: any): AccommodationFrontend {
  const accommodation: AccommodationFrontend = {
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

// Function to reformat Accommodation request data
function reformatAccommodationRequest(
  accommodation: AccommodationFrontend,
): AccommodationBackend {
  return {
    BookingReference: accommodation.BookingReference,
    HotelName: accommodation.HotelName,
    Address: accommodation.Address,
    Room: accommodation.Room,
    CheckIn: accommodation.CheckIn.format('YYYY-MM-DD'),
    CheckOut: accommodation.CheckOut.format('YYYY-MM-DD'),
    Cost: Number(accommodation.Cost),
    Notes: accommodation.Notes,
    FundingAccount: accommodation.FundingAccount,
    Trip: accommodation.Trip,
  };
}
