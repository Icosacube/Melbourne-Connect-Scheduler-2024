import axios from 'axios';
import { Event } from '../types/types';

// call to backend URL to
export default async function createEvent(event: Event) {
  console.log('POSTing to ' + process.env.REACT_APP_BACKEND_URL);
  const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/event', 
    event
  );
  // if it doesn't work an error message should pop up for user feedback
  return res.status
}
