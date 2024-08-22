import { MainEvent } from '../types/types';
import express from 'express';
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from '../models/airtable';
import { PresetFilter, TableFields } from '../types/types';
const router = express.Router();
import { Cachekeys } from '../Enum/Cachekeys';
import { getCache, setCache, deleteCache } from '../utils/caching';
const mainEventTable = String(process.env.MAINEVENT);
//get all main events
router.get('/main-events', async (req, res) => {
  try {
    const cachedEvents = getCache(Cachekeys.MAINEVENTS);
    if (cachedEvents) {
      return res.json(cachedEvents).status(200);
    }
    const events = await getTable(mainEventTable, '');
    const formattedEvents: { [k: string]: any }[] = [];
    events.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      formattedEvents.push(plainFields);
      console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
    });
    setCache(Cachekeys.MAINEVENTS, formattedEvents);
    res.json(formattedEvents).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//get all main events for one speaker
//TODO merge this filter function to  GET /main-events
// router.get('/main-events/:speaker_id', async (req, res) => {
//   const { speaker_id } = req.params;

//   try {
//     const trips = await getTable(mainEventTable, '');
//     const events: { [k: string]: any }[] = [];

//     trips.forEach((fields) => {
//       const plainFields = Object.fromEntries(fields);
//       if (plainFields.Speaker && plainFields.Speaker.includes(speaker_id)) {
//         events.push(plainFields);
//       }
//     });
//     if (events.length === 0) {
//       return res
//         .status(404)
//         .json({ message: 'No main events found for this guest speaker' });
//     }

//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// Get a specific event by ID
router.get('/main-events/:main_event_record_id', async (req, res) => {
  const { main_event_record_id } = req.params;

  try {
    const eventRecord = await getRecord(mainEventTable, main_event_record_id);

    if (!eventRecord) {
      return res.status(404).json({ message: 'Main Event not found' });
    }
    let plainFields = Object.fromEntries(eventRecord);
    let formattedEvents: { [k: string]: any } = plainFields;
    res.json(formattedEvents);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//create one main event for one speaker
router.post('/main-events', async (req, res) => {
  const newMainEvent: MainEvent = req.body as MainEvent;
  // Check if the request body contains speaker
  if (!newMainEvent.Speaker) {
    return res.status(400).json({ error: 'At least 1 Speaker ID is required' });
  }
  const tableFields: TableFields = {
    // id: '',
    fields: newMainEvent,
  };
  console.log('tableFields:', tableFields);
  try {
    await createRecord(mainEventTable, [tableFields]);
    deleteCache(Cachekeys.MAINEVENTS);
    res.status(200).json({ message: 'new Main Event created successfully' });
  } catch (error) {
    console.error('Failed to create new MainEvent:', error);
    res.status(500).json({ error: 'Failed to create new Main event' });
  }
});
//modify one main event
router.put('/main-events/:main_event_record_id', async (req, res) => {
  const { main_event_record_id } = req.params;
  const updatedEvent: MainEvent = req.body;

  const updatedRecord = {
    id: main_event_record_id,
    fields: updatedEvent,
  };

  try {
    await updateRecord(mainEventTable, [updatedRecord]);
    deleteCache(Cachekeys.MAINEVENTS);
    res.status(200).json({ message: 'main Event updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Main event could not be updated' });
  }
});
//delete one main event
router.delete('/main-events/:main_event_record_id', async (req, res) => {
  const { main_event_record_id } = req.params;
  try {
    await deleteRecords(mainEventTable, [main_event_record_id]);
    deleteCache(Cachekeys.MAINEVENTS);
    res.status(200).json({ message: 'main Event deleted successfully' });
  } catch (err) {
    console.error('Failed to delete main event:', err);
    res.status(500).json({ error: 'Failed to delete main event' });
  }
});

module.exports = router;
