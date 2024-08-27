import axios, { AxiosResponse } from 'axios'
import { SubEvent } from '../../types/frontendTypes'
import dayjs from 'dayjs'

// Function to reformat MainEvent response data
function reformatSubEventResponseData(data: any): SubEvent {
    const subEvent: SubEvent = {
        ...defaultSubEvent,
        RecordID: data.id || defaultSubEvent.RecordID,
        EventName: data.EventName || defaultSubEvent.EventName,
        EventDescription:
            data.EventDescription || defaultSubEvent.EventDescription,
        StartDate: data.StartDate
            ? dayjs(data.StartDate)
            : defaultSubEvent.StartDate,
        Notes: data.Notes || defaultSubEvent.Notes,
        MainEvent: data.MainEvent || defaultSubEvent.MainEvent,
        Completed: data.Completed || defaultSubEvent.Completed,
        Speakers: data.Speakers || defaultSubEvent.Speakers,
        EndDate: data.EndDate ? dayjs(data.EndDate) : defaultSubEvent.EndDate,
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

export async function createSubEvent(
    subEvent: SubEvent,
    id: String
): Promise<AxiosResponse> {
    const toSend: any = { ...subEvent }
    delete toSend.RecordID
    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SUBEVENT_API_PATH}/${id}`,
        toSend
    )
    return res
}
