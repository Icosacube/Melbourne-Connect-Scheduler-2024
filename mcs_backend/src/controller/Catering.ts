import express from 'express';
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from '../models/airtable';
const cateringTable = String(process.env.CATERING);
const financeTable = String(process.env.FINANCE);
const router = express.Router();
import { Catering } from '../types/types';
import { Cachekeys } from '../Enum/Cachekeys';
import { getCache, setCache, deleteCache } from '../utils/caching';

//get all caterings
router.get('/catering', async (req, res) => {
  try {
    const cachedCaterings = getCache(Cachekeys.CATERINGS);
    if (cachedCaterings) {
      return res.json(cachedCaterings).status(200);
    }
    const caterings = await getTable(cateringTable, '');
    const formattedCaterings: { [k: string]: any }[] = [];
    caterings.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      formattedCaterings.push(plainFields);
      console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
    });
    setCache(Cachekeys.CATERINGS, formattedCaterings);
    res.json(formattedCaterings);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get a specific Catering by ID
router.get('/catering/:catering_record_id', async (req, res) => {
  const { catering_record_id } = req.params;

  try {
    const cateringRecord = await getRecord(cateringTable, catering_record_id);

    if (!cateringRecord) {
      return res.status(404).json({ message: 'Catering not found' });
    }
    let plainFields = Object.fromEntries(cateringRecord);
    let formattedCaterings: { [k: string]: any } = plainFields;
    res.json(formattedCaterings);
  } catch (error) {
    console.error('Error fetching Catering:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get all caterings for one main event; merge this filter function to  GET /catering
router.get('/catering/:mainEventID', async (req, res) => {
  const { mainEventID } = req.params;

  try {
    const caterings = await getTable(cateringTable, '');
    const eventCaterings: { [k: string]: any }[] = [];

    caterings.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      if (
        plainFields.MainEvent &&
        plainFields.MainEvent.includes(mainEventID)
      ) {
        eventCaterings.push(plainFields);
      }
    });

    if (eventCaterings.length === 0) {
      return res
        .status(404)
        .json({ message: 'No catering found for this main event' });
    }

    res.json(eventCaterings);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//create one catering for one main event
router.post('/catering', async (req, res) => {
  const { MainEvent: mainEventID } = req.body;
  const newCatering: Catering = req.body;
  newCatering.MainEvent = mainEventID;
  const cateringRecord = {
    fields: newCatering,
  };

  try {
    let recordId = await createRecord(cateringTable, [cateringRecord]);
    await createRecord(financeTable,[{fields: {"Accommodation": recordId}}])
    deleteCache(Cachekeys.CATERINGS);
    res.status(200).json({ message: 'Catering created successfully' });
  } catch (error) {
    console.error('Failed to create catering:', error);
    res.status(500).json({ error: 'Failed to create catering' });
  }
});

//modify one catering for one main event
router.put('/catering/:catering_record_id', async (req, res) => {
  const { catering_record_id } = req.params;
  const updatedCatering: Catering = req.body;

  const recordToUpdate = [
    {
      id: catering_record_id,
      fields: updatedCatering,
    },
  ];

  try {
    await updateRecord(cateringTable, recordToUpdate);
    deleteCache(Cachekeys.CATERINGS);
    res.status(200).json({ message: 'Catering updated successfully' });
  } catch (error) {
    console.error('Failed to update catering:', error);
    res.status(500).json({ error: 'Failed to update catering' });
  }
});

//delete one catering for one main event
router.delete('/catering/:catering_record_id', async (req, res) => {
  const { catering_record_id } = req.params;
  const record = await getRecord(cateringTable, catering_record_id);
  const financeId = record.get('Finance')[0];


  try {
    await deleteRecords(cateringTable, [catering_record_id]);
    await deleteRecords('Finance', [financeId]);
    deleteCache(Cachekeys.CATERINGS);
    res.status(200).json({ message: 'Catering deleted successfully' });
  } catch (error) {
    console.error('Failed to delete catering:', error);
    res.status(500).json({ error: 'Failed to delete catering' });
  }
});
module.exports = router;
