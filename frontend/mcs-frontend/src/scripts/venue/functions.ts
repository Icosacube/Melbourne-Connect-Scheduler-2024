import axios from 'axios'
import { Venue } from '../../types/frontendTypes'

export async function getAllVenues(): Promise<Venue[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_VENUE_API_PATH}`
        )
        const rawVenues = res.data
        const formattedVenues = rawVenues.map((venue: any) =>
            reformatVenueResponseData(venue)
        )
        return formattedVenues
    } catch (error) {
        return []
    }
}

export async function getVenueById(id: string): Promise<Venue> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_VENUE_API_PATH}/${id}`
        )
        const rawVenue = res.data

        const formattedVenue = reformatVenueResponseData(rawVenue)
        console.log(formattedVenue)
        return formattedVenue
    } catch (error) {
        console.error('Error fetching venue:', error)
        return {} as Venue
    }
}

export async function getVenueByMainEventId(id: string): Promise<Venue[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_VENUE_API_PATH}`
        )
        const rawVenues = res.data
        const formattedVenues = rawVenues
            .filter((venue: any) => venue.MainEvent?.includes(id))
            .map((venue: any) => reformatVenueResponseData(venue))
        console.log(formattedVenues)
        return formattedVenues
    } catch (error) {
        console.error(`Error fetching venues for event ${id}`, error)
        return [] as Venue[]
    }
}

export const defaultVenue: Venue = {
    VenueName: '',
    Location: '',
    Cost: 0,
    InvoiceReference: '',
    Notes: '',
    FundingAccount: [],
    MainEvent: [],
    RecordID: '',
}

function reformatVenueResponseData(data: any): Venue {
    const venue = {
        ...defaultVenue,
        RecordID: data.id || defaultVenue.RecordID,
        VenueName: data.VenueName || defaultVenue.VenueName,
        Location: data.Location || defaultVenue.Location,
        Cost: data.Cost || defaultVenue.Cost,
        InvoiceReference:
            data.InvoiceReference || defaultVenue.InvoiceReference,
        Notes: data.Notes || defaultVenue.Notes,
        FundingAccount: data.FundingAccount || defaultVenue.FundingAccount,
        MainEvent: data.MainEvent || defaultVenue.MainEvent,
    }

    return venue
}
