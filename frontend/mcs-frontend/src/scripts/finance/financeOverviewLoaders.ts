import dayjs from 'dayjs'
import { Finance, MainEvent } from '../../types/frontendTypes'
import { getAllMainEvents } from '../event/functions'
import { getAllFinance } from './function'
import { getAllSpeakers } from '../speaker/functions'

export async function loader(): Promise<
    { events: MainEvent[]; financeData: Finance[] } | {}
> {
    try {
        const [financeData, events, speakers] = await Promise.all([
            getAllFinance(),
            getAllMainEvents(),
            getAllSpeakers(),
        ])

        // Create a mapping of MainEventID to relavent information
        const eventMap = new Map(
            events.map((event) => {
                const speaker = speakers.find(
                    (speaker) => speaker.RecordID === event.Speaker[0]
                )
                const keynoteSpeakerName = speaker
                    ? `${speaker.FirstName} ${speaker.LastName}`.trim()
                    : undefined

                return [
                    event.RecordID,
                    {
                        name: event.EventName,
                        total: event.EventTotal,
                        date: event.Date,
                        keynoteSpeaker: keynoteSpeakerName,
                    },
                ]
            })
        )

        // Populate MainEventName and EventTotalCost in financeData
        const updatedFinanceData = financeData.map((finance) => {
            const eventInfo = eventMap.get(finance.MainEventID)
            return {
                ...finance,
                MainEventName: eventInfo?.name || 'Unknown Event',
                EventTotalCost: eventInfo?.total || 0,
                MainEventDate: eventInfo?.date || dayjs(),
                KeyNoteSpeakerName: eventInfo?.keynoteSpeaker || '',
            }
        })

        // filter out finance records with unknown events
        const filteredUpdatedFinanceData = updatedFinanceData.filter(
            (finance) => finance.MainEventName !== 'Unknown Event'
        )

        return { financeData: filteredUpdatedFinanceData }
    } catch (error) {
        console.log(error)
        return {}
    }
}
