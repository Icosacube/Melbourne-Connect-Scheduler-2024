import axios from "axios";
import { Trip } from "../../types/types";
import dayjs from "dayjs";

export async function getAllTrips(): Promise<Trip[]> {
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "/trips");
    const rawTrips = res.data;
    const formattedTrips = rawTrips.map((trip: any) =>
      reformatTripResponseData(trip)
    );
    return formattedTrips;
  } catch (error) {
    return [];
  }
}

// get ONE trip from ONE Trip Record ID
export async function getTripById(tripID: string): Promise<Trip> {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/trip/${tripID}`
    );
    const rawTrip = res.data;
    const formattedTrip = reformatTripResponseData(rawTrip);
    return formattedTrip;
  } catch (error) {
    console.error("Error fetching trip:", error);
    return {} as Trip;
  }
}

export async function getTripsBySpeakerId(speakerID: string): Promise<Trip[]> {
  try {
    const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/trip/${speakerID}`
      );
    const rawTrips = res.data;
    const formattedTrips = rawTrips.map((trip: any) =>
      reformatTripResponseData(trip)
    );
    return formattedTrips;
  } catch (error) {
    return [];
  }
}

export async function createTrip(id: string) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/trip/${id}`
    );
    // Server return message: Trip created successfully if success
    console.log(res.data);
  } catch (error) {
    console.error("Error creating trip:", error);
    return {} as Trip;
  }
}

export const defaultTrip: Trip = {
  RecordID: "",
  StartDate: dayjs(),
  EndDate: dayjs(),
  GuestSpeaker: [],
  MainEvent: [],
  Accommodation: [],
  Flight: [],
  Miscellaneous: [],
  AcademicCanvassing: [],
  Completed: false,
};

function reformatTripResponseData(data: any): Trip {
  const trip: Trip = {
    ...defaultTrip,
    RecordID: data.id || defaultTrip.RecordID,
    StartDate: data.StartDate ? dayjs(data.StartDate) : defaultTrip.StartDate,
    EndDate: data.EndDate ? dayjs(data.EndDate) : defaultTrip.EndDate,
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
