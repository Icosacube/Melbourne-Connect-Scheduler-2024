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
import {getCache,setCache,deleteCache } from '../utils/caching';
import {Cachekeys} from '../Enum/Cachekeys';
const miscellaneousTable = String(process.env.MISCELLANEOUS)
const financeTable = String(process.env.FINANCE);

//get all miscellaneous
router.get('/miscellaneous', async (req, res) => {
  try {
    const cachedmiscellaneous = getCache(Cachekeys.MISCELLANEOUS);
    if (cachedmiscellaneous) {
        return res.json(cachedmiscellaneous).status(200);
    }
    const miscellaneousItems = await getTable(miscellaneousTable, "");
    const formattedMiscellaneous: { [k: string]: any; }[] = [];
    miscellaneousItems.forEach((fields) => {
      const plainFields = Object.fromEntries(fields); 
      formattedMiscellaneous.push(plainFields);
      console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
    });
    setCache(Cachekeys.MISCELLANEOUS, formattedMiscellaneous);
    res.json(formattedMiscellaneous);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get a specific Miscellaneous by ID
router.get('/miscellaneous/:miscellaneous_record_id', async (req, res) => {
  const { miscellaneous_record_id } = req.params;
  
  try {
    const miscellaneousRecord = await getRecord(miscellaneousTable, miscellaneous_record_id);
    
    if (!miscellaneousRecord) {
      return res.status(404).json({ message: 'Miscellaneous not found' });
    }
    let plainFields = Object.fromEntries(miscellaneousRecord);
    let formattedMiscellaneous: { [k: string]: any; } = plainFields
    res.json(formattedMiscellaneous)

  } catch (error) {
    console.error("Error fetching Miscellaneous:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get all miscellaneous for one trip; merge this filter function to  GET /miscellaneous
router.get('/miscellaneous/:tripID', async (req, res) => {
  const { tripID } = req.params;

  try {
    const miscellaneousItems = await getTable(miscellaneousTable, "");
    const tripMiscellaneousItems: { [k: string]: any; }[] = [];

    miscellaneousItems.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.Trip && plainFields.Trip.includes(tripID)) {
        tripMiscellaneousItems.push(plainFields);
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

//create one miscellaneous for one trip, 
//TODO but now linked to event, will have to modify
router.post('/miscellaneous/:tripID', async (req, res) => {
  const tripID = req.params.tripID;
  const newMiscellaneousItem: Miscellaneous = req.body;
  newMiscellaneousItem.Trip = [tripID];
  const miscellaneousRecord = {
    fields: newMiscellaneousItem 
  };

  try {
    let recordId = await createRecord(miscellaneousTable, [miscellaneousRecord]);
    await createRecord(financeTable,[{fields: {"Accommodation": recordId}}])
    deleteCache(Cachekeys.MISCELLANEOUS);
    res.status(201).json({ message: 'Miscellaneous item created successfully' });
  } catch (error) {
    console.error("Failed to create miscellaneous item:", error);
    res.status(500).json({ error: 'Failed to create miscellaneous item' });
  }
});

//modify one miscellaneous 
router.put('/miscellaneous/:miscellaneous_record_id', async (req, res) => {
  const { miscellaneous_record_id } = req.params;
  const updatedMiscellaneousItem: Miscellaneous = req.body;

  const recordToUpdate = [{
    id: miscellaneous_record_id,
    fields: updatedMiscellaneousItem
  }];

  try {
    await updateRecord(miscellaneousTable, recordToUpdate);
    deleteCache(Cachekeys.MISCELLANEOUS);
    res.status(200).json({ message: 'Miscellaneous item updated successfully' });
  } catch (error) {
    console.error("Failed to update miscellaneous item:", error);
    res.status(500).json({ error: 'Failed to update miscellaneous item' });
  }
});

//delete one miscellaneous 
router.delete('/miscellaneous/:miscellaneous_record_id', async (req, res) => {
  const { miscellaneous_record_id } = req.params;
  const record = await getRecord(miscellaneousTable, miscellaneous_record_id);
  const financeId = record.get('Finance')[0];

  try {
    await deleteRecords(miscellaneousTable, [miscellaneous_record_id]);
    await deleteRecords('Finance', [financeId]);
    deleteCache(Cachekeys.MISCELLANEOUS);
    res.status(200).json({ message: 'Miscellaneous item deleted successfully' });
  } catch (error) {
    console.error("Failed to delete miscellaneous item:", error);
    res.status(500).json({ error: 'Failed to delete miscellaneous item' });
  }
});

module.exports = router;
