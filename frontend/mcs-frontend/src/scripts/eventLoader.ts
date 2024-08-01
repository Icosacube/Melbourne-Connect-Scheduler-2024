import axios from 'axios';
import { MainEvent } from '../types/types';
import { LoaderFunctionArgs } from 'react-router-dom';

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<MainEvent | null> {
  try {
    const id = String(params.id);
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/event');
    const events = res.data;
    var event;

    // TODO fix this search with new events type, how to search without id?
    // Quick and ugly search for now
    // events.forEach((obj: MainEvent) => {
    //   if (obj.id === id) {
    //     event = obj;
    //     event.date = dayjs(event.date);
    //     if (event.speakers == null) {
    //       event.speakers = [];
    //     }
    //     return event;
    //   }
    // });
    return events[0];
    if (event == null) {
      return null;
    }

    return event;
  } catch (error) {
    return null;
  }
}
