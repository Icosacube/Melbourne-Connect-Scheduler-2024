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

router.get('/canvassing', async (req, res) => {
  try {
    const accommodations = await getTable('Canvassing', "");
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
router.get('/:tripID/Canvassing', async (req, res) => {
  const { tripID } = req.params;

  try {
    const Canvassing = await getTable('Canvassing', "");
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