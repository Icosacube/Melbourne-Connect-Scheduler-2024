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

router.get('/venue', async (req, res) => {
    try {
        const venues = await getTable('Venue', "");
        const formattedVenues: { id: string, fields: any }[] = [];
        venues.forEach((fields, id) => {
            const plainFields = Object.fromEntries(fields); 
            formattedVenues.push({ id, fields: plainFields });
            console.log(`ID: ${id}, Fields:`, plainFields);
        });
        res.json(formattedVenues);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:mainEventID/venue', async (req, res) => {
    const { mainEventID } = req.params;

    try {
        const venues = await getTable('Venue', "");
        const eventVenues: { id: string, fields: any }[] = [];

        venues.forEach((fields, id) => {
            const plainFields = Object.fromEntries(fields);
            if (plainFields.MainEvent && plainFields.MainEvent.includes(mainEventID)) {
                eventVenues.push({ id, fields: plainFields });
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

router.post('/:mainEventID/venue', async (req, res) => {
    const { mainEventID } = req.params;
    const newVenue: Venue = req.body;
    newVenue.MainEvent = [mainEventID];
    const venueRecord = {
        fields: newVenue 
    };

    try {
        await createRecord('Venue', [venueRecord]);
        res.status(200).json({ message: 'Venue created successfully' });
    } catch (error) {
        console.error("Failed to create venue:", error);
        res.status(500).json({ error: 'Failed to create venue' });
    }
});

router.put('/venue/:venue_record_id', async (req, res) => {
    const { venue_record_id } = req.params;
    const updatedVenue: Venue = req.body;

    const recordToUpdate = [{
        id: venue_record_id,
        fields: updatedVenue
    }];

    try {
        await updateRecord('Venue', recordToUpdate);
        res.status(200).json({ message: 'Venue updated successfully' });
    } catch (error) {
        console.error("Failed to update venue:", error);
        res.status(500).json({ error: 'Failed to update venue' });
    }
});

router.delete('/venue/:venue_record_id', async (req, res) => {
    const { venue_record_id } = req.params;

    try {
        await deleteRecords('Venue', [venue_record_id]);
        res.status(200).json({ message: 'Venue deleted successfully' });
    } catch (error) {
        console.error("Failed to delete venue:", error);
        res.status(500).json({ error: 'Failed to delete venue' });
    }
});
module.exports = router;
