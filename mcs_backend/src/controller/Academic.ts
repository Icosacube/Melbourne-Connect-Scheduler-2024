import express from 'express';
import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords
} from '../models/airtable';

import { Academic, TableFields } from '../types/types';

const router = express.Router();

router.get('/academic', async (req, res) => {
  try {
    const accommodations = await getTable('Academic', "");
    const formattedAcademics: { id: string, fields: any }[] = [];
    accommodations.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields);
      formattedAcademics.push({ id, fields: plainFields });
      console.log(`ID: ${id}, Fields:`, plainFields);
    });
    res.json(formattedAcademics);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;