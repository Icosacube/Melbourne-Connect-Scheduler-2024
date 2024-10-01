import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import { MainEvent } from '../../types/frontendTypes'

// Function to reformat MainEvent response data
function reformatMainEventResponseData(data: any): MainEvent {
    const mainEvent: MainEvent = {
        ...defaultMainEvent,
        RecordID: data.id || defaultMainEvent.RecordID,
        EventName: data.EventName || defaultMainEvent.EventName,
        EventAbstract: data.EventAbstract || defaultMainEvent.EventAbstract,
        EventDescription:
            data.EventDescription || defaultMainEvent.EventDescription,
        EventbriteLink: data.EventbriteLink || defaultMainEvent.EventbriteLink,
        EventBanner: data.EventBanner || defaultMainEvent.EventBanner,
        StartDate: data.Date ? dayjs(data.Date) : defaultMainEvent.StartDate,
        EndDate: data.EndDate ? dayjs(data.EndDate) : defaultMainEvent.EndDate,
        Notes: data.Notes || defaultMainEvent.Notes,
        Speaker: data.Speaker || defaultMainEvent.Speaker,
        GuestAcademic: data.GuestAcademic || defaultMainEvent.GuestAcademic,
        Catering: data.Catering || defaultMainEvent.Catering,
        Venue: data.Venue || defaultMainEvent.Venue,
        Service: data.Service || defaultMainEvent.Service,
        Completed: data.Completed || defaultMainEvent.Completed,
        Trip: data.Trip || defaultMainEvent.Trip,
        SubEvent: data.SubEvent || defaultMainEvent.SubEvent,
    }

    return mainEvent
}

function reformatMainEventRequestData(data: MainEvent): any {
    const mainEvent = {
        EventName: data.EventName,
        EventAbstract: data.EventAbstract,
        EventDescription: data.EventDescription,
        EventbriteLink: data.EventbriteLink,
        EventBanner: data.EventBanner,
        StartDate: data.StartDate.toISOString(),
        EndDate: data.EndDate.toISOString(),
        Notes: data.Notes,
        Speaker: data.Speaker,
        GuestAcademic: data.GuestAcademic,
        Catering: data.Catering,
        Venue: data.Venue,
        Service: data.Service,
        Completed: data.Completed,
        Trip: data.Trip,
        SubEvent: data.SubEvent,
    }

    return mainEvent
}

// Default MainEvent object
export const defaultMainEvent: MainEvent = {
    RecordID: '',
    EventName: '',
    EventAbstract: '',
    EventDescription: '',
    EventbriteLink: '',
    EventBanner: '',
    StartDate: dayjs(),
    EndDate: dayjs(),
    Notes: '',
    Speaker: [],
    GuestAcademic: [],
    Catering: [],
    Venue: [],
    Service: [],
    Completed: false,
    Trip: [],
    SubEvent: [],

    EventTotal: 0,
}

// Function to get all MainEvents
export async function getAllMainEvents(): Promise<MainEvent[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_MAINEVENT_API_PATH}`
        )
        const rawEvents = res.data
        const formattedEvents = rawEvents.map((event: any) =>
            reformatMainEventResponseData(event)
        )
        console.log(rawEvents)
        return formattedEvents
    } catch (error) {
        console.error('Error fetching all main events:', error)
        return []
    }
}

// Function to get a MainEvent by ID
export async function getMainEventById(id: string): Promise<MainEvent> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_MAINEVENT_API_PATH}/${id}`
        )
        const rawEvent = res.data
        const formattedEvent = reformatMainEventResponseData(rawEvent)
        return formattedEvent
    } catch (error) {
        console.error('Error fetching main event by ID:', error)
        return {} as MainEvent
    }
}

// Function to create a new MainEvent

export async function createMainEvent(
    mainEvent: MainEvent
): Promise<AxiosResponse> {
    try {
        const payload = reformatMainEventRequestData(mainEvent)
        console.log(payload)
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_MAINEVENT_API_PATH}`,
            payload
        )

        // Server returns message: Main event created successfully if success
        return res
    } catch (error) {
        console.error('Error creating main event:', error)
        return {} as AxiosResponse
    }
}

// Function to update a MainEvent
export async function updateMainEventById(
    mainEvent: MainEvent
): Promise<AxiosResponse> {
    try {
        const formattedEvent = reformatMainEventRequestData(mainEvent)
        const res = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_MAINEVENT_API_PATH}/${mainEvent.RecordID}`,
            formattedEvent
        )
        // Server returns message: Main event updated successfully if success
        return res
    } catch (error) {
        console.error('Error updating main event by ID:', error)
        return {} as AxiosResponse
    }
}

// Function to delete a MainEVent by ID
export async function deleteMainEventById(id: string) {
    try {
        const res = await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_MAINEVENT_API_PATH}/${id}`
        )
        return res.status
    } catch (error) {
        console.error('Error deleting main event by ID:', error)
    }
}
