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

router.get('/service', async (req, res) => {
    try {
        const services = await getTable('Service', "");
        const formattedServices: { id: string, fields: any }[] = [];
        services.forEach((fields, id) => {
            const plainFields = Object.fromEntries(fields); 
            formattedServices.push({ id, fields: plainFields });
            console.log(`ID: ${id}, Fields:`, plainFields);
        });
        res.json(formattedServices);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:mainEventID/service', async (req, res) => {
    const { mainEventID } = req.params;

    try {
        const services = await getTable('Service', "");
        const eventServices: { id: string, fields: any }[] = [];

        services.forEach((fields, id) => {
            const plainFields = Object.fromEntries(fields);
            if (plainFields.MainEvent && plainFields.MainEvent.includes(mainEventID)) {
                eventServices.push({ id, fields: plainFields });
            }
        });

        if (eventServices.length === 0) {
            return res.status(404).json({ message: 'No service found for this main event' });
        }

        res.json(eventServices);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:mainEventID/service', async (req, res) => {
    const { mainEventID } = req.params;
    const newService: Service = req.body;
    newService.MainEvent = [mainEventID];
    const serviceRecord = {
        fields: newService 
    };

    try {
        await createRecord('Service', [serviceRecord]);
        res.status(200).json({ message: 'Service created successfully' });
    } catch (error) {
        console.error("Failed to create service:", error);
        res.status(500).json({ error: 'Failed to create service' });
    }
});

router.put('/service/:service_record_id', async (req, res) => {
    const { service_record_id } = req.params;
    const updatedService: Service = req.body;

    const recordToUpdate = [{
        id: service_record_id,
        fields: updatedService
    }];

    try {
        await updateRecord('Service', recordToUpdate);
        res.status(200).json({ message: 'Service updated successfully' });
    } catch (error) {
        console.error("Failed to update service:", error);
        res.status(500).json({ error: 'Failed to update service' });
    }
});

router.delete('/service/:service_record_id', async (req, res) => {
    const { service_record_id } = req.params;

    try {
        await deleteRecords('Service', [service_record_id]);
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error("Failed to delete service:", error);
        res.status(500).json({ error: 'Failed to delete service' });
    }
});
module.exports = router;