import axios from 'axios';
import { Trip } from '../types/types';

// call to backend URL to
export default async function createTrip(trip: Trip) {
  console.log('POSTing to ' + process.env.REACT_APP_BACKEND_URL);
  const speaker_id = trip.GuestSpeaker!;
  // formatting DayJS to String and single GuestSpeaker to array
  const new_trip = { ...trip, GuestSpeaker: [trip.GuestSpeaker], 
                    StartDate: trip.StartDate?.format('YYYY-MM-DD'),  
                    EndDate: trip.EndDate?.format('YYYY-MM-DD')}
  //console.log(new_trip)
  const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/trip/' + speaker_id, 
    new_trip
  );
  // if it doesn't work an error message should pop up for user feedback
  return res.status

}
