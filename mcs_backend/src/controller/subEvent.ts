import express from 'express';

import {
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
} from '../models/airtable';

const router = express.Router();
const SubEventTable = String(process.env.SUBEVENT)

// route to get all subevents
router.get('/sub_events', async (req, res) => {
    try {
        // fetch subevents
        const subEvents = await getTable(SubEventTable, "");
        // format subevents
        const formattedSubEvents: { id: string, fields: any }[] = [];
        subEvents.forEach((fields, id) => {
            const plainFields = Object.fromEntries(fields);
            formattedSubEvents.push({ id, fields: plainFields });
        });
        res.json(formattedSubEvents);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// route to get subevents for a specific event
router.get('/sub_events/:event_id', async (req, res) => {
    const { event_id } = req.params;
    try {
        const subEvents = await getTable(SubEventTable, event_id);

        const formattedSubEvents: { id: string, fields: any }[] = [];
        subEvents.forEach((fields, id) => {
            const plainFields = Object.fromEntries(fields);
            formattedSubEvents.push({ id, fields: plainFields });
        });
        res.json(formattedSubEvents);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;