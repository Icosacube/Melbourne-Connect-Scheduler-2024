import { LoaderFunctionArgs } from 'react-router-dom';
import { Trip } from '../../types/frontendTypes';
import { getTripById } from './functions';

// Load ONE trip from ONE trip record ID

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<Trip | any> {
  try {
    const tripID = String(params.id);
    const trip = await getTripById(tripID);
    return trip;
  } catch (error) {
    console.log(error);
    return {};
  }
}
