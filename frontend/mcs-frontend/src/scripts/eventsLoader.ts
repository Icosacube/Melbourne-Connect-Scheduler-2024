import axios from "axios";
import dayjs from "dayjs";
import { MainEvent } from "../types/types";

export async function loader(): Promise<MainEvent[] | any> {
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "/event");
    const events = res.data;

    // TODO resolve this date conversion thing
    // Resolve difference between model and expected data
    events.forEach((obj: MainEvent) => {
      // type conversion
      obj.Date = dayjs(obj.Date);
    });
    console.log(events);
    return events;
  } catch (error) {
    return {};
  }
}
