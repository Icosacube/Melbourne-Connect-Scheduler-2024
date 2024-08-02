import axios from "axios";
import dayjs from "dayjs";
import { Accommodation } from "../types/types";

export default async function getAllAccommodations(): Promise<Accommodation[]> {
    try {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "/accommodations" );

        // temporary fix for (ID, fields:...) format
        var accom = res.data.map((obj: { fields: any; id: string }) => 
          Object.assign({}, obj.fields, {RecordID: obj.id}) );

        accom.forEach((obj: Accommodation) => {
          // type conversion
          obj.CheckIn = dayjs(obj.CheckIn);
          obj.CheckOut = dayjs(obj.CheckOut);
        });
        console.log(accom);
        return accom;
      } catch (error) {
        return [];
      }
}
