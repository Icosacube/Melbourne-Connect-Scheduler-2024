import { LoaderFunctionArgs } from 'react-router-dom';
import { Trip } from '../../types/frontendTypes';
import { getTripById } from './function';
import { getSpeakerById } from '../speaker/functions';

// Load ONE trip from ONE trip record ID

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<Trip | any> {
  try {
    const { id } = params;
    const trip = await getTripById(id!);

    console.log(trip);
    const speaker = await getSpeakerById(trip.GuestSpeaker[0]);

    return { trip, speaker};
  } catch (error) {
    console.log(error);
    return {};
  }
}
