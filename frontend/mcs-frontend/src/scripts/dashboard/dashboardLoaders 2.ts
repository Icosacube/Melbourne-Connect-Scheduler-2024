import { MainEvent, Speaker } from '../../types/frontendTypes'
import { getAllMainEvents } from '../event/function'
import { getAllSpeakers } from '../speaker/functions'

interface LoaderData {
    events: MainEvent[]
    speakers: Speaker[]
}

export async function loader(): Promise<LoaderData | {}> {
    try {
        const events = await getAllMainEvents()
        const speakers = await getAllSpeakers()
        return { events, speakers }
    } catch (error) {
        return {}
    }
}
