import express from 'express';
import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords
} from '../models/airtable';

import { Accommodation, TableFields } from '../types/types';

const router = express.Router();
const AccommodationTable = String(process.env.ACCOMMODATION)
//get all accomodations
router.get('/accommodations', async (req, res) => {
  try {
    const accommodations = await getTable(AccommodationTable, "");
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
router.get('/accomodation/:Accomodation_record_id', async (req, res) => {
  const { Accomodation_record_id } = req.params;
  
  try {
    const AccomodationRecord = await getRecord(AccommodationTable, Accomodation_record_id);
    
    if (!AccomodationRecord) {
      return res.status(404).json({ message: 'Accomodation not found' });
    }
    let plainFields = Object.fromEntries(AccomodationRecord);
    let formattedAccomodations: { [k: string]: any; } = plainFields
    res.json(formattedAccomodations)

  } catch (error) {
    console.error("Error fetching Accomodation:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//get all accommodations for one trip
router.get('/accommodation/:tripID', async (req, res) => {
  const { tripID } = req.params;

  try {
    const accommodations = await getTable(AccommodationTable, "");
    const tripAccommodations: { [k: string]: any; }[] = [];

    accommodations.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.Trip && plainFields.Trip.includes(tripID)) {
        tripAccommodations.push(plainFields);
      }
    });

    if (tripAccommodations.length === 0) {
      return res.status(404).json({ message: 'No accommodations found for this trip' });
    }

    res.json(tripAccommodations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//create one accomodation for a trip
router.post('/accommodation/:tripID', async (req, res) => {
  const newAccommodation: Accommodation = req.body;
  const { tripID } = req.params;
  newAccommodation.Trip = [tripID];

  const tableFields: TableFields = {
    id: '',
    fields: newAccommodation
  };

  try {
    await createRecord(AccommodationTable, [tableFields]);
    res.status(201).json({ message: 'Accommodation created successfully' });
  } catch (error) {
    console.error("Failed to create accommodation:", error);
    res.status(500).json({ error: 'Failed to create accommodation' });
  }
});

//modify one accomodation 
router.put('/accommodation/:accommodation_record_id', async (req, res) => {
    const {  accommodation_record_id } = req.params;
    const updatedAccommodation: Accommodation = req.body;
  
    const recordToUpdate = [{
      id: accommodation_record_id,
      fields: updatedAccommodation
    }];
  
    try {
      await updateRecord(AccommodationTable, recordToUpdate);
      res.status(200).json({ message: 'Accommodation updated successfully' });
    } catch (error) {
      console.error("Failed to update accommodation:", error);
      res.status(500).json({ error: 'Failed to update accommodation' });
    }
  });
  //delete one accomodation 
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
