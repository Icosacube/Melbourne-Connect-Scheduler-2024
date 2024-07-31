import axios from 'axios';
import dayjs from 'dayjs';
import { Event } from '../types/types';

export async function loader(): Promise<Event[] | any>{
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/event');
    const events = res.data

    // Resolve difference between model and expected data
    events.forEach((obj:Event) => {
      // type conversion
      obj.date = dayjs(obj.date);
    });
    console.log(events);
    return events;
  } catch (error) {
    return {};
  }
}
