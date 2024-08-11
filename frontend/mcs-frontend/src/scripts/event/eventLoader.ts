import { LoaderFunctionArgs } from 'react-router-dom'
import { MainEvent, Speaker, Venue } from '../../types/frontendTypes'
import { getAllMainEvents } from './function'
import { getSpeakerById } from '../speaker/functions'
import { getAllVenues } from '../venue/functions';

export async function loader({
    params,
}: LoaderFunctionArgs): Promise<
    { event: MainEvent; speakers: Speaker[] } | any
> {
    try {
        const eventID = String(params.id)
        //TODO use the getMainEventById route once its complete
        const events = await getAllMainEvents()
        const event = events.find((event) => event.RecordID === eventID)
        if (!event) {
            return {}
        }
        // Fetching all speakers one by one
        const speakersPromises = event.Speaker.map((speakerID: string) =>
            getSpeakerById(speakerID)
        )
        const speakers = await Promise.all(speakersPromises)
        return { event, speakers }
    } catch (error) {
        console.log(error)
        return {}
    }
}
