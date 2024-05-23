import axios from 'axios';

export async function loader({ params }) {
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/event/' + params.id);
    const events = res.data;
    var event;

    // Quick and ugly search for now
    events.forEach((obj) => {
      if (obj.id == params.id) {
        event = obj
        event.date = new Date(event.Date)
        return event;
      }
    });
    return null;
  } catch (error) {
    return null;
  }
}