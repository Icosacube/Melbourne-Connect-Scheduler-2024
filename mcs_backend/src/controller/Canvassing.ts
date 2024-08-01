import express from 'express';
import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords
} from '../models/airtable';

import { Canvassing, TableFields } from '../types/types';

const router = express.Router();
const CanvassingTable = String(process.env.CANVASSING)
//get all canvassings
router.get('/canvassings', async (req, res) => {
  try {
    const accommodations = await getTable(CanvassingTable, "");
    const formattedCanvassing: { id: string, fields: any }[] = [];
    accommodations.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields);
      formattedCanvassing.push({ id, fields: plainFields });
      console.log(`ID: ${id}, Fields:`, plainFields);
    });
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
    let plainFields = Object.fromEntries(CanvassingRecord.get(Canvassing_record_id));
    let formattedCanvassings: {id: string, fields: any} = {id: Canvassing_record_id, fields: plainFields}
    res.json(formattedCanvassings)

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
    const tripCanvassing: { id: string, fields: any }[] = [];

    Canvassing.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.Trip && plainFields.Trip.includes(tripID)) {
        tripCanvassing.push({ id, fields: plainFields });
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

module.exports = router;