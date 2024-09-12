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
const speakerEventFormUrl = String(process.env.SPEAKEREVENTFORMURL);
const speakerFormUrl = String(process.env.SPEAKERFORMURL);
const eventFormUrl = String(process.env.EVENTFORMURL);


// Generate Empty records for Speaker and Event and return a form url to send to 
// the speaker. 
router.get('/speaker-event-form', async (req, res) => {
    try {
      const empty = {fields: {"Confirmed": false}}
      const speakerId = await createRecord(speakerTable, [empty]);
      const mainEventId = await createRecord(mainEventTable, [empty]);

      const url = speakerEventFormUrl + "?prefill_speakerID=" + speakerId + "&hide_speakerID=true&prefill_mainID=" + mainEventId + "&hide_mainID=true";

      purge(speakerTable);
      purge(mainEventTable);
      purge(speakerFormTable, true);

      res.send(url);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Return a form url prefilled with speaker and event information given the 
// record id provided and return prefilled url 
router.get('/speaker-event-form/:speaker_record_id/:main_event_record_id', async (req, res) => {
    try {
      const { speaker_record_id, main_event_record_id } = req.params;
      const speaker = await getRecord(speakerTable, speaker_record_id);
      const mainEvent = await getRecord(mainEventTable, main_event_record_id);

      const baseUrl = speakerEventFormUrl + "?";

      let fillList = [];

      fillList.push("hide_speakerID=true&hide_mainID=true");

      fillList = fillList.concat(prefillFields(speaker, SpeakerForm));
      fillList = fillList.concat(prefillFields(mainEvent, MainEventForm));

      let url = (baseUrl + fillList.join("&")).split(' ').join('+');

      res.send(url);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Generate Empty record for Speaker and return a form url
router.get('/speaker-form', async (req, res) => {
  try {
    const empty = {fields: {"Confirmed": false}}
    const speakerId = await createRecord(speakerTable, [empty]);

    const url = speakerFormUrl + "?prefill_speakerID=" + speakerId + "&hide_speakerID=true";

    purge(speakerTable);
    purge(speakerFormTable, true);

    res.send(url);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Return a form url prefilled with speaker information given the record id  
// provided and return prefilled url 
router.get('/speaker-form/:speaker_record_id', async (req, res) => {
    try {
      const { speaker_record_id} = req.params;
      const speaker = await getRecord(speakerTable, speaker_record_id);

      const baseUrl = speakerFormUrl + "?";

      let fillList = [];

      fillList.push("hide_speakerID=true")

      fillList = fillList.concat(prefillFields(speaker, SpeakerForm));

      let url = (baseUrl + fillList.join("&")).split(' ').join('+');

      res.send(url);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Generate Empty records for Event and return a form url with Speaker record id 
// attached  
router.get('/event-form/:speaker_record_id', async (req, res) => {
  try {
    const { speaker_record_id } = req.params;
    const empty = {fields: {"Confirmed": false}}
    const mainEventId = await createRecord(mainEventTable, [empty]);

    const url = eventFormUrl + "?prefill_speakerID=" + speaker_record_id + "&hide_speakerID=true&prefill_mainID=" + mainEventId + "&hide_mainID=true";

    purge(mainEventTable);
    purge(speakerFormTable, true);

    res.send(url);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Return a form url prefilled with event information given the record id  
// provided and return prefilled url 
router.get('/event-form/:speaker_record_id/:main_event_record_id', async (req, res) => {
    try {
      const { speaker_record_id, main_event_record_id } = req.params;
      const mainEvent = await getRecord(mainEventTable, main_event_record_id);

      const baseUrl = eventFormUrl + "?";

      let fillList = [];

      fillList.push("hide_mainID=true");
      fillList.push("prefill_speakerID=" + speaker_record_id);
      fillList.push("hide_speakerID=true");
      fillList = fillList.concat(prefillFields(mainEvent, MainEventForm));

      let url = (baseUrl + fillList.join("&")).split(' ').join('+');

      res.send(url);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Purge record in table after the set number of day after, defaulted to 180 days
async function purge(table: string, formTable: boolean = false, limit: number = 180) {
    let now = new Date().getTime();
    let dateToPurge = limit * (4 * 60 * 60 * 1000)
    let records

    if (formTable){
      records = await getNotConfirmed(table);
    } else {
      records = await getNotConfirmed(table, PresetFilter.notConfirmed);
    }

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

// generate prefill parameter for url 
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

module.exports = router;