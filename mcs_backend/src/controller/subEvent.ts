import express from 'express';

import {
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
} from '../models/airtable';
import {SubEvent} from "../types/types";

const router = express.Router();
const subeventTable = String(process.env.SUBEVENT)

// route to get all subevents
router.get('/subevents', async (req, res) => {
    try {
        // fetch subevents
        const subevents = await getTable(subeventTable, "");
        // format subevents
        const formattedSubevents: { id: string, fields: any }[] = [];
        subevents.forEach((fields, id) => {
            const plainFields = Object.fromEntries(fields);
            formattedSubevents.push({ id, fields: plainFields });
        });
        res.json(formattedSubevents);
    } catch (error) {
        console.error("Error fetching subevents:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// route to get subevents for a specific event
router.get('/subevents/:event_id', async (req, res) => {
    const { event_id } = req.params;
    try {
        const subevents = await getTable(subeventTable, event_id);

        const formattedSubevents: { id: string, fields: any }[] = [];
        subevents.forEach((fields, id) => {
            const plainFields = Object.fromEntries(fields);
            formattedSubevents.push({ id, fields: plainFields });
        });
        res.json(formattedSubevents);
    } catch (error) {
        console.error("Error fetching subevents:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// route to get a subevent
router.get('/subevent/:subevent_id', async (req, res) => {
    const { subevent_id } = req.params;
    try {
        const subevent = await getRecord(subeventTable, subevent_id);

        if (!subevent) {
            return res.status(404).json({ message: 'Subevent Not Found' });
        }

        let plainFields = Object.fromEntries(subevent.get(subevent_id));
        let formattedSubevents: { id: string, fields: any } = {id: subevent_id, fields: plainFields}
        res.json(formattedSubevents)
    } catch (error) {
        console.error("Error fetching subevent:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// route to create a subevent
router.post('/subevent', async (req, res) => {
    const newSubevent: SubEvent = req.body as SubEvent;

    const tableFields = {
        fields: newSubevent
    };

    try {
        await createRecord(subeventTable, [tableFields]);
        res.status(201).json({ message: 'New subevent created successfully' });
    } catch (error) {
        console.error("Failed to create new subevent:", error);
        res.status(500).json({ error: 'Failed to create new subevent' });
        }
});

module.exports = router;