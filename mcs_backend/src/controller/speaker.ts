import express from 'express';
import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords
} from '../models/airtable';
import { Speaker } from '../types/types';

const router = express.Router();
//get all speakers
router.get('/speakers', async (req, res) => {
  try {
    const speakerItems = await getTable('Speakers', "");
    const formattedSpeakers: { id: string, fields: any }[] = [];
    speakerItems.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields);
      formattedSpeakers.push({ id, fields: plainFields });
      console.log(`ID: ${id}, Fields:`, plainFields);
    });
    res.json(formattedSpeakers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//get one speaker
router.get('/speakers/:speaker_record_id', async (req, res) => {
    const { speaker_record_id } = req.params;
    
    try {
      const speakers = await getTable('Speakers', `RECORD_ID() = '${speaker_record_id}'`);
      const speakerRecord = speakers.get(speaker_record_id);
  
      if (!speakerRecord) {
        return res.status(404).json({ message: 'Speaker not found' });
      }
      
      res.json(Object.fromEntries(speakerRecord));
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
      await createRecord('Speakers', [speakerRecord]);
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
    await updateRecord('Speakers', recordToUpdate);
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
    await deleteRecords('Speakers', [speaker_record_id]);
    res.status(200).json({ message: 'Speaker deleted successfully' });
  } catch (error) {
    console.error("Failed to delete speaker:", error);
    res.status(500).json({ error: 'Failed to delete speaker' });
  }
});

module.exports = router;
