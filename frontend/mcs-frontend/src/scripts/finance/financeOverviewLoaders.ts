import { Finance, MainEvent } from '../../types/frontendTypes'
import { getAllMainEvents } from '../event/function'
import { getAllFinance } from './function'

export async function loader(): Promise<
    { events: MainEvent[]; financeData: Finance[] } | {}
> {
    try {
        const financeData = await getAllFinance()
        const events = await getAllMainEvents()

        // add dummy eventid to finance data for now
        const dummyEventId = [
            'rec0fcCBVW5Bcqqkl',
            'rec1mQXdwn6fzq0lv',
            'rec3eON4hVIxne0z9',
            'recIcrQ2cgj8Ck4q2',
            'recSWifGj1oly3dNu',
            'recYxRFKQpt9ojipL',
        ]

        // Function to get a random element from an array
        const getRandomElement = <T>(arr: T[]): T => {
            return arr[Math.floor(Math.random() * arr.length)]
        }

        // Assign a random dummy event ID to each finance record
        const updatedFinanceData = financeData.map((finance: Finance) => ({
            ...finance,
            MainEvent: getRandomElement(dummyEventId),
        }))
        console.log(updatedFinanceData)
        return { updatedFinanceData, events }
    } catch (error) {
        console.log(error)
        return {}
    }
}
