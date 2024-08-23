import { Finance, MainEvent } from '../../types/frontendTypes'
import { getAllMainEvents } from '../event/functions'
import { getAllFinance } from './function'

export async function loader(): Promise<
    { events: MainEvent[]; financeData: Finance[] } | {}
> {
    try {
        const [financeData, events] = await Promise.all([
            getAllFinance(),
            getAllMainEvents(),
        ])

        // Create a mapping of MainEventID to EventName and EventTotal
        const eventMap = new Map(
            events.map((event) => [
                event.RecordID,
                { name: event.EventName, total: event.EventTotal },
            ])
        )

        // Populate MainEventName and EventTotalCost in financeData
        const updatedFinanceData = financeData.map((finance) => {
            const eventInfo = eventMap.get(finance.MainEventID)
            return {
                ...finance,
                MainEventName: eventInfo?.name || 'Unknown Event',
                EventTotalCost: eventInfo?.total || 0,
            }
        })

        return { financeData: updatedFinanceData }
    } catch (error) {
        console.log(error)
        return {}
    }
}
