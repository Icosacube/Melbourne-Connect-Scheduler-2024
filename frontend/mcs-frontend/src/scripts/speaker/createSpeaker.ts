import axios from 'axios';
import { Speaker } from '../../types/frontendTypes';

export default async function createSpeaker(speaker: Speaker) {
  console.log('POSTing create speaker to ' + process.env.REACT_APP_BACKEND_URL);
  const res = await axios.post(
    process.env.REACT_APP_BACKEND_URL + '/speaker/',
    speaker,
  );
  // if it doesn't work an error message should pop up for user feedback
  return res.status;
}
