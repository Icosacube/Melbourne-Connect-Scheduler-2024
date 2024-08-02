import axios from "axios";
import dayjs from "dayjs";
import { Flight } from "../types/types";

export default async function getAllFlights(): Promise<Flight[]> {
    try {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "/flights" );

        // temporary fix for (ID, fields:...) format
        var flights = res.data.map((obj: { fields: any; id: string }) => 
          Object.assign({}, obj.fields, {RecordID: obj.id}) );

        flights.forEach((obj: Flight) => {
          // type conversion
          obj.DepartDate = dayjs(obj.DepartDate);
          obj.ArriveDate = dayjs(obj.ArriveDate);
        });
        console.log(flights);
        return flights;
      } catch (error) {
        return [];
      }
}
