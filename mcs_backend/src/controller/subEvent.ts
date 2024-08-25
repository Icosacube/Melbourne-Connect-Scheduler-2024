import express from 'express';

import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from '../models/airtable';
import { SubEvent } from '../types/types';
import { getCache, setCache, deleteCache } from '../utils/caching';
import { Cachekeys } from '../Enum/Cachekeys';
const router = express.Router();
const subEventTable = String(process.env.SUBEVENT);

//get all subEvents
router.get('/sub-events', async (req, res) => {
  try {
    const cachedsubevents = getCache(Cachekeys.SUBEVENTS);
    if (cachedsubevents) {
      return res.json(cachedsubevents).status(200);
    }
    const subevents = await getTable(subEventTable, '');
    const formattedSubEvents: { [k: string]: any }[] = [];
    subevents.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      formattedSubEvents.push(plainFields);
      console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
    });
    setCache(Cachekeys.SUBEVENTS, formattedSubEvents);
    res.json(formattedSubEvents);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// route to get sub events for a specific event
//TODO merge this filter function to  GET /sub-events
// router.get('/sub-events/:event_id', async (req, res) => {
//   const { event_id: eventId } = req.params;

//   try {
//     const services = await getTable(subEventTable, '');
//     const eventServices: { [k: string]: any }[] = [];

//     services.forEach((fields) => {
//       const plainFields = Object.fromEntries(fields);
//       if (plainFields.MainEvent && plainFields.MainEvent.includes(eventId)) {
//         eventServices.push(plainFields);
//       }
//     });

//     if (eventServices.length === 0) {
//       return res
//         .status(404)
//         .json({ message: 'No subEvents found for this main event' });
//     }

//     res.json(eventServices);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

//get one subEvent
router.get('/sub-events/:sub_event_id', async (req, res) => {
  const { sub_event_id } = req.params;
  try {
    const subEvent = await getRecord(subEventTable, sub_event_id);

    if (!subEvent) {
      return res.status(404).json({ error: 'Sub event not found' });
    }

    let plainFields = Object.fromEntries(subEvent);
    let formattedSubEvents: { [k: string]: any } = plainFields;
    res.json(formattedSubEvents);
  } catch (error) {
    console.error('Error fetching sub event:', error);
    res.status(500).json({ error: 'Failed to fetch sub event' });
  }
});

//create a subEvent
//TODO subEvent to be linked to 1 main event only?
router.post('/sub-events/:event_id', async (req, res) => {
  const { event_id: eventId } = req.params;
  const newSubEvent: SubEvent = req.body;

  newSubEvent.MainEvent = [eventId];

  const tableFields = {
    fields: newSubEvent,
  };

  try {
    await createRecord(subEventTable, [tableFields]);
    deleteCache(Cachekeys.SUBEVENTS);
    res.status(201).json({ message: 'Subevent created successfully' });
  } catch (error) {
    console.error('Failed to create new sub event:', error);
    res.status(500).json({ error: 'Failed to create new sub event' });
  }
});

//update a subEvent
router.put('/sub-events/:sub_event_id', async (req, res) => {
  const { sub_event_id } = req.params;
  const updatedSubEvent: SubEvent = req.body;

  const updatedRecord = {
    id: sub_event_id,
    fields: updatedSubEvent,
  };

  try {
    await updateRecord(subEventTable, [updatedRecord]);
    deleteCache(Cachekeys.SUBEVENTS);
    res.status(200).json({ message: 'Subevent updated successfully' });
  } catch (error) {
    console.error('Failed to create new sub event:', error);
    res.status(500).json({ error: 'Sub event could not be updated' });
  }
});

//delete one sub event
router.delete('/sub-events/:sub_event_id', async (req, res) => {
  const { sub_event_id } = req.params;

  try {
    await deleteRecords(subEventTable, [sub_event_id]);
    deleteCache(Cachekeys.SUBEVENTS);
    res.status(200).json({ message: 'Subevent deleted successfully' });
  } catch (err) {
    console.error('Failed to delete main event:', err);
    res.status(500).json({ error: 'Failed to delete sub event' });
  }
});

module.exports = router;
