import { Speaker, MainEvent, Trip } from '../../types/frontendTypes'
import { getAllMainEvents } from '../event/functions'
import { getAllTrips } from '../trip/functions'
import { getAllSpeakers } from './functions'

// Define the return type for the loader function
interface LoaderResponse {
    speakers?: Speaker[] // Optional array of speakers
    events?: MainEvent[]
    trips?: Trip[] // Optional array of events
}

export async function loader(): Promise<LoaderResponse> {
    try {
        const speakers = await getAllSpeakers()
        const events = await getAllMainEvents()
        const trips = await getAllTrips()
        return { speakers, events, trips }
    } catch (error) {
        console.error('Error loading speakers and events:', error)
        return {} // Return an empty object in case of an error
    }
}
