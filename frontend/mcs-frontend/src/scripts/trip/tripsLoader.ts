import { Trip } from "../../types/types";
import { getAllTrips, getTripById } from "./functions";

// load ALL trips

export async function loader(): Promise<Trip | any> {
  try {
    const trip = await getAllTrips();
    return trip;
  } catch (error) {
    console.log(error);
    return {};
  }
}
