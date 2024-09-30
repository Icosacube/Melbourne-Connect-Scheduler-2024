import axios from 'axios'
import dayjs from 'dayjs'
import { Trip as TripFrontend } from '../../types/frontendTypes'
import { Trip as TripBackend } from '../../types/backendTypes'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

// Function to get all Trips
export async function getAllTrips(): Promise<TripFrontend[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_TRIP_API_PATH}`
        )
        const rawTrips = res.data
        const formattedTrips = rawTrips.map((trip: any) =>
            reformatTripResponse(trip)
        )
        return formattedTrips
    } catch (error) {
        console.error('Error fetching all trips:', error)
        return []
    }
}

// Function to get a Trip by ID
export async function getTripById(id: string): Promise<TripFrontend> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_TRIP_API_PATH}/${id}`
        )
        const rawTrip = res.data
        const formattedTrip = reformatTripResponse(rawTrip)
        return formattedTrip
    } catch (error) {
        console.error('Error fetching trip by ID:', error)
        return {} as TripFrontend
    }
}

export async function getTripsBySpeakerId(
    speakerID: string
): Promise<TripFrontend[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_TRIP_API_PATH}/${speakerID}`
        )
        const rawTrips = res.data
        const formattedTrips = rawTrips.map((trip: any) =>
            reformatTripResponse(trip)
        )
        return formattedTrips
    } catch (error) {
        return []
    }
}

// Function to create a new Trip
export async function createTrip(trip: TripFrontend) {
    const speakerID = trip.GuestSpeaker![0]
    // formatting DayJS to String
    const tripBackend = reformatTripRequest(trip)
    const res = await axios.post(
        // `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_TRIP_API_PATH}/` +
        //     speakerID,
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_TRIP_API_PATH}`,
        tripBackend
    )
    return res.status
}

// Function to update an existing Trip
export async function updateTrip(trip: TripFrontend) {
    const tripID = trip.RecordID
    const tripBackend = reformatTripRequest(trip)
    const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_TRIP_API_PATH}/${tripID}`,
        tripBackend
    )
    return res.status
}

// Function to delete an existing Trip
export async function deleteTrip(tripID: String) {
    const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_TRIP_API_PATH}/${tripID}`
    )
    return res.status
}

// Default Trip object
export const defaultTrip: TripFrontend = {
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
}

// Function to reformat Trip response to frontend format
function reformatTripResponse(data: any): TripFrontend {
    const trip: TripFrontend = {
        ...defaultTrip,
        RecordID: data.id || defaultTrip.RecordID,
        StartDate: data.StartDate
            ? dayjs(data.StartDate).utc().tz('Australia/Melbourne')
            : defaultTrip.StartDate,
        EndDate: data.EndDate
            ? dayjs(data.EndDate).utc().tz('Australia/Melbourne')
            : defaultTrip.EndDate,
        Duration: data.Duration || defaultTrip.Duration,
        GuestSpeaker: data.GuestSpeaker || defaultTrip.GuestSpeaker,
        MainEvent: data.MainEvent || defaultTrip.MainEvent,
        Accommodation: data.Accommodation || defaultTrip.Accommodation,
        Flight: data.Flight || defaultTrip.Flight,
        Miscellaneous: data.Miscellaneous || defaultTrip.Miscellaneous,
        AcademicCanvassing:
            data.AcademicCanvassing || defaultTrip.AcademicCanvassing,
        Completed: data.Completed || defaultTrip.Completed,
    }

    return trip
}

// Function to reformat Trip to backend format
function reformatTripRequest(data: TripFrontend): TripBackend {
    const trip: TripBackend = {
        StartDate: data.StartDate.tz('Australia/Melbourne')
            .utc()
            .format('YYYY-MM-DD'),
        EndDate: data.EndDate.tz('Australia/Melbourne')
            .utc()
            .format('YYYY-MM-DD'),
        GuestSpeaker: data.GuestSpeaker,
        MainEvent: data.MainEvent,
        Accommodation: data.Accommodation,
        Flight: data.Flight,
        Miscellaneous: data.Miscellaneous,
        Completed: data.Completed,
    }

    return trip
}
