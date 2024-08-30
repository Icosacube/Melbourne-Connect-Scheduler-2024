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
const FlightTable = String(process.env.FLIGHT)
import {Cachekeys} from '../Enum/Cachekeys';
import {getCache,setCache,deleteCache} from '../utils/caching';
//get all flights
router.get('/flights', async (req, res) => {
    try {
      const cachedFlights = getCache(Cachekeys.FLIGHTS);
      if (cachedFlights) {
          return res.json(cachedFlights).status(200);
      }
      const flights = await getTable(FlightTable, "");
      const formattedFlights: { [k: string]: any; }[] = [];
      flights.forEach((fields) => {
        const plainFields = Object.fromEntries(fields); 
        formattedFlights.push(plainFields);
        console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
      });
      setCache(Cachekeys.FLIGHTS, formattedFlights);
      res.json(formattedFlights);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // Get a specific Flight by ID
router.get('/flights/flight/:Flight_record_id', async (req, res) => {
  const { Flight_record_id } = req.params;
  
  try {
    const FlightRecord = await getRecord(FlightTable, Flight_record_id);
    
    if (!FlightRecord) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    let plainFields = Object.fromEntries(FlightRecord.get(Flight_record_id));
    let formattedFlights: { [k: string]: any; } = plainFields
    res.json(formattedFlights)

  } catch (error) {
    console.error("Error fetching Flight:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  //get all flights for one trip
router.get('/flight/:tripID', async (req, res) => {
    const { tripID } = req.params;
  
    try {
      const flights = await getTable(FlightTable, "");
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
router.post('/flight/:tripID', async (req, res) => {
    const tripID = req.params.tripID;
    const newFlight : Flight  = req.body;
    newFlight.Trip = [tripID];
    const FlightRecord = {
        fields: newFlight 
    };

    try {
        await createRecord(FlightTable, [FlightRecord]);
        deleteCache(Cachekeys.FLIGHTS);
        res.status(200).json({ message: 'flight created successfully' });
    } catch (error) {
        console.error("Failed to create flight:", error);
        res.status(500).json({ error: 'Failed to create flight' });
    }
});
  //modify one flight 
router.put('/flight/:flight_record_id', async (req, res) => {
    const { flight_record_id } = req.params;
    const updatedFlight: Flight = req.body;
  
    const recordToUpdate = [{
      id: flight_record_id,
      fields: updatedFlight
    }];
  
    try {
      await updateRecord(FlightTable, recordToUpdate);
      deleteCache(Cachekeys.FLIGHTS);
      res.status(200).json({ message: 'Flight updated successfully' });
    } catch (error) {
      console.error("Failed to update flight:", error);
      res.status(500).json({ error: 'Failed to update flight' });
    }
  });
   //delete one flight 
  router.delete('/flight/:flight_record_id', async (req, res) => {
    const { flight_record_id } = req.params;
  
    try {
      await deleteRecords(FlightTable, [flight_record_id]);
      deleteCache(Cachekeys.FLIGHTS);
      res.status(200).json({ message: 'Flight deleted successfully' });
    } catch (error) {
      console.error("Failed to delete flight:", error);
      res.status(500).json({ error: 'Failed to delete flight' });
    }
  });
module.exports = router;