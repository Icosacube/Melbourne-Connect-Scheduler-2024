import axios from 'axios';

// call to backend URL to
export default async function createEvent() {
  console.log('POSTing to ' + process.env.REACT_APP_BACKEND_URL);
  const res = await axios.post(process.env.REACT_APP_BACKEND_URL + 'api/events', {
    event_name: 'string',
    event_type: 'string',
    catering_reference: 'string',
    venue: 'string',
    speakerid: ['string'],
    date: '2024-05-17T14:18:31.803Z',
    duration: 'string',
    description: 'string'
  });
  // if it doesn't work an error message should pop up for user feedback
}
