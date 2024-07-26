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

//get all accomodations
router.get('/accommodation', async (req, res) => {
  try {
    const accommodations = await getTable('Accommodation', "");
    const formattedAccommodations: { id: string, fields: any }[] = [];
    accommodations.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields);
      formattedAccommodations.push({ id, fields: plainFields });
      console.log(`ID: ${id}, Fields:`, plainFields);
    });
    res.json(formattedAccommodations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get all accomodations for one trip
router.get('/:tripID/accommodation', async (req, res) => {
  const { tripID } = req.params;

  try {
    const accommodations = await getTable('Accommodation', "");
    const tripAccommodations: { id: string, fields: any }[] = [];

    accommodations.forEach((fields, id) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.Trip && plainFields.Trip.includes(tripID)) {
        tripAccommodations.push({ id, fields: plainFields });
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
router.post('/:tripID/accommodation', async (req, res) => {
  const newAccommodation: Accommodation = req.body;
  const { tripID } = req.params;
  newAccommodation.Trip = [tripID];

  const tableFields: TableFields = {
    id: '',
    fields: newAccommodation
  };

  try {
    await createRecord('Accommodation', [tableFields]);
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
      await updateRecord('Accommodation', recordToUpdate);
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
