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
    PresetFilter,
    SpeakerForm,
    MainEventForm
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

router.get('/speaker-form/:speaker_record_id/:main_event_record_id', async (req, res) => {
    try {
      const { speaker_record_id, main_event_record_id } = req.params;
      const speaker = await getRecord(speakerTable, speaker_record_id);
      const mainEvent = await getRecord(mainEventTable, main_event_record_id);

      const baseUrl = "https://airtable.com/app79kFx8O6KyDmzX/pagdVhuKBJu0OemCS/form?";
      const prefill = "prefill_";

      const fillList = [];

      for (var [field, value] of speaker){
        if (SpeakerForm[field as keyof typeof SpeakerForm] != null && SpeakerForm[field as keyof typeof SpeakerForm] != undefined){
          let item = prefill + SpeakerForm[field as keyof typeof SpeakerForm] + "=" + value;
          fillList.push(item);
        }
      }

      for (var [field, value] of mainEvent){
        if (MainEventForm[field as keyof typeof MainEventForm] != null && MainEventForm[field as keyof typeof MainEventForm] != undefined){
          let item = prefill + MainEventForm[field as keyof typeof MainEventForm] + "=" + value;
          fillList.push(item);
        }
      }

      fillList.push("hide_speakerID=true&hide_mainID=true")

      let speakerFormURL = baseUrl + fillList.join("&");

      speakerFormURL = speakerFormURL.split(' ').join('+')

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