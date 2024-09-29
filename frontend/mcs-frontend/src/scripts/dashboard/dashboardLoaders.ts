import { MainEvent, Speaker } from '../../types/frontendTypes'
import { getAllMainEvents } from '../event/functions'
import { getAllSpeakers } from '../speaker/functions'
import { getAllVenues } from '../venue/functions'

interface LoaderData {
    events: MainEvent[]
    speakers: Speaker[]
}

export async function loader(): Promise<LoaderData | {}> {
    try {
        const events = await getAllMainEvents()
        const speakers = await getAllSpeakers()
        const venues = await getAllVenues()
        return { events, speakers, venues }
    } catch (error) {
        return {}
    }
}
