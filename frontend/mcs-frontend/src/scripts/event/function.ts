import axios from 'axios';
import { MainEvent } from '../../types/types';
import dayjs from 'dayjs';

// Function to reformat MainEvent response data
function reformatMainEventResponseData(data: any): MainEvent {
  const mainEvent: MainEvent = {
    ...defaultMainEvent,
    RecordID: data.id || defaultMainEvent.RecordID,
    EventName: data.fields.EventName || defaultMainEvent.EventName,
    EventAbstract: data.fields.EventAbstract || defaultMainEvent.EventAbstract,
    EventDescription:
      data.fields.EventDescription || defaultMainEvent.EventDescription,
    EventbriteLink:
      data.fields.EventbriteLink || defaultMainEvent.EventbriteLink,
    EventBanner: data.fields.EventBanner || defaultMainEvent.EventBanner,
    Date: data.fields.Date ? dayjs(data.fields.Date) : defaultMainEvent.Date,
    Notes: data.fields.Notes || defaultMainEvent.Notes,
    Speaker: data.fields.Speaker || defaultMainEvent.Speaker,
    GuestAcademic: data.fields.GuestAcademic || defaultMainEvent.GuestAcademic,
    Catering: data.fields.Catering || defaultMainEvent.Catering,
    Venue: data.fields.Venue || defaultMainEvent.Venue,
    Service: data.fields.Service || defaultMainEvent.Service,
    Completed: data.fields.Completed || defaultMainEvent.Completed,
    Trip: data.fields.Trip || defaultMainEvent.Trip,
  };

  return mainEvent;
}

// Default MainEvent object
export const defaultMainEvent: MainEvent = {
  RecordID: '',
  EventName: '',
  EventAbstract: '',
  EventDescription: '',
  EventbriteLink: '',
  EventBanner: '',
  Date: dayjs(),
  Notes: '',
  Speaker: [],
  GuestAcademic: [],
  Catering: [],
  Venue: [],
  Service: [],
  Completed: false,
  Trip: [],
};

// Function to get all MainEvents
export async function getAllMainEvents(): Promise<MainEvent[]> {
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/events');
    const rawEvents = res.data;
    const formattedEvents = rawEvents.map((event: any) =>
      reformatMainEventResponseData(event),
    );
    console.log(formattedEvents);
    return formattedEvents;
  } catch (error) {
    console.error('Error fetching all main events:', error);
    return [];
  }
}

// Function to get a MainEvent by ID
export async function getMainEventById(id: string): Promise<MainEvent> {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/events/${id}`,
    );
    const rawEvent = res.data;
    const formattedEvent = reformatMainEventResponseData(rawEvent);
    return formattedEvent;
  } catch (error) {
    console.error('Error fetching main event by ID:', error);
    return {} as MainEvent;
  }
}

// Function to create a new MainEvent
export async function createMainEvent(mainEvent: MainEvent) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/events`,
      mainEvent,
    );
    // Server returns message: Main event created successfully if success
    console.log(res.data);
  } catch (error) {
    console.error('Error creating main event:', error);
    return {} as MainEvent;
  }
}
