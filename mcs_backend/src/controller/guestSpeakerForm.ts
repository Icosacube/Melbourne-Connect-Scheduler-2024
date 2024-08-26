import express from 'express';
import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords
} from '../models/airtable';

import {Creation} from '../types/types';

const router = express.Router();
const speakerTable = String(process.env.SPEAKERS);
const mainEventTable = String(process.env.MAINEVENT);


router.get('/speaker-form', async (req, res) => {
    try {

      const empty = {fields: {}}
      const speakerId = await createRecord(speakerTable, [empty]);
      const mainEventId = await createRecord(mainEventTable, [empty]);

      const speakerFormURL = "https://airtable.com/app79kFx8O6KyDmzX/pagdVhuKBJu0OemCS/form?prefill_speakerID=" + speakerId + "&hide_speakerID=true&prefill_mainID=" + mainEventId + "&hide_mainID=true";

      res.send(speakerFormURL);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;