import axios from 'axios';

export async function loader() {
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/event');
    const rawEvents = res.data;
    const events = []

    // Flatten it so ID is on same level as fields
    rawEvents.forEach((event) => {
      event.fields.id = event.id;
      var index = rawEvents.findIndex((ev) => ev === event)
      events[index] = event.fields
    });
    console.log(events);
    return events;
  } catch (error) {
    return {};
  }
}
