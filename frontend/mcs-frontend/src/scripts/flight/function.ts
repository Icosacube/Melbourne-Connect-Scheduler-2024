import dayjs from 'dayjs';
import { Flight } from '../../types/types';
import axios from 'axios';

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
    DepartDate: data.DepartDate
      ? dayjs(data.DepartDate)
      : defaultFlight.DepartDate,
    ArriveDate: data.ArriveDate
      ? dayjs(data.ArriveDate)
      : defaultFlight.ArriveDate,
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
    const res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + '/flight/' + tripID,
    );
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
