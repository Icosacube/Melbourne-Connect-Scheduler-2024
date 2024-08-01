import { LoaderFunctionArgs } from 'react-router-dom';
import { Speaker } from '../../types/types';
import { getSpeakerById } from './functions';

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<Map<string, Speaker> | any> {
  try {
    const speakerID = String(params.id);
    const speaker = await getSpeakerById(speakerID);
    return speaker;
  } catch (error) {
    console.log(error);
    return {};
  }
}
