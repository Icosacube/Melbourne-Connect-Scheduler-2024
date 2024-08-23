import { MainEvent, Speaker, Trip } from '../../types/frontendTypes'
import { getAllMainEvents } from '../event/functions'
import { getAllSpeakers } from '../speaker/functions'
import { getAllTrips } from './functions'

interface LoaderData {
    events: MainEvent[]
    speakers: Speaker[]
    trips: Trip[]
}

export async function loader(): Promise<LoaderData | {}> {
    try {
        const events = await getAllMainEvents()
        const speakers = await getAllSpeakers()
        const trips = await getAllTrips()
        return { events, speakers, trips }
    } catch (error) {
        console.error(error)
        return {}
    }
}
