import axios from 'axios';
import { Trip } from '../../types/frontendTypes';

export async function loader(): Promise<Map<string, Trip[]> | any> {
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/trip');
    const rawTrips = res.data;

    console.log(rawTrips);
    return rawTrips;
  } catch (error) {
    return {};
  }
}
