import axios from "axios";
import { Event } from "../types/types";

export default async function updateEvent(event: Event) {
    console.log('POSTing to ' + process.env.REACT_APP_BACKEND_URL);
    const res = await axios.put(process.env.REACT_APP_BACKEND_URL + '/event/' + event.id, 
      event
    );
    // if it doesn't work an error message should pop up for user feedback
    return res.status
}
