import express from 'express';

import {
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
} from '../models/airtable';

const router = express.Router();
const SubeventTable = String(process.env.SUBEVENT)

// route to get all subevents
router.get('/subevents', async (req, res) => {
    try {
        // fetch subevents
        const subevents = await getTable(SubeventTable, "");
        // format subevents
        const formattedSubevents: { id: string, fields: any }[] = [];
        subevents.forEach((fields, id) => {
            const plainFields = Object.fromEntries(fields);
            formattedSubevents.push({ id, fields: plainFields });
        });
        res.json(formattedSubevents);
    } catch (error) {
        console.error("Error Fetching Subevents:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// route to get subevents for a specific event
router.get('/subevents/:event_id', async (req, res) => {
    const { event_id } = req.params;
    try {
        const subevents = await getTable(SubeventTable, event_id);

        const formattedSubevents: { id: string, fields: any }[] = [];
        subevents.forEach((fields, id) => {
            const plainFields = Object.fromEntries(fields);
            formattedSubevents.push({ id, fields: plainFields });
        });
        res.json(formattedSubevents);
    } catch (error) {
        console.error("Error Fetching Subevents:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// route to get a subevent
router.get('/subevent/:subevent_id', async (req, res) => {
    const { subevent_id } = req.params;
    try {
        const subevent = await getRecord(SubeventTable, subevent_id);

        if (!subevent) {
            return res.status(404).json({ message: 'Subevent Not Found' });
        }

        let plainFields = Object.fromEntries(subevent.get(subevent_id));
        let formattedSubevents: { id: string, fields: any } = {id: subevent_id, fields: plainFields}
        res.json(formattedSubevents)
    } catch (error) {
        console.error("Error Fetching Subevent:", error);
        res.status(500).json({error: 'Internal Server Error'});
}
});

module.exports = router;