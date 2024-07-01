import axios from 'axios';
import dayjs from 'dayjs';
import { Event } from '../types/types';
import { LoaderFunctionArgs } from 'react-router-dom';

export async function loader({ params }: LoaderFunctionArgs): Promise<Event | null> {
  try {
    const id = String(params.id);
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/event');
    const events = res.data;
    var event;

    // Quick and ugly search for now
    events.forEach((obj: Event) => {
      if (obj.id === id) {
        event = obj;
        event.date = dayjs(event.date);
        if (event.speakers == null) {
          event.speakers = [];
        }
        return event;
      }
    });
    if (event == null) {
      return null;
    }

    return event;
  } catch (error) {
    return null;
  }
}
