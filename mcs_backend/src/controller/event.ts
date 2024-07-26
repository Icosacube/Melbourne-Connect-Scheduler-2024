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
router.get("/event", async (req, res) => {
  try {
    const events = await getTable(mainEventTable, "");
    const formattedEvents: { id: string; fields: any }[] = [];
    events.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields);
      formattedEvents.push({ id, fields: plainFields });
      console.log(`ID: ${id}, Fields:`, plainFields);
    });
    res.json(formattedEvents).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//get all main events for one speaker
router.get('/event/:speaker_id', async (req, res) => {
  const { speaker_id} = req.params;

  try {
    const trips = await getTable(mainEventTable, "");
    const events: { id: string, fields: any }[] = [];
    
    trips.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.Speaker && plainFields.Speaker.includes(speaker_id)) {
        events.push({ id, fields: plainFields });
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
//create one main event for one speaker
router.post('/event/:speaker_id', async (req, res) => {
  const newMainEvent: MainEvent = req.body as MainEvent; 
  const { speaker_id } = req.params;
  newMainEvent.Speaker = [speaker_id];
  const tableFields: TableFields = {
    // id: '', 
    fields: newMainEvent
  };
  console.log("tableFields:",tableFields)
  try {
    await createRecord(mainEventTable, [tableFields]);
    res.status(200).json({ message: 'new Main Event created successfully' });
  } catch (error) {
    console.error("Failed to create new MainEvent:", error);
    res.status(500).json({ error: 'Failed to create new Main Event' });
  }
});
//modify one main event 
router.put("/event/:eventID", async (req, res) => {
  const { eventID } = req.params;
  const updatedEvent: MainEvent = req.body;

  const updatedRecord = {
    id: eventID,
    fields: updatedEvent,
  };

  try {
    await updateRecord(mainEventTable, [updatedRecord]);
    res.status(200).json({ message: "main Event updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "main Event could not be updated" });
  }
});
//delete one main event 
router.delete("/event/:eventID", async (req, res) => {
  const { eventID } = req.params;
  try {
    await deleteRecords(mainEventTable, [eventID]);
    res.status(200).json({ message: "main Event deleted successfully" });
  } catch (err) {
    console.error("Failed to delete main event:", err);
    res.status(500).json({ error: "Failed to delete main event" });
  }
});

module.exports = router;

