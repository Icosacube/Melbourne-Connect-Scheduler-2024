import { LoaderFunctionArgs } from 'react-router-dom'
import { MainEvent, Speaker } from '../../types/frontendTypes'
import { getAllMainEvents } from './functions'
import { getSpeakerById } from '../speaker/functions'
import { getAllVenues } from '../venue/functions'
import { getCateringByEventID } from '../catering/functions'
import { getAllFundingAccounts } from '../fundingAccount/functions'
import { getRoomServicesByEventID } from '../roomServices/functions'

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
        const venues = await getAllVenues()

        // Fetch catering for event
        const catering = await getCateringByEventID(eventID)

        // Fetch funding accounts
        const fundingAccounts = await getAllFundingAccounts()

        // Fetch room services
        const roomServices = await getRoomServicesByEventID(eventID)
        console.log(roomServices)

        return {
            event,
            speakers,
            catering,
            fundingAccounts,
            roomServices,
            venues,
        }
    } catch (error) {
        console.log(error)
        return {}
    }
}
