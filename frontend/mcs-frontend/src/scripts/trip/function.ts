import axios from 'axios';
import { Trip, Flight, Accommodation } from '../../types/types';
import dayjs from 'dayjs';

// Default Trip object
export const defaultTrip: Trip = {
  RecordID: '',
  StartDate: dayjs(),
  EndDate: dayjs(),
  Duration: 0,
  GuestSpeaker: [],
  MainEvent: [],
  Accommodation: [],
  Flight: [],
  Miscellaneous: [],
  AcademicCanvassing: [],
  Completed: false,
};

// Function to reformat Trip response data
function reformatTripResponseData(data: any): Trip {
  const trip: Trip = {
    ...defaultTrip,
    RecordID: data.id || defaultTrip.RecordID,
    StartDate: data.StartDate ? dayjs(data.StartDate) : defaultTrip.StartDate,
    EndDate: data.EndDate ? dayjs(data.EndDate) : defaultTrip.EndDate,
    Duration: data.Duration || defaultTrip.Duration,
    GuestSpeaker: data.GuestSpeaker || defaultTrip.GuestSpeaker,
    MainEvent: data.MainEvent || defaultTrip.MainEvent,
    Accommodation: data.Accommodation || defaultTrip.Accommodation,
    Flight: data.Flight || defaultTrip.Flight,
    Miscellaneous: data.Miscellaneous || defaultTrip.Miscellaneous,
    AcademicCanvassing:
      data.AcademicCanvassing || defaultTrip.AcademicCanvassing,
    Completed: data.Completed || defaultTrip.Completed,
  };

  return trip;
}

// Function to get all Trips
export async function getAllTrips(): Promise<Trip[]> {
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/trips');
    const rawTrips = res.data;
    const formattedTrips = rawTrips.map((trip: any) =>
      reformatTripResponseData(trip),
    );
    console.log(formattedTrips);
    return formattedTrips;
  } catch (error) {
    console.error('Error fetching all trips:', error);
    return [];
  }
}

// Function to get a Trip by ID
export async function getTripById(id: string): Promise<Trip> {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/trips/${id}`,
    );
    const rawTrip = res.data;
    const formattedTrip = reformatTripResponseData(rawTrip);
    return formattedTrip;
  } catch (error) {
    console.error('Error fetching trip by ID:', error);
    return {} as Trip;
  }
}

// Function to create a new Trip
export async function createTrip(trip: Trip) {
  const speakerID = trip.GuestSpeaker![0];
  // formatting DayJS to String
  const formattedTrip = {
    ...trip,
    StartDate: trip.StartDate?.format('YYYY-MM-DD'),
    EndDate: trip.EndDate?.format('YYYY-MM-DD'),
  };
  delete formattedTrip.RecordID;
  delete formattedTrip.Duration;

  console.log(formattedTrip);

  const res = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/trip/` + speakerID,
    formattedTrip,
  );
  return res.status;
}
