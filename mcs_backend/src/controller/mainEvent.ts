import { MainEvent } from "../types/types";
import express from "express";
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from "../models/airtable";
import { 
  PresetFilter,
  TableFields
} from '../types/types';
const router = express.Router();

const mainEventTable = String(process.env.MAINEVENT)
//get all main events
router.get("/main-events", async (req, res) => {
  try {
    const events = await getTable(mainEventTable, "");
    const formattedEvents: { [k: string]: any; }[] = [];
    events.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      formattedEvents.push(plainFields);
      console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
    });
    res.json(formattedEvents).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//get all main events for one speaker
//TODO merge this filter function to  GET /main-events
router.get('/main-events/:speaker_id', async (req, res) => {
  const { speaker_id} = req.params;

  try {
    const trips = await getTable(mainEventTable, "");
    const events: { [k: string]: any; }[] = [];
    
    trips.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.Speaker && plainFields.Speaker.includes(speaker_id)) {
        events.push(plainFields);
      }
    });
    if (events.length === 0) {
      return res.status(404).json({ message: 'No main events found for this guest speaker' });
    }

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Get a specific event by ID
router.get('/main-events/:main_event_record_id', async (req, res) => {
    const { main_event_record_id } = req.params;
    
    try {
      const eventRecord = await getRecord(mainEventTable, main_event_record_id);
      
      if (!eventRecord) {
        return res.status(404).json({ message: 'event not found' });
      }
      let plainFields = Object.fromEntries(eventRecord);
      let formattedEvents: { [k: string]: any; } = plainFields
      res.json(formattedEvents)

    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//create one main event for one speaker
//TODO
//fix create event so that event doesn't have to be tied to 1 speaker only
//fix create event must have speaker
router.post('/main-events', async (req, res) => {
  const newMainEvent: MainEvent = req.body as MainEvent; 
  const tableFields: TableFields = {
    // id: '', 
    fields: newMainEvent
  };
  console.log("tableFields:",tableFields)
  try {
    await createRecord(mainEventTable, [tableFields]);
    res.status(200).json({ message: 'New main event created successfully' });
  } catch (error) {
    console.error("Failed to create new MainEvent:", error);
    res.status(500).json({ error: 'Failed to create new Main event' });
  }
});
//modify one main event 
router.put("/main-events/:main_event_record_id", async (req, res) => {
  const { main_event_record_id } = req.params;
  const updatedEvent: MainEvent = req.body;

  const updatedRecord = {
    id: main_event_record_id,
    fields: updatedEvent,
  };

  try {
    await updateRecord(mainEventTable, [updatedRecord]);
    res.status(200).json({ message: "Main event updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Main event could not be updated" });
  }
});
//delete one main event 
router.delete("/main-events/:main_event_record_id", async (req, res) => {
  const { main_event_record_id } = req.params;
  try {
    await deleteRecords(mainEventTable, [main_event_record_id]);
    res.status(200).json({ message: "Main event deleted successfully" });
  } catch (err) {
    console.error("Failed to delete main event:", err);
    res.status(500).json({ error: "Failed to delete main event" });
  }
});

module.exports = router;

