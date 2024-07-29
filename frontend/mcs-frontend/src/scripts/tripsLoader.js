import axios from 'axios';

export async function loader() {
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/trip');
    const rawTrips = res.data;
    const trips = [];

    // Flatten it so ID is on same level as fields
    rawTrips.forEach((trip) => {
      trip.fields.id = trip.id;
      var index = rawTrips.findIndex((trp) => trp === trip);
      trips[index] = trip.fields;
    });
    console.log(trips);
    return trips;
  } catch (error) {
    return {};
  }
}
