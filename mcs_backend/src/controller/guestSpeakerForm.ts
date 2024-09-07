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
const formUrl = String(process.env.SPEAKERFORMURL);


router.get('/speaker-event-form', async (req, res) => {
    try {
      const empty = {fields: {"Confirmed": false}}
      const speakerId = await createRecord(speakerTable, [empty]);
      const mainEventId = await createRecord(mainEventTable, [empty]);

      const speakerEventFormUrl = formUrl + "?prefill_speakerID=" + speakerId + "&hide_speakerID=true&prefill_mainID=" + mainEventId + "&hide_mainID=true";

      purge(speakerTable);
      purge(mainEventTable);
      purge(speakerFormTable);

      res.send(speakerEventFormUrl);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/speaker-event-form/:speaker_record_id/:main_event_record_id', async (req, res) => {
    try {
      const { speaker_record_id, main_event_record_id } = req.params;
      const speaker = await getRecord(speakerTable, speaker_record_id);
      const mainEvent = await getRecord(mainEventTable, main_event_record_id);

      const baseUrl = formUrl + "?";

      let fillList = [];

      fillList.push("hide_speakerID=true&hide_mainID=true");

      fillList = fillList.concat(prefillFields(speaker, SpeakerForm));
      fillList = fillList.concat(prefillFields(mainEvent, MainEventForm));

      let speakerEventFormUrl = (baseUrl + fillList.join("&")).split(' ').join('+');

      res.send(speakerEventFormUrl);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/speaker-form', async (req, res) => {
  try {
    const empty = {fields: {"Confirmed": false}}
    const speakerId = await createRecord(speakerTable, [empty]);

    const baseUrl = formUrl + "?prefill_speakerID=" + speakerId + "&hide_speakerID=true";
    let fillList = hideFields(MainEventForm);
    
    let speakerFormUrl = (baseUrl + "&" + fillList.join("&")).split(' ').join('+');


    purge(speakerTable);
    purge(speakerFormTable);

    res.send(speakerFormUrl);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/speaker-form/:speaker_record_id', async (req, res) => {
    try {
      const { speaker_record_id} = req.params;
      const speaker = await getRecord(speakerTable, speaker_record_id);

      const baseUrl = formUrl + "?";

      let fillList = [];

      fillList.push("hide_speakerID=true")

      fillList = fillList.concat(prefillFields(speaker, SpeakerForm));
      fillList = fillList.concat(hideFields(MainEventForm));

      let speakerFormUrl = (baseUrl + fillList.join("&")).split(' ').join('+');

      res.send(speakerFormUrl);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/event-form', async (req, res) => {
  try {
    const empty = {fields: {"Confirmed": false}}
    const mainEventId = await createRecord(mainEventTable, [empty]);

    const baseUrl = formUrl + "?prefill_mainID=" + mainEventId + "&hide_mainID=true";
    let fillList = hideFields(SpeakerForm);
    
    let eventFormUrl = (baseUrl + "&" + fillList.join("&")).split(' ').join('+');

    purge(mainEventTable);
    purge(speakerFormTable);

    res.send(eventFormUrl);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/event-form/:main_event_record_id', async (req, res) => {
    try {
      const { main_event_record_id } = req.params;
      const mainEvent = await getRecord(mainEventTable, main_event_record_id);

      const baseUrl = formUrl + "?";

      let fillList = [];

      fillList.push("hide_mainID=true");
      fillList.push("hide_Headshot=true");
      fillList = fillList.concat(hideFields(SpeakerForm));
      fillList = fillList.concat(prefillFields(mainEvent, MainEventForm));

      let eventFormUrl = (baseUrl + fillList.join("&")).split(' ').join('+');

      res.send(eventFormUrl);
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

function prefillFields(fields : Map<string, any>, e : any) : Array<string>{
  const prefill = "prefill_";
  const fillList = [];

  for (var [field, value] of fields){
    if (e[field as keyof typeof e] != null && e[field as keyof typeof e] != undefined){
      let item = prefill + e[field as keyof typeof e] + "=" + value;
      fillList.push(item);
    }
  }
  return fillList;
}

function hideFields(e : any ) : Array<string> {
  const hide = "hide_";
  const fillList = [];

  for (var field of Object.keys(e)){
    let item = hide + e[field] + "=true"
    fillList.push(item);
  }

  return fillList;
}

module.exports = router;