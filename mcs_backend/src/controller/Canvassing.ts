import express from 'express';
import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords
} from '../models/airtable';

import { Canvassing, TableFields } from '../types/types';
import {Cachekeys} from '../Enum/Cachekeys';
import {getCache,setCache,deleteCache} from '../utils/caching';
const router = express.Router();
const CanvassingTable = String(process.env.CANVASSING)
//get all canvassings
router.get('/canvassings', async (req, res) => {
  try {
    const cachedCanvassing = getCache(Cachekeys.CANVASSINGS);
    if (cachedCanvassing) {
        return res.json(cachedCanvassing).status(200);
    }
    const accommodations = await getTable(CanvassingTable, "");
    const formattedCanvassing: { [k: string]: any; }[] = [];
    accommodations.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      formattedCanvassing.push(plainFields);
      console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
    });
    setCache(Cachekeys.CANVASSINGS, formattedCanvassing);
    res.json(formattedCanvassing);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Get a specific Canvassing by ID
router.get('/canvassings/canvasssing/:Canvassing_record_id', async (req, res) => {
  const { Canvassing_record_id } = req.params;
  
  try {
    const CanvassingRecord = await getRecord(CanvassingTable, Canvassing_record_id);
    
    if (!CanvassingRecord) {
      return res.status(404).json({ message: 'Canvassing not found' });
    }
    let plainFields = Object.fromEntries(CanvassingRecord);
    let formattedCanvassing: { [k: string]: any; } = plainFields
    res.json(formattedCanvassing)

  } catch (error) {
    console.error("Error fetching Canvassing:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//get all canvassings for one trip
router.get('/Canvassing/:tripID', async (req, res) => {
  const { tripID } = req.params;

  try {
    const Canvassing = await getTable(CanvassingTable, "");
    const tripCanvassing: { [k: string]: any; }[] = [];

    Canvassing.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.Trip && plainFields.Trip.includes(tripID)) {
        tripCanvassing.push(plainFields);
      }
    });

    if (tripCanvassing.length === 0) {
      return res.status(404).json({ message: 'No Canvassing found for this trip' });
    }

    res.json(tripCanvassing);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/Canvassing/:TripID/:AcademicID', async (req, res) => {
  const { TripID,AcademicID } = req.params;
  const newCanvassing: Canvassing = req.body;
  newCanvassing.Trip= [TripID];
  newCanvassing.Academic = [AcademicID];
  const cateringRecord = {
      fields: newCanvassing
  };
  
  try {
      await createRecord(CanvassingTable, [cateringRecord]);
      deleteCache(Cachekeys.CANVASSINGS);
      res.status(200).json({ message: 'Canvassing created successfully' });
  } catch (error) {
      console.error("Failed to create Canvassing:", error);
      res.status(500).json({ error: 'Failed to create Canvassing' });
  }
});
module.exports = router;