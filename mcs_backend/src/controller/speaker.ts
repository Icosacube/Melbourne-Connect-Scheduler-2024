import express from 'express';
import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords
} from '../models/airtable';
import { TableFields, Speaker, PresetFilter} from '../types/types';
import {getCache,setCache,deleteCache } from '../utils/caching';
import {Cachekeys} from '../Enum/Cachekeys';
const router = express.Router();
const speakerTable = String(process.env.SPEAKERS);

//get all speakers
router.get('/speakers', async (req, res) => {
  try {
    const cachedSpeakers = getCache(Cachekeys.SPEAKERS);
    if (cachedSpeakers) {
      return res.json(cachedSpeakers).status(200);
    }
    const speakerItems = await getTable(speakerTable, PresetFilter.confirmed);
    const formattedSpeakers: { [k: string]: any; }[] = [];
    speakerItems.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      formattedSpeakers.push(plainFields);
      console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
    });
    setCache(Cachekeys.SPEAKERS, formattedSpeakers);
    res.json(formattedSpeakers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get one speaker
router.get('/speakers/:speaker_record_id', async (req, res) => {
    const { speaker_record_id } = req.params;
    console.log(speaker_record_id);
    
    try {
      const speakerRecord = await getRecord(speakerTable, speaker_record_id);
      console.log('Speaker Record:', speakerRecord);
      if (!speakerRecord) {
        return res.status(404).json({ message: 'Speaker not found' });
      }
      let plainFields = Object.fromEntries(speakerRecord);
      let formattedSpeakers: { [k: string]: any; } = plainFields
      res.json(formattedSpeakers)

    } catch (error) {
      console.error("Error fetching speaker:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//create one speaker
router.post('/speakers', async (req, res) => {
  const newSpeakerItem: Speaker = req.body;
  const speakerRecord = {
    fields: newSpeakerItem 
  };

  try {
    await createRecord(speakerTable, [speakerRecord]);
    deleteCache(Cachekeys.SPEAKERS);
    res.status(200).json({ message: 'Speaker created successfully' });
  } catch (error) {
    console.error("Failed to create speaker:", error);
    res.status(500).json({ error: 'Failed to create speaker' });
  }
});

//modify one speaker
router.put('/speakers/:speaker_record_id', async (req, res) => {
  const { speaker_record_id } = req.params;
  const updatedSpeakerItem: Speaker = req.body;

  const recordToUpdate = [{
    id: speaker_record_id,
    fields: updatedSpeakerItem
  }];

  try {
    await updateRecord(speakerTable, recordToUpdate);
    deleteCache(Cachekeys.SPEAKERS);
    res.status(200).json({ message: 'Speaker updated successfully' });
  } catch (error) {
    console.error("Failed to update speaker:", error);
    res.status(500).json({ error: 'Failed to update speaker' });
  }
});

//delete one speaker
router.delete('/speakers/:speaker_record_id', async (req, res) => {
  const { speaker_record_id } = req.params;

  try {
    await deleteRecords(speakerTable, [speaker_record_id]);
    deleteCache(Cachekeys.SPEAKERS);
    res.status(200).json({ message: 'Speaker deleted successfully' });
  } catch (error) {
    console.error("Failed to delete speaker:", error);
    res.status(500).json({ error: 'Failed to delete speaker' });
  }
});

module.exports = router;
