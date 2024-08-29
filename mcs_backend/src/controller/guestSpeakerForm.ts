import express from 'express';
import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
  getNotConfirmed
} from '../models/airtable';

import {
    Creation,
    PresetFilter
} from '../types/types';

const router = express.Router();
const speakerTable = String(process.env.SPEAKERS);
const mainEventTable = String(process.env.MAINEVENT);
const speakerFormTable = String(process.env.SPEAKERFORM);


router.get('/speaker-form', async (req, res) => {
    try {
      const empty = {fields: {"Confirmed": false}}
      const speakerId = await createRecord(speakerTable, [empty]);
      const mainEventId = await createRecord(mainEventTable, [empty]);

      const speakerFormURL = "https://airtable.com/app79kFx8O6KyDmzX/pagdVhuKBJu0OemCS/form?prefill_speakerID=" + speakerId + "&hide_speakerID=true&prefill_mainID=" + mainEventId + "&hide_mainID=true";

      purge(speakerTable);
      purge(mainEventTable);
      purge(speakerFormTable);

      res.send(speakerFormURL);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


async function purge(table: string, limit: number = 180){
    let now = new Date().getTime();
    let dateToPurge = limit * (4 * 60 * 60 * 1000)

    let records = await getNotConfirmed(table, PresetFilter.notConfirmed);

    let purgeList = []
    
    for (const record of records){
        let recordTime = new Date(record.createdTime).getTime();

        if ((now - recordTime) >= dateToPurge){
            purgeList.push(record.id);
        }
    }

    if (purgeList.length > 0){
        deleteRecords(table, purgeList);
    }
}

module.exports = router;