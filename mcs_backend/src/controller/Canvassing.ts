import express from 'express';
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from '../models/airtable';

import { Canvassing, TableFields } from '../types/types';

const router = express.Router();
const canvassingTable = String(process.env.CANVASSING);
//get all canvassing
router.get('/canvassing', async (req, res) => {
  try {
    const accommodations = await getTable(canvassingTable, '');
    const formattedCanvassing: { [k: string]: any }[] = [];
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
// Get a specific Canvassing by ID
router.get('/canvassing/:canvassing_record_id', async (req, res) => {
  const { canvassing_record_id } = req.params;

  try {
    const canvassingRecord = await getRecord(
      canvassingTable,
      canvassing_record_id,
    );

    if (!canvassingRecord) {
      return res.status(404).json({ message: 'Canvassing not found' });
    }
    let plainFields = Object.fromEntries(canvassingRecord);
    let formattedCanvassing: { [k: string]: any } = plainFields;
    res.json(formattedCanvassing);
  } catch (error) {
    console.error('Error fetching Canvassing:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//get all canvassing for one trip
//TODO merge this filter function to  GET /canvassing
router.get('/canvassing/:tripID', async (req, res) => {
  const { tripID } = req.params;

  try {
    const Canvassing = await getTable(canvassingTable, '');
    const tripCanvassing: { [k: string]: any }[] = [];

    Canvassing.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.Trip && plainFields.Trip.includes(tripID)) {
        tripCanvassing.push(plainFields);
      }
    });

    if (tripCanvassing.length === 0) {
      return res
        .status(404)
        .json({ message: 'No Canvassing found for this trip' });
    }

    res.json(tripCanvassing);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//TODO add update and delete canvassing routes maybe?

module.exports = router;
