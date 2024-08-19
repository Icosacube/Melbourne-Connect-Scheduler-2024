import express from 'express';

import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords

} from '../models/airtable';
import { 
  PresetFilter,
  TableFields
} from '../types/types';
import { Trip } from '../types/types';
import {getCache,setCache,deleteCache} from '../utils/caching';
import {Cachekeys} from '../Enum/Cachekeys';
const router = express.Router();
const TripTable = String(process.env.TRIP)

//get all trips
router.get('/trips', async (req, res) => {
  try {
    const cachedTrips = getCache(Cachekeys.TRIPS);
    if (cachedTrips) {
      return res.json(cachedTrips).status(200);
    }
    const trips = await getTable(TripTable, "");
    const formattedTrips: { [k: string]: any; }[] = [];
    trips.forEach((fields) => {
      const plainFields = Object.fromEntries(fields); 
      formattedTrips.push(plainFields);
      console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
    });
    setCache("Trips", formattedTrips);
    res.json(formattedTrips);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Get a specific trip by ID
router.get('/trips/trip/:trip_record_id', async (req, res) => {
  const { trip_record_id } = req.params;
  
  try {
    const tripRecord = await getRecord(TripTable, trip_record_id);
    
    if (!tripRecord) {
      return res.status(404).json({ message: 'trip not found' });
    }
    let plainFields = Object.fromEntries(tripRecord);
    let formattedTrips: { [k: string]: any; } = plainFields
    res.json(formattedTrips)

  } catch (error) {
    console.error("Error fetching trip:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// get all trips for a speaker
router.get('/trip/:speaker_id', async (req, res) => {
  const { speaker_id} = req.params;

  try {
    const trips = await getTable(TripTable, "");
    const guestSpeakerTrips: { [k: string]: any; }[] = [];
    
    trips.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.GuestSpeaker && plainFields.GuestSpeaker.includes(speaker_id)) {
        guestSpeakerTrips.push(plainFields);
      }
    });
    if (guestSpeakerTrips.length === 0) {
      return res.status(404).json({ message: 'No trips found for this guest speaker' });
    }

    res.json(guestSpeakerTrips);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//create one trip for a speaker
router.post('/trip/:speaker_id', async (req, res) => {
  const newTrip: Trip = req.body as Trip; 
  const { speaker_id } = req.params;
  newTrip.GuestSpeaker = [speaker_id];
  console.log("newTrip:",newTrip)
  const tableFields: TableFields = {
    // id: '', 
    fields: newTrip
  };
  console.log("tableFields:",tableFields)
  try {
    await createRecord(TripTable, [tableFields]);
    deleteCache(Cachekeys.TRIPS);
    res.status(200).json({ message: 'Trip created successfully' });
  } catch (error) {
    console.error("Failed to create trip:", error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
});
//modify one trip
router.put('/trip/:trip_record_id', async (req, res) => {
  const { trip_record_id } = req.params;
  const updatedTrip: Trip = req.body as Trip;

  const recordToUpdate = [{
    id: trip_record_id,
    fields: updatedTrip
  }];

  try {
    await updateRecord(TripTable, recordToUpdate);
    res.status(200).json({ message: 'Trip updated successfully' });
  } catch (error) {
    console.error("Failed to update trip:", error);
    res.status(500).json({ error: 'Failed to update trip' });
  }
});
//delete one trip
router.delete('/trip/:trip_record_id', async (req, res) => {
  const { trip_record_id } = req.params;

  try {
    await deleteRecords(TripTable, [trip_record_id]);
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error("Failed to delete trip:", error);
    res.status(500).json({ error: 'Failed to delete trip' });
  }
});
module.exports = router;






