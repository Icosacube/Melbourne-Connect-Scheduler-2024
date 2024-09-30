import dayjs from 'dayjs'
import { Flight as FlightFrontend } from '../../types/frontendTypes'
import { Flight as FlightBackend } from '../../types/backendTypes'
import axios from 'axios'

// Default Flight object
export const defaultFlight: FlightFrontend = {
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
}

// Function to reformat Flight response data
function reformatFlightResponseData(data: any): FlightFrontend {
    const flight: FlightFrontend = {
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
    }

    return flight
}

// Function to reformat Flight to backend format
function reformatFlightRequest(data: FlightFrontend): FlightBackend {
    const flight: FlightBackend = {
        FlightReference: data.FlightReference,
        Airline: data.Airline,
        FlightNumber: data.FlightNumber,
        DepartureFrom: data.DepartureFrom,
        ArrivedTo: data.ArrivedTo,
        DepartDate: data.DepartDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        ArriveDate: data.ArriveDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        Cost: Number(data.Cost),
        Trip: data.Trip,
        FundingAccount: data.FundingAccount,
        ReturnFlight: data.ReturnFlight,
    }

    return flight
}

// function to get All flights
export async function getAllFlights(): Promise<FlightFrontend[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLIGHT_API_PATH}`
        )
        const rawFlights = res.data
        const formattedFlights = rawFlights.map((flight: any) =>
            reformatFlightResponseData(flight)
        )
        console.log(formattedFlights)
        return formattedFlights
    } catch (error) {
        console.error('Error fetching all flights:', error)
        return []
    }
}

export async function getFlightsByTripID(
    tripID: string
): Promise<FlightFrontend[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLIGHT_API_PATH}${process.env.REACT_APP_TRIP_API_PATH}/${tripID}`
        )
        const rawFlights = res.data
        const formattedFlights = rawFlights.map((flight: any) =>
            reformatFlightResponseData(flight)
        )
        console.log(formattedFlights)
        return formattedFlights
    } catch (error) {
        console.log(error)
        return []
    }
}

// Function to create a new Flight
export async function createFlight(flight: FlightFrontend) {
    const flightBackend = reformatFlightRequest(flight)
    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLIGHT_API_PATH}`,
        flightBackend
    )
    return res.status
}

// Function to update an existing Flight
export async function updateFlight(flight: FlightFrontend) {
    const flightBackend = reformatFlightRequest(flight)
    const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLIGHT_API_PATH}/${flight.RecordID}`,
        flightBackend
    )
    return res.status
}

// Function to delete an existing Flight
export async function deleteFlight(flightID: string) {
    const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLIGHT_API_PATH}/${flightID}`
    )
    return res.status
}
