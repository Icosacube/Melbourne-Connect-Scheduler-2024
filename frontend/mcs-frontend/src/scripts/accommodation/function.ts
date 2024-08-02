import axios from 'axios';
import { Accommodation } from '../../types/types';
import dayjs from 'dayjs';

export const defaultAccommodation: Accommodation = {
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
