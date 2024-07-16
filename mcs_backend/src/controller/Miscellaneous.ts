import express from 'express';
import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords
} from '../models/airtable';

const router = express.Router();
import { Miscellaneous } from '../types/types'; 

router.get('/miscellaneous', async (req, res) => {
  try {
    const miscellaneousItems = await getTable('Miscellaneous', "");
    const formattedMiscellaneous: { id: string, fields: any }[] = [];
    miscellaneousItems.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields); 
      formattedMiscellaneous.push({ id, fields: plainFields });
      console.log(`ID: ${id}, Fields:`, plainFields);
    });
    res.json(formattedMiscellaneous);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:tripID/miscellaneous', async (req, res) => {
  const { tripID } = req.params;

  try {
    const miscellaneousItems = await getTable('Miscellaneous', "");
    const tripMiscellaneousItems: { id: string, fields: any }[] = [];

    miscellaneousItems.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.Trip && plainFields.Trip.includes(tripID)) {
        tripMiscellaneousItems.push({ id, fields: plainFields });
      }
    });

    if (tripMiscellaneousItems.length === 0) {
      return res.status(404).json({ message: 'No miscellaneous items found for this trip' });
    }

    res.json(tripMiscellaneousItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:tripID/miscellaneous', async (req, res) => {
  const tripID = req.params.tripID;
  const newMiscellaneousItem: Miscellaneous = req.body;
  newMiscellaneousItem.Trip = [tripID];
  const miscellaneousRecord = {
    fields: newMiscellaneousItem 
  };

  try {
    await createRecord('Miscellaneous', [miscellaneousRecord]);
    res.status(201).json({ message: 'Miscellaneous item created successfully' });
  } catch (error) {
    console.error("Failed to create miscellaneous item:", error);
    res.status(500).json({ error: 'Failed to create miscellaneous item' });
  }
});

router.put('/miscellaneous/:miscellaneous_record_id', async (req, res) => {
  const { miscellaneous_record_id } = req.params;
  const updatedMiscellaneousItem: Miscellaneous = req.body;

  const recordToUpdate = [{
    id: miscellaneous_record_id,
    fields: updatedMiscellaneousItem
  }];

  try {
    await updateRecord('Miscellaneous', recordToUpdate);
    res.status(200).json({ message: 'Miscellaneous item updated successfully' });
  } catch (error) {
    console.error("Failed to update miscellaneous item:", error);
    res.status(500).json({ error: 'Failed to update miscellaneous item' });
  }
});

router.delete('/miscellaneous/:miscellaneous_record_id', async (req, res) => {
  const { miscellaneous_record_id } = req.params;

  try {
    await deleteRecords('Miscellaneous', [miscellaneous_record_id]);
    res.status(200).json({ message: 'Miscellaneous item deleted successfully' });
  } catch (error) {
    console.error("Failed to delete miscellaneous item:", error);
    res.status(500).json({ error: 'Failed to delete miscellaneous item' });
  }
});

module.exports = router;
