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


router.get('/speaker-form', async (req, res) => {
    try {

      const empty = {fields: {"Confirmed": true}}
      const speakerId = await createRecord(speakerTable, [empty]);
      const mainEventId = await createRecord(mainEventTable, [empty]);

      const speakerFormURL = "https://airtable.com/app79kFx8O6KyDmzX/pagdVhuKBJu0OemCS/form?prefill_speakerID=" + speakerId + "&hide_speakerID=true&prefill_mainID=" + mainEventId + "&hide_mainID=true";

      purge()

      res.send(speakerFormURL);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


async function purge(){
    let now = new Date().getTime();
    let halfYear = 180
    let dateToPurge = halfYear * (4 * 60 * 60 * 1000)

    let speakers = await getNotConfirmed(speakerTable, PresetFilter.notConfirmed);
    let mainEvents = await getNotConfirmed(mainEventTable, PresetFilter.notConfirmed);

    let speakerPurge = []
    let mainEventPurge = []
    
    for (const record of speakers){
        let recordTime = new Date(record.createdTime).getTime();

        if ((now - recordTime) >= dateToPurge){
            speakerPurge.push(record.id);
        }
    }
    
    for (const record of mainEvents){
        let recordTime = new Date(record.createdTime).getTime();

        if ((now - recordTime) >= dateToPurge){
            mainEventPurge.push(record.id);
        }
    }

    if (speakerPurge.length > 0){
        deleteRecords(speakerTable, speakerPurge);
    }

    if (mainEventPurge.length > 0){
        deleteRecords(mainEventTable, mainEventPurge);
    }
}

module.exports = router;