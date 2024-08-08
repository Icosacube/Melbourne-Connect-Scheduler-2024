import axios from 'axios';
import { SubEvent } from '../../types/frontendTypes';
import dayjs from 'dayjs';

// Function to reformat MainEvent response data
function reformatSubEventResponseData(data: any): SubEvent {
    const subEvent: SubEvent = {
        ...defaultSubEvent,
        RecordID: data.id || defaultSubEvent.RecordID,
        EventName: data.EventName || defaultSubEvent.EventName,
        EventDescription: data.EventDescription || defaultSubEvent.EventDescription,
        Date: data.Date ? dayjs(data.Date) : defaultSubEvent.Date,
        Notes: data.Notes || defaultSubEvent.Notes,
        MainEvent: data.MainEvent || defaultSubEvent.MainEvent,
        FundingAccount: data.FundingAccount || defaultSubEvent.FundingAccount,
        Completed: data.Completed || defaultSubEvent.Completed,
    };

    return subEvent;
}

// Default MainEvent object
export const defaultSubEvent: SubEvent = {
    RecordID: '',
    EventName: '',
    EventDescription: '',
    EventType: '',
    Date: dayjs(),
    Notes: '',
    MainEvent: [],
    FundingAccount: [],
    Completed: false,
};

// Function to get all subevents for a main event
export async function getAllSubEventsByEventID(id: string): Promise<SubEvent[]> {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/subevents/${id}`,
            );
        const rawSubEvents = res.data;
        const formattedSubEvents = rawSubEvents.map((subEvent: any) =>
            reformatSubEventResponseData(subEvent),
        );
        console.log(formattedSubEvents);
        return formattedSubEvents;
    } catch (error) {
        console.error('Error fetching all sub events:', error);
        return [];
    }
}