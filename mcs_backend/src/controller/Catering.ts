import express from 'express';
import { 
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
} from '../models/airtable';
const CateringTable = String(process.env.CATERING)
const router = express.Router();
import { Catering} from '../types/types';
//get all caterings
router.get('/catering', async (req, res) => {
    try {
        const caterings = await getTable(CateringTable, "");
        const formattedCaterings: { [k: string]: any; }[] = [];
        caterings.forEach((fields) => {
            const plainFields = Object.fromEntries(fields); 
            formattedCaterings.push(plainFields);
            console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
        });
        res.json(formattedCaterings);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Get a specific Catering by ID
router.get('/catering/catering/:Catering_record_id', async (req, res) => {
    const { Catering_record_id } = req.params;
    
    try {
      const CateringRecord = await getRecord(CateringTable, Catering_record_id);
      
      if (!CateringRecord) {
        return res.status(404).json({ message: 'Catering not found' });
      }
      let plainFields = Object.fromEntries(CateringRecord);
      let formattedCaterings: { [k: string]: any; } = plainFields
      res.json(formattedCaterings)

    } catch (error) {
      console.error("Error fetching Catering:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//get all caterings for one main event
router.get('/catering/:mainEventID', async (req, res) => {
    const { mainEventID } = req.params;

    try {
        const caterings = await getTable(CateringTable, "");
        const eventCaterings: { [k: string]: any; }[] = [];

        caterings.forEach((fields) => {
            const plainFields = Object.fromEntries(fields);
            if (plainFields.MainEvent && plainFields.MainEvent.includes(mainEventID)) {
                eventCaterings.push(plainFields);
            }
        });

        if (eventCaterings.length === 0) {
            return res.status(404).json({ message: 'No catering found for this main event' });
        }

        res.json(eventCaterings);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//create one catering for one main event
router.post('/catering/:mainEventID', async (req, res) => {
    const { mainEventID } = req.params;
    const newCatering: Catering = req.body;
    newCatering.MainEvent = [mainEventID];
    const cateringRecord = {
        fields: newCatering 
    };

    try {
        await createRecord(CateringTable, [cateringRecord]);
        res.status(200).json({ message: 'Catering created successfully' });
    } catch (error) {
        console.error("Failed to create catering:", error);
        res.status(500).json({ error: 'Failed to create catering' });
    }
});
//modify one catering for one main event
router.put('/catering/:catering_record_id', async (req, res) => {
    const { catering_record_id } = req.params;
    const updatedCatering: Catering = req.body;

    const recordToUpdate = [{
        id: catering_record_id,
        fields: updatedCatering
    }];

    try {
        await updateRecord(CateringTable, recordToUpdate);
        res.status(200).json({ message: 'Catering updated successfully' });
    } catch (error) {
        console.error("Failed to update catering:", error);
        res.status(500).json({ error: 'Failed to update catering' });
    }
});

//delete one catering for one main event
router.delete('/catering/:catering_record_id', async (req, res) => {
    const { catering_record_id } = req.params;

    try {
        await deleteRecords(CateringTable, [catering_record_id]);
        res.status(200).json({ message: 'Catering deleted successfully' });
    } catch (error) {
        console.error("Failed to delete catering:", error);
        res.status(500).json({ error: 'Failed to delete catering' });
    }
});
module.exports = router;