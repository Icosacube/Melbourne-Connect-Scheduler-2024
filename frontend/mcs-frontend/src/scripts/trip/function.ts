import axios from 'axios';
import { Trip, Flight, Accommodation } from '../../types/types';
import dayjs from 'dayjs';

// Default Trip object
export const defaultTrip: Trip = {
    RecordID: "",
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
    const formattedTrip = { ...trip, 
                            StartDate: trip.StartDate?.format('YYYY-MM-DD'),  
                        EndDate: trip.EndDate?.format('YYYY-MM-DD')}
    delete formattedTrip.RecordID;
    delete formattedTrip.Duration;

    console.log(formattedTrip);

    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/trip/` + speakerID,
        formattedTrip,
    );
    return res.status;
  }

  
// Function to reformat Flight response data
function reformatFlightResponseData(data: any): Flight {
    const flight: Flight = {
      ...defaultFlight,
      RecordID: data.id || defaultFlight.RecordID,
      FlightReference: data.FlightReference || defaultFlight.FlightReference,
      Airline: data.Airline || defaultFlight.Airline,
      FlightNumber: data.FlightNumber || defaultFlight.FlightNumber,
      DepartureFrom: data.DepartureFrom || defaultFlight.DepartureFrom,
      ArrivedTo: data.ArrivedTo || defaultFlight.ArrivedTo,
      DepartDate: data.DepartDate ? dayjs(data.DepartDate) : defaultFlight.DepartDate,
      ArriveDate: data.ArriveDate ? dayjs(data.ArriveDate) : defaultFlight.ArriveDate,
      Cost: data.Cost || defaultFlight.Cost,
      Trip: data.Trip || defaultFlight.Trip,
      FundingAccount: data.FundingAccount || defaultFlight.FundingAccount,
      ReturnFlight: data.ReturnFlight || defaultFlight.ReturnFlight,
    };
  
    return flight;
  }
  
  // Default Flight object
  export const defaultFlight: Flight = {
    RecordID: '',
    FlightReference: '',
    Airline: '',
    FlightNumber: '',
    DepartureFrom: '',
    ArrivedTo: '',
    DepartDate: dayjs(),
    ArriveDate: dayjs(),
    Cost: 0,
    Trip: [],
    FundingAccount: [],
    ReturnFlight: [],
  };

  // function to get All flights 
  export async function getAllFlights(): Promise<Flight[]> {
    try {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/flights');
        const rawFlights = res.data;
        const formattedFlights = rawFlights.map((flight: any) =>
          reformatFlightResponseData(flight),
        );
        console.log(formattedFlights);
        return formattedFlights;
    } catch (error) {
        console.error('Error fetching all flights:', error);
        return [];
    }
}


export async function getFlightsByTripID(tripID: string): Promise<Flight[]> {
    try {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "/flight/" + tripID );
        const rawFlights = res.data;
        const formattedFlights = rawFlights.map((flight: any) =>
          reformatFlightResponseData(flight),
        );
        console.log(formattedFlights);
        return formattedFlights;
      } catch (error) {
        console.log(error);
        return [];
      }
}


// Function to reformat Accommodation response data
function reformatAccommodationResponseData(data: any): Accommodation {
    const accommodation: Accommodation = {
      ...defaultAccommodation,
      RecordID: data.id || defaultAccommodation.RecordID,
      BookingReference: data.BookingReference || defaultAccommodation.BookingReference,
      HotelName: data.HotelName || defaultAccommodation.HotelName,
      Address: data.Address || defaultAccommodation.Address,
      Room: data.Room || defaultAccommodation.Room,
      CheckIn: data.CheckIn ? dayjs(data.CheckIn) : defaultAccommodation.CheckIn,
      CheckOut: data.CheckOut ? dayjs(data.CheckOut) : defaultAccommodation.CheckOut,
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
export async function getAccomByTripID(tripID: string): Promise<Accommodation[]> {
    try {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "/accommodation/" + tripID );
        const rawAccommodations = res.data;
        const formattedAccommodations = rawAccommodations.map((accommodation: any) =>
          reformatAccommodationResponseData(accommodation),
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
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/accommodations');
        const rawAccommodations = res.data;
        const formattedAccommodations = rawAccommodations.map((accommodation: any) =>
          reformatAccommodationResponseData(accommodation),
        );
        console.log(formattedAccommodations);
        return formattedAccommodations;
    } catch (error) {
        console.error('Error fetching all accommodations:', error);
        return [];
    }
}