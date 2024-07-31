import axios from 'axios';
import { Speaker } from '../types/types';

export async function loader(): Promise<Map<string, Speaker[]> | any> {
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/speakers');
    const rawSpeakers = res.data;

    console.log(rawSpeakers);
    return rawSpeakers;
  } catch (error) {
    return {};
  }
}
