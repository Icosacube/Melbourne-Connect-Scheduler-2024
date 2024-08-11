import { Venue } from '../../types/frontendTypes'
import { getAllVenues } from './functions'

export async function loader(): Promise<Venue[] | any> {
    try {
        const venues = await getAllVenues()
        console.log(venues)
        return venues
    } catch (error) {
        return {}
    }
}
