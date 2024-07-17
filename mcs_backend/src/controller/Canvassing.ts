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

module.exports = router;