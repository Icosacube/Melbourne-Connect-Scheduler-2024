import express from 'express';
import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords
} from '../models/airtable';

import { Accommodation, Creation } from '../types/types';

const router = express.Router();
const accommodationTable = String(process.env.ACCOMMODATION)
//get all accommodations
router.get('/accommodations', async (req, res) => {
  try {
    const accommodations = await getTable(accommodationTable, "");
    const formattedAccommodations: { [k: string]: any; }[] = [];
    accommodations.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      formattedAccommodations.push(plainFields);
      console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
    });
    res.json(formattedAccommodations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Get a specific Accomodation by ID
router.get('/accommodations/:accommodation_record_id', async (req, res) => {
  const { accommodation_record_id } = req.params;
  
  try {
    const accommodationRecord = await getRecord(accommodationTable, accommodation_record_id);
    
    if (!accommodationRecord) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    let plainFields = Object.fromEntries(accommodationRecord);
    let formattedAccommodations: { [k: string]: any; } = plainFields
    res.json(formattedAccommodations)

  } catch (error) {
    console.error("Error fetching Accommodation:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//get all accommodations for one trip
//TODO
//put this filter function in the GET /accommodations

// router.get('/accommodation/:tripID', async (req, res) => {
//   const { tripID } = req.params;

//   try {
//     const accommodations = await getTable(accommodationTable, "");
//     const tripAccommodations: { [k: string]: any; }[] = [];

//     accommodations.forEach((fields) => {
//       const plainFields = Object.fromEntries(fields);
//       if (plainFields.Trip && plainFields.Trip.includes(tripID)) {
//         tripAccommodations.push(plainFields);
//       }
//     });

//     res.json(tripAccommodations);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

//TODO
//create one accommodation for a trip should accommodation have multiple trips?
//wait for airtable to change the schema

router.post('/accommodation', async (req, res) => {
  const newAccommodation: Accommodation = req.body;
  const { tripID } = req.body;
  newAccommodation.Trip = [tripID];

  const creation: Creation = {
    fields: newAccommodation
  };

  try {
    await createRecord(accommodationTable, [creation]);
    res.status(201).json({ message: 'Accommodation created successfully' });
  } catch (error) {
    console.error("Failed to create accommodation:", error);
    res.status(500).json({ error: 'Failed to create accommodation' });
  }
});

//modify one accommodation 
router.put('/accommodation/:accommodation_record_id', async (req, res) => {
    const {  accommodation_record_id } = req.params;
    const updatedAccommodation: Accommodation = req.body;
  
    const recordToUpdate = [{
      id: accommodation_record_id,
      fields: updatedAccommodation
    }];
  
    try {
      await updateRecord(accommodationTable, recordToUpdate);
      res.status(200).json({ message: 'Accommodation updated successfully' });
    } catch (error) {
      console.error("Failed to update accommodation:", error);
      res.status(500).json({ error: 'Failed to update accommodation' });
    }
  });
  //delete one accommodation 
  router.delete('/accommodation/:accommodation_record_id', async (req, res) => {
    const { accommodation_record_id } = req.params;
  
    try {
      await deleteRecords('Accommodation', [accommodation_record_id]);
      res.status(200).json({ message: 'Accommodation deleted successfully' });
    } catch (error) {
      console.error("Failed to delete accommodation:", error);
      res.status(500).json({ error: 'Failed to delete accommodation' });
    }
  });
  

module.exports = router;
