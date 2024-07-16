import express from 'express';
import { 
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
  
  } from '../models/airtable';

const router = express.Router();
import { Flight } from '../types/types';
router.get('/flight', async (req, res) => {
    try {
      const flights = await getTable('Flight', "");
      const formattedFlights: { id: string, fields: any }[] = [];
      flights.forEach((fields, id) => {
        const plainFields = Object.fromEntries(fields); 
        formattedFlights.push({ id, fields: plainFields });
        console.log(`ID: ${id}, Fields:`, plainFields);
      });
      res.json(formattedFlights);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.get('/:tripID/flight', async (req, res) => {
    const { tripID } = req.params;
  
    try {
      const flights = await getTable('Flight', "");
      const tripFlights: { id: string, fields: any }[] = [];
  
      flights.forEach((fields, id) => {
        const plainFields = Object.fromEntries(fields);
        if (plainFields.Trip && plainFields.Trip.includes(tripID)) {
          tripFlights.push({ id, fields: plainFields });
        }
      });
  
      if (tripFlights.length === 0) {
        return res.status(404).json({ message: 'No flights found for this trip' });
      }
  
      res.json(tripFlights);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.post('/:tripID/flight', async (req, res) => {
    const tripID = req.params.tripID;
    const newFlight : Flight  = req.body;
    newFlight.Trip = [tripID];
    const FlightRecord = {
        fields: newFlight 
    };

    try {
        await createRecord('Flight', [FlightRecord]);
        res.status(200).json({ message: 'flight created successfully' });
    } catch (error) {
        console.error("Failed to create flight:", error);
        res.status(500).json({ error: 'Failed to create flight' });
    }
});
router.put('/flight/:flight_record_id', async (req, res) => {
    const { flight_record_id } = req.params;
    const updatedFlight: Flight = req.body;
  
    const recordToUpdate = [{
      id: flight_record_id,
      fields: updatedFlight
    }];
  
    try {
      await updateRecord('Flight', recordToUpdate);
      res.status(200).json({ message: 'Flight updated successfully' });
    } catch (error) {
      console.error("Failed to update flight:", error);
      res.status(500).json({ error: 'Failed to update flight' });
    }
  });
  
  router.delete('/flight/:flight_record_id', async (req, res) => {
    const { flight_record_id } = req.params;
  
    try {
      await deleteRecords('Flight', [flight_record_id]);
      res.status(200).json({ message: 'Flight deleted successfully' });
    } catch (error) {
      console.error("Failed to delete flight:", error);
      res.status(500).json({ error: 'Failed to delete flight' });
    }
  });
module.exports = router;