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
router.get('/canvassing', async (req, res) => {
  try {
    const accommodations = await getTable(CanvassingTable, "");
    const formattedCanvassing: { [k: string]: any; }[] = [];
    accommodations.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      formattedCanvassing.push(plainFields);
      console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
    });
    res.json(formattedCanvassing);
  } catch (error) {
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

module.exports = router;