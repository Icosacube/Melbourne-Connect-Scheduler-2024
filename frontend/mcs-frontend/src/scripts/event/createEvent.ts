import axios from 'axios';
import { MainEvent } from '../../types/frontendTypes';

// call to backend URL to
export default async function createEvent(event: MainEvent, speakerId: string) {
  console.log('POSTing to ' + process.env.REACT_APP_BACKEND_URL);
  const testSpeakerId = 'rec0aszZKr8m7Fb6W';
  const res = await axios.post(
    process.env.REACT_APP_BACKEND_URL + '/event/' + testSpeakerId,
    event,
  );
  // if it doesn't work an error message should pop up for user feedback
  return res.status;
}
