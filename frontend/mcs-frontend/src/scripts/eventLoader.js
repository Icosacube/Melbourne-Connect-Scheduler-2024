import axios from 'axios';
import dayjs from 'dayjs';

export async function loader({ params }) {
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/event');
    const events = res.data;
    var event;

    // Quick and ugly search for now
    events.forEach((obj) => {
      if (obj.id == params.id) {
        event = obj;
        event.date = dayjs(event.date);
        if (event.speakers == null) {
          event.speakers = [];
        }
        return event;
      }
    });

    return event;
  } catch (error) {
    return null;
  }
}
