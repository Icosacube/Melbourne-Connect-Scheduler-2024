import axios from 'axios';

export async function loader() {
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/event');
    const events = res.data;

    // Resolve difference between model and expected data
    events.forEach((obj) => {
      // Tables expect id, not eventId
      obj.id = obj.eventId;
      delete obj.eventId;

      obj.date = new Date(obj.date);
    });
    console.log(events);
    return events;
  } catch (error) {
    return null;
  }
}
