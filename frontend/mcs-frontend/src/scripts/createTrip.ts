import axios from 'axios';
import { Trip } from '../types/types';

// call to backend URL to
export default async function createTrip(trip: Trip) {
  console.log('POSTing to ' + process.env.REACT_APP_BACKEND_URL);
  const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/trip/' + trip.speaker_id, 
    trip
  );
  // if it doesn't work an error message should pop up for user feedback
  return res.status
}
