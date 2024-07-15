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
const router = express.Router();

router.get('/trip', async (req, res) => {
  try {
    const trips = await getTable('Trip', "");
    const formattedtrips: { id: string, fields: any }[] = [];
    trips.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields); 
      formattedtrips.push({ id, fields: plainFields });
      console.log(`ID: ${id}, Fields:`, plainFields);
    });
    res.json(formattedtrips);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/trip/:speaker_id', async (req, res) => {
  const { speaker_id} = req.params;

  try {
    const trips = await getTable('Trip', "");
    const guestSpeakerTrips: { id: string, fields: any }[] = [];
    
    trips.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.Guest_Speaker && plainFields.Guest_Speaker.includes(speaker_id)) {
        guestSpeakerTrips.push({ id, fields: plainFields });
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

router.post('/trip/:speaker_id', async (req, res) => {
  const newTrip: Trip = req.body as Trip; 
  const { speaker_id } = req.params;
  newTrip.GuestSpeaker = [speaker_id];

  const tableFields: TableFields = {
    id: '', 
    fields: newTrip
  };

  try {
    await createRecord('Trip', [tableFields]);
    res.status(201).json({ message: 'Trip created successfully' });
  } catch (error) {
    console.error("Failed to create trip:", error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
});

router.put('/trip/:trip_record_id', async (req, res) => {
  const { trip_record_id } = req.params;
  const updatedTrip: Trip = req.body as Trip;

  const recordToUpdate = [{
    id: trip_record_id,
    fields: updatedTrip
  }];

  try {
    await updateRecord('Trip', recordToUpdate);
    res.status(200).json({ message: 'Trip updated successfully' });
  } catch (error) {
    console.error("Failed to update trip:", error);
    res.status(500).json({ error: 'Failed to update trip' });
  }
});
router.delete('/trip/:trip_record_id', async (req, res) => {
  const { trip_record_id } = req.params;

  try {
    const localTransports = await getTable('LocalTransport', "");
    const localTransportIDs: string[] = Array.from(localTransports.values())
      .reduce((ids: string[], record: Map<string, any>) => {
        const fields = Object.fromEntries(record);
        if (fields.Trip && fields.Trip.includes(trip_record_id)) {
          ids.push(record.get('id'));
        }
        return ids;
      }, []);

    const flights = await getTable('Flight', "");
    const flightIDs: string[] = Array.from(flights.values())
      .reduce((ids: string[], record: Map<string, any>) => {
        const fields = Object.fromEntries(record);
        if (fields.Trip && fields.Trip.includes(trip_record_id)) {
          ids.push(record.get('id'));
        }
        return ids;
      }, []);

    const accommodations = await getTable('Accommodation', "");
    const accommodationIDs: string[] = Array.from(accommodations.values())
      .reduce((ids: string[], record: Map<string, any>) => {
        const fields = Object.fromEntries(record);
        if (fields.Trip && fields.Trip.includes(trip_record_id)) {
          ids.push(record.get('id'));
        }
        return ids;
      }, []);

    const deleteLocalTransports = localTransportIDs.length > 0 ?
      deleteRecords('LocalTransport', localTransportIDs) : Promise.resolve();

    const deleteFlights = flightIDs.length > 0 ?
      deleteRecords('Flight', flightIDs) : Promise.resolve();

    const deleteAccommodations = accommodationIDs.length > 0 ?
      deleteRecords('Accommodation', accommodationIDs) : Promise.resolve();

    await deleteRecords('Trip', [trip_record_id]);
    await Promise.all([deleteLocalTransports, deleteFlights, deleteAccommodations]);

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error("Failed to delete trip:", error);
    res.status(500).json({ error: 'Failed to delete trip' });
  }
});
module.exports = router;






