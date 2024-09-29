import axios, { AxiosResponse } from 'axios'
import { SubEvent } from '../../types/frontendTypes'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

// Function to reformat sub-event request data
function reformatSubEventRequestData(data: SubEvent): any {
    const subEvent = {
        EventName: data.EventName,
        EventDescription: data.EventDescription,
        StartDate: data.StartDate.tz('Australia/Melbourne').utc().toISOString(),
        Notes: data.Notes,
        MainEvent: data.MainEvent,
        EventType: data.EventType,
        Completed: data.Completed,
        Speakers: data.Speakers,
        EndDate: data.EndDate.tz('Australia/Melbourne').utc().toISOString(),
    }
    return subEvent
}

// Function to reformat sub-event response data
function reformatSubEventResponseData(data: any): SubEvent {
    const subEvent: SubEvent = {
        ...defaultSubEvent,
        RecordID: data.id || defaultSubEvent.RecordID,
        EventName: data.EventName || defaultSubEvent.EventName,
        EventDescription:
            data.EventDescription || defaultSubEvent.EventDescription,
        StartDate: data.StartDate
            ? dayjs(data.StartDate).utc().tz('Australia/Melbourne')
            : defaultSubEvent.StartDate,
        Notes: data.Notes || defaultSubEvent.Notes,
        MainEvent: data.MainEvent || defaultSubEvent.MainEvent,
        EventType: data.EventType || defaultSubEvent.EventType,
        Completed: data.Completed || defaultSubEvent.Completed,
        Speakers: data.Speakers || defaultSubEvent.Speakers,
        EndDate: data.EndDate
            ? dayjs(data.EndDate).utc().tz('Australia/Melbourne')
            : defaultSubEvent.EndDate,
    }
    return subEvent
}

// Default MainEvent object
export const defaultSubEvent: SubEvent = {
    RecordID: '',
    EventName: '',
    EventDescription: '',
    EventType: '',
    StartDate: dayjs(),
    Notes: '',
    MainEvent: [],
    Completed: false,
    Speakers: [],
    EndDate: dayjs(),
}

// Function to get all subevents for a main event
export async function getSubEventsByMainEventID(
    mainEventId: string
): Promise<SubEvent[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SUBEVENT_API_PATH}`
        )
        const rawSubEvents = res.data
        const formattedSubEvents = rawSubEvents
            .filter((subEvent: any) => subEvent.MainEvent.includes(mainEventId))
            .map((subEvent: any) => reformatSubEventResponseData(subEvent))
        console.log(formattedSubEvents)
        return formattedSubEvents
    } catch (error) {
        console.error('Error fetching all sub events:', error)
        return []
    }
}

export async function createSubEvent(subEvent: SubEvent): Promise<SubEvent> {
    try {
        const toSend: any = { ...subEvent }

        delete toSend.RecordID

        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SUBEVENT_API_PATH}`,
            toSend
        )

        const newSubEvent: SubEvent = {
            ...subEvent,
            RecordID: res.data.toString(), // Attach the RecordID returned from the server
        }
        reformatSubEventResponseData(newSubEvent)

        return newSubEvent
    } catch (error) {
        console.error('Error creating sub-event:', error)
        throw error
    }
}

export async function updateSubEventByID(
    subEvent: SubEvent
): Promise<AxiosResponse> {
    try {
        console.log()
        const recordID = subEvent.RecordID
        const formattedSubEvent = reformatSubEventRequestData(subEvent)
        const res = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SUBEVENT_API_PATH}/${recordID}`,
            formattedSubEvent
        )
        console.log(formattedSubEvent)
        return res
    } catch (error) {
        console.error('Error updating sub-event:', error)
        throw error
    }
}

export async function deleteSubEventByID(id: string) {
    try {
        const res = await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SUBEVENT_API_PATH}/${id}`
        )
        return res.status
    } catch (error) {
        console.error('Error deleting sub-event by ID:', error)
        throw error
    }
}
