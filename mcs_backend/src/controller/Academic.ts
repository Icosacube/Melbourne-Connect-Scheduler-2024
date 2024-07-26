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

//get all academics
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

//get all academics for one Canvassing
router.get('/:canvassingID/Academic', async (req, res) => {
  const { canvassingID } = req.params;

  try {
    const Canvassing = await getTable('Academic', "");
    const academicCanvassing: { id: string, fields: any }[] = [];

    Canvassing.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.Canvassing && plainFields.Canvassing.includes(canvassingID)) {
        academicCanvassing.push({ id, fields: plainFields });
      }
    });

    if (academicCanvassing.length === 0) {
      return res.status(404).json({ message: 'No Canvassing found for this academic' });
    }

    res.json(academicCanvassing);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;