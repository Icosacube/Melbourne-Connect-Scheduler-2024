import express from 'express';
import { 
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
} from '../models/airtable';

const router = express.Router();
import { Catering, Service, Venue } from '../types/types';
const VenueTable = String(process.env.VENUE)
import {Cachekeys} from '../Enum/Cachekeys';
import {getCache,setCache,deleteCache} from '../utils/caching';
//get all venues
router.get('/venues', async (req, res) => {
    try {
        const cachedVenues= getCache(Cachekeys.VENUES);
        if (cachedVenues) {
            return res.json(cachedVenues).status(200);
        }
        const venues = await getTable(VenueTable, "");
        const formattedVenues: { [k: string]: any; }[] = [];
        venues.forEach((fields) => {
            const plainFields = Object.fromEntries(fields); 
            formattedVenues.push(plainFields);
            console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
        });
        setCache(Cachekeys.VENUES, formattedVenues);
        res.json(formattedVenues);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Get a specific venue by ID
router.get('/venues/venue/:venue_record_id', async (req, res) => {
    const { venue_record_id } = req.params;
    
    try {
      const venueRecord = await getRecord(VenueTable, venue_record_id);
      
      if (!venueRecord) {
        return res.status(404).json({ message: 'venue not found' });
      }
      let plainFields = Object.fromEntries(venueRecord);
      let formattedVenues: { [k: string]: any; } = plainFields
      res.json(formattedVenues)

    } catch (error) {
      console.error("Error fetching venue:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//get all venues for a main event
router.get('/venue/:mainEventID', async (req, res) => {
    const { mainEventID } = req.params;

    try {
        const venues = await getTable(VenueTable, "");
        const eventVenues: { [k: string]: any; }[] = [];

        venues.forEach((fields) => {
            const plainFields = Object.fromEntries(fields);
            if (plainFields.MainEvent && plainFields.MainEvent.includes(mainEventID)) {
                eventVenues.push(plainFields);
            }
        });

        if (eventVenues.length === 0) {
            return res.status(404).json({ message: 'No venue found for this main event' });
        }

        res.json(eventVenues);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//create one venue for a main event
router.post('/venue/:mainEventID', async (req, res) => {
    const { mainEventID } = req.params;
    const newVenue: Venue = req.body;
    newVenue.MainEvent = [mainEventID];
    const venueRecord = {
        fields: newVenue 
    };

    try {
        await createRecord(VenueTable, [venueRecord]);
        deleteCache(Cachekeys.VENUES);
        res.status(200).json({ message: 'Venue created successfully' });
    } catch (error) {
        console.error("Failed to create venue:", error);
        res.status(500).json({ error: 'Failed to create venue' });
    }
});
//modify one venue 
router.put('/venue/:venue_record_id', async (req, res) => {
    const { venue_record_id } = req.params;
    const updatedVenue: Venue = req.body;

    const recordToUpdate = [{
        id: venue_record_id,
        fields: updatedVenue
    }];

    try {
        await updateRecord(VenueTable, recordToUpdate);
        deleteCache(Cachekeys.VENUES);
        res.status(200).json({ message: 'Venue updated successfully' });
    } catch (error) {
        console.error("Failed to update venue:", error);
        res.status(500).json({ error: 'Failed to update venue' });
    }
});
//delete one venue 
router.delete('/venue/:venue_record_id', async (req, res) => {
    const { venue_record_id } = req.params;

    try {
        await deleteRecords(VenueTable, [venue_record_id]);
        deleteCache(Cachekeys.VENUES);
        res.status(200).json({ message: 'Venue deleted successfully' });
    } catch (error) {
        console.error("Failed to delete venue:", error);
        res.status(500).json({ error: 'Failed to delete venue' });
    }
});
module.exports = router;
