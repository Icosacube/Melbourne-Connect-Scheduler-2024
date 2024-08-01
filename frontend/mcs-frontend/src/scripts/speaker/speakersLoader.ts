import { Speaker } from '../../types/types';
import { getAllSpeakers } from './functions';

export async function loader(): Promise<Map<string, Speaker[]> | any> {
  try {
    const speakers = await getAllSpeakers();
    console.log(speakers);
    return speakers;
  } catch (error) {
    return {};
  }
}
