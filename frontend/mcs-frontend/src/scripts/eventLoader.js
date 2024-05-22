import axios from 'axios';

export async function loader() {
  const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/event');
  const events = res.data;
  events.forEach((obj) => {
    obj.id = obj.eventId;
    delete obj.eventId;
    obj.date = new Date(obj.date);
  });
  return events;
}
