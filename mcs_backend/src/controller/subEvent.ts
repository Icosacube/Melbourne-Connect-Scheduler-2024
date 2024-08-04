import express from 'express';

import {
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
} from '../models/airtable';
import { SubEvent } from "../types/types";

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
        res.status(500).json({ error: 'Failed to fetch subevents'});
    }
});

// route to get subevents for a specific event
router.get('/subevents/:event_id', async (req, res) => {
    const { event_id: eventId } = req.params;
    try {
        const subevents = await getTable(subeventTable, "");

        const formattedSubevents: { id: string, fields: any }[] = [];
        subevents.forEach((fields, id) => {
            const plainFields = Object.fromEntries(fields);
            if (plainFields.MainEvent && plainFields.MainEvent.includes(eventId)) {
                formattedSubevents.push({id, fields: plainFields});
            }
        });
        res.json(formattedSubevents);
    } catch (error) {
        console.error("Error fetching subevents:", error);
        res.status(500).json({ error: 'Failed to fetch subevent'});
    }
});

// route to get a subevent
router.get('/subevent/:subevent_id', async (req, res) => {
    const { subevent_id: subeventId } = req.params;
    try {
        const subevent = await getRecord(subeventTable, subeventId);

        if (!subevent) {
            return res.status(404).json({ error: 'Subevent not found' });
        }

        let plainFields = Object.fromEntries(subevent.get(subeventId));
        let formattedSubevents: { id: string, fields: any } = {id: subeventId, fields: plainFields}
        res.json(formattedSubevents)
    } catch (error) {
        console.error("Error fetching subevent:", error);
        res.status(500).json({error: 'Failed to fetch subevent'});
    }
});

// route to create a subevent
router.post('/subevent', async (req, res) => {
    const newSubevent: SubEvent = req.body;

    const tableFields = {
        fields: newSubevent
    };

    try {
        await createRecord(subeventTable, [tableFields]);
        res.status(201).json({ message: 'Subevent created successfully' });
    } catch (error) {
        console.error("Failed to create new subevent:", error);
        res.status(500).json({ error: 'Failed to create new subevent' });
        }
});

// route to update a subevent
router.put('/subevent/:subevent_id', async (req, res) => {
    const { subevent_id: subeventId } = req.params;
    const updatedSubevent: SubEvent = req.body;

    const updatedRecord = {
        id: subeventId,
        fields: updatedSubevent
    };

    try {
        await updateRecord(subeventTable, [updatedRecord]);
        res.status(200).json({ message: "Subevent updated successfully" });
    } catch (error) {
        console.error("Failed to create new subevent:", error);
        res.status(500).json({ error: "Subevent could not be updated" });
    }
});

//delete one main event
router.delete("/subevent/:subevent_id", async (req, res) => {
    const { subevent_id: subeventId } = req.params;

    try {
        await deleteRecords(subeventTable, [subeventId]);
        res.status(200).json({ message: "Subevent deleted successfully" });
    } catch (err) {
        console.error("Failed to delete main event:", err);
        res.status(500).json({ error: "Failed to delete subevent" });
    }
});

module.exports = router;