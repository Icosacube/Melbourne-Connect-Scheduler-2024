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

export async function createVenue(venue: Venue): Promise<Venue> {
    const formattedVenue = reformatVenueRequestData(venue)
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_VENUE_API_PATH}`,
            formattedVenue
        )

        return res.data
    } catch (error) {
        console.error('Error creating venue:', error)
        return {} as Venue
    }
}

export async function updateVenue(venue: Venue): Promise<Venue> {
    const formattedVenue = reformatVenueRequestData(venue)
    try {
        const res = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_VENUE_API_PATH}/${venue.RecordID}`,
            formattedVenue
        )
        return res.data
    } catch (error) {
        console.error('Error updating venue:', error)
        return {} as Venue
    }
}

export async function deleteVenue(venueId: string): Promise<boolean> {
    try {
        await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_VENUE_API_PATH}/${venueId}`
        )
        return true
    } catch (error) {
        console.error('Error deleting venue:', error)
        return false
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

function reformatVenueRequestData(data: Venue): any {
    const venue = {
        VenueName: data.VenueName,
        Location: data.Location,
    }

    return venue
}
