import express from 'express';
import { 
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
} from '../models/airtable';

const router = express.Router();
import {  Service } from '../types/types';
//get all services
const ServiceTable = String(process.env.SERVICE)
router.get('/services', async (req, res) => {
    try {
        const services = await getTable(ServiceTable, "");
        const formattedServices: { [k: string]: any; }[] = [];
        services.forEach((fields) => {
            const plainFields = Object.fromEntries(fields); 
            formattedServices.push(plainFields);
            console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
        });
        res.json(formattedServices);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Get a specific Service by ID
router.get('/service/:Service_record_id', async (req, res) => {
    const { Service_record_id } = req.params;
    
    try {
      const ServiceRecord = await getRecord(ServiceTable, Service_record_id);
      
      if (!ServiceRecord) {
        return res.status(404).json({ message: 'Service not found' });
      }
      let plainFields = Object.fromEntries(ServiceRecord.get(Service_record_id));
      let formattedServices: {id: string, fields: any} = {id: Service_record_id, fields: plainFields}
      res.json(formattedServices)

    } catch (error) {
      console.error("Error fetching Service:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//get all services for a main event
router.get('/service/:mainEventID', async (req, res) => {
    const { mainEventID } = req.params;

    try {
        const services = await getTable(ServiceTable, "");
        const eventServices: { [k: string]: any; }[] = [];

        services.forEach((fields) => {
            const plainFields = Object.fromEntries(fields);
            if (plainFields.MainEvent && plainFields.MainEvent.includes(mainEventID)) {
                eventServices.push(plainFields);
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
//create one service for a main event
router.post('/service/:mainEventID', async (req, res) => {
    const { mainEventID } = req.params;
    const newService: Service = req.body;
    newService.MainEvent = [mainEventID];
    const serviceRecord = {
        fields: newService 
    };

    try {
        await createRecord(ServiceTable, [serviceRecord]);
        res.status(200).json({ message: 'Service created successfully' });
    } catch (error) {
        console.error("Failed to create service:", error);
        res.status(500).json({ error: 'Failed to create service' });
    }
});
//modify one service 
router.put('/service/:service_record_id', async (req, res) => {
    const { service_record_id } = req.params;
    const updatedService: Service = req.body;

    const recordToUpdate = [{
        id: service_record_id,
        fields: updatedService
    }];

    try {
        await updateRecord(ServiceTable, recordToUpdate);
        res.status(200).json({ message: 'Service updated successfully' });
    } catch (error) {
        console.error("Failed to update service:", error);
        res.status(500).json({ error: 'Failed to update service' });
    }
});
//delete one service 
router.delete('/service/:service_record_id', async (req, res) => {
    const { service_record_id } = req.params;

    try {
        await deleteRecords(ServiceTable, [service_record_id]);
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error("Failed to delete service:", error);
        res.status(500).json({ error: 'Failed to delete service' });
    }
});
module.exports = router;