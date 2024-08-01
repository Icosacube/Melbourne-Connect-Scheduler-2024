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

router.get('/sub_events', async (req, res) => {
    try {
        const subEvents = await getTable(SubEventTable, "");
        const formattedSubEvents: { id: string, fields: any }[] = [];
        subEvents.forEach((fields, id) => {
            const plainFields = Object.fromEntries(fields);
            formattedSubEvents.push({ id, fields: plainFields });
            console.log(`ID: ${id}, Fields:`, plainFields);
        });
        res.json(formattedSubEvents);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;