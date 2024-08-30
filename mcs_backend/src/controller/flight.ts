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
const flightTable = String(process.env.FLIGHT);
const financeTable = String(process.env.FINANCE);


//get all flights
router.get('/flights', async (req, res) => {
    try {
      const flights = await getTable(flightTable, "");
      const formattedFlights: { [k: string]: any; }[] = [];
      flights.forEach((fields) => {
        const plainFields = Object.fromEntries(fields); 
        formattedFlights.push(plainFields);
        console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
      });
      res.json(formattedFlights);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//get a specific Flight by ID
router.get('/flights/:flight_record_id', async (req, res) => {
  const { flight_record_id } = req.params;
  
  try {
    const flightRecord = await getRecord(flightTable, flight_record_id);
    
    if (!flightRecord) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    let plainFields = Object.fromEntries(flightRecord.get(flight_record_id));
    let formattedFlights: { [k: string]: any; } = plainFields
    res.json(formattedFlights)

  } catch (error) {
    console.error("Error fetching Flight:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get all flights for one trip; merge this filter function to  GET /flights
router.get('/flights/:tripID', async (req, res) => {
    const { tripID } = req.params;
  
    try {
      const flights = await getTable(flightTable, "");
      const tripFlights: { [k: string]: any; }[] = [];
  
      flights.forEach((fields, id) => {
        const plainFields = Object.fromEntries(fields);
        if (plainFields.Trip && plainFields.Trip.includes(tripID)) {
          tripFlights.push(plainFields);
        }
      });
  
      res.json(tripFlights);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//create one flight for one trip
router.post('/flights', async (req, res) => {
    const {Trip: tripID} = req.body;
    const newFlight : Flight  = req.body;
    newFlight.Trip = tripID;
    const FlightRecord = {
        fields: newFlight 
    };

    try {
        let recordId = await createRecord(flightTable, [FlightRecord]);
        await createRecord(financeTable,[{fields: {"Accommodation": recordId}}])
        res.status(200).json({ message: 'flight created successfully' });
    } catch (error) {
        console.error("Failed to create flight:", error);
        res.status(500).json({ error: 'Failed to create flight' });
    }
});

//modify one flight 
router.put('/flights/:flight_record_id', async (req, res) => {
    const { flight_record_id } = req.params;
    const updatedFlight: Flight = req.body;
  
    const recordToUpdate = [{
      id: flight_record_id,
      fields: updatedFlight
    }];
  
    try {
      await updateRecord(flightTable, recordToUpdate);
      res.status(200).json({ message: 'Flight updated successfully' });
    } catch (error) {
      console.error("Failed to update flight:", error);
      res.status(500).json({ error: 'Failed to update flight' });
    }
  });

//delete one flight 
router.delete('/flights/:flight_record_id', async (req, res) => {
  const { flight_record_id } = req.params;
  const record = await getRecord(flightTable, flight_record_id);
  const financeId = record.get('Finance')[0];

  try {
    await deleteRecords(flightTable, [flight_record_id]);
    await deleteRecords('Finance', [financeId]);
    res.status(200).json({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error("Failed to delete flight:", error);
    res.status(500).json({ error: 'Failed to delete flight' });
  }
});
module.exports = router;