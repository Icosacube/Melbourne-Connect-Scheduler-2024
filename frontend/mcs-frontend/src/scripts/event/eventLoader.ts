import { LoaderFunctionArgs } from 'react-router-dom'
import { MainEvent, Speaker } from '../../types/frontendTypes'
import { getAllMainEvents } from './functions'
import { getSpeakerById } from '../speaker/functions'
import { getCateringByEventID } from '../catering/functions'
import { getAllFundingAccounts } from '../fundingAccount/functions'

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

        // Fetch catering for event
        const catering = await getCateringByEventID(eventID)
        console.log(catering)

        // Fetch funding accounts
        const fundingAccounts = await getAllFundingAccounts()
        console.log(fundingAccounts)

        return { event, speakers, catering, fundingAccounts }
    } catch (error) {
        console.log(error)
        return {}
    }
}
