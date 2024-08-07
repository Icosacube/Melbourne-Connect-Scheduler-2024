import { Speaker, Trip } from "../../types/frontendTypes";
import { getAllTrips } from "../trip/function";
import { getAllSpeakers } from "./functions";

interface LoaderData {
  speakers: Speaker[];
  trips: Trip[];
}

export async function loader(): Promise<LoaderData | any> {
  try {
    const speakers = await getAllSpeakers();
    const trips = await getAllTrips();
    return { speakers, trips };
  } catch (error) {
    return {};
  }
}
