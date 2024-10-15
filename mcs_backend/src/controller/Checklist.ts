import express from 'express';
import { 
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
  
  } from '../models/airtable';

const router = express.Router();
import { Checklist,EventTask } from '../types/types';
const ChecklistTable = String(process.env.CHECKLIST)
const EventTaskTable = String(process.env.EVENTTASK)
import {Cachekeys} from '../Enum/Cachekeys';
import {getCache,setCache,deleteCache} from '../utils/caching';

//get all Checklists
router.get('/checklists', async (req, res) => {
    const {mainEvent} = req.query;

    try {
        // Cache
        const cacheKey = `${Cachekeys.CHECKLIST}_${JSON.stringify(req.query)}`;
        const cachedChecklist = getCache(cacheKey);
        if (cachedChecklist) {
        return res.json(cachedChecklist).status(200);
        }

        const allChecklist = await getTable(ChecklistTable, "");
        const filteredChecklist: { [k: string]: any; }[] = [];

        allChecklist.forEach((fields) => {
            const plainFields = Object.fromEntries(fields);

            const matchMainEvent = mainEvent ? plainFields.MainEvent && plainFields.MainEvent.includes(mainEvent) : true;

            if (matchMainEvent) {
                filteredChecklist.push(plainFields);
            }
        });

        if (filteredChecklist.length === 0) {
        return res.status(404).json({ message: 'No matching checklist found' });
        }
        
        // Cache
        setCache(cacheKey, filteredChecklist);
        res.json(filteredChecklist).status(200);
    } catch (error) {
        console.error("Error fetching Checklists:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
router.post('/checklists/:maineventID', async (req, res) => {
    const { maineventID} = req.params;
    const newChecklist: Checklist = req.body;
    newChecklist.MainEvent = [maineventID];

    
    try {
        const allEventtasks = await getTable(EventTaskTable, "");
        const eventTaskCount = allEventtasks.length;
        const zeroString = '0'.repeat(eventTaskCount);
        newChecklist.Completed = zeroString;
        const ChecklistRecord = {
            fields: newChecklist
        };
        
        let createdChecklistRecords = await createRecord(ChecklistTable, [ChecklistRecord]);
        const createdChecklistID = createdChecklistRecords[0]; 
            
        const eventTaskRecordsToUpdate = allEventtasks.map((fields) => {
            const plainFields = Object.fromEntries(fields);
            return {
                id: plainFields.id, 
                fields: {
                    Checklist: [...(plainFields.Checklist || []), createdChecklistID]  
                }
            };
        });

        if (eventTaskRecordsToUpdate.length > 0) {
            await updateRecord(EventTaskTable, eventTaskRecordsToUpdate);
        }
        deleteCache(Cachekeys.CHECKLIST);

        res.status(200).json({ message: 'checklist created successfully' });
    } catch (error) {
        console.error("Failed to create checklist:", error);
        res.status(500).json({ error: 'Failed to create checklist' });
    }
}); 

//get a specific Checklist by ID
router.get('/checklists/:Checklist_record_id', async (req, res) => {
  const { Checklist_record_id } = req.params;

  
  try {
    const ChecklistRecord = await getRecord(ChecklistTable, Checklist_record_id);
     console.log(ChecklistRecord)
    if (!ChecklistRecord) {
      return res.status(404).json({ message: 'Checklist not found' });
    }
    let plainFields = Object.fromEntries(ChecklistRecord);
    let formattedChecklists: { [k: string]: any; } = plainFields
    res.json(formattedChecklists)

  } catch (error) {
    console.error("Error fetching Checklist:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//modify one Checklist 
router.put('/checklists/:Checklist_record_id', async (req, res) => {
    const { Checklist_record_id } = req.params;
    const { Completed } = req.body;

    try {
        const checklistRecord = await getRecord(ChecklistTable, Checklist_record_id);
        if (!checklistRecord) {
            return res.status(404).json({ message: 'Checklist not found' });
        }
        
        const updatedFields = {
            Completed: Completed
        };
        const recordToUpdate = {
            id: Checklist_record_id, 
            fields: updatedFields
        };
        await updateRecord(ChecklistTable, [recordToUpdate]);

        deleteCache(Cachekeys.CHECKLIST);

        res.status(200).json({ message: 'Checklist updated successfully' });
    } catch (error) {
        console.error("Failed to update Checklist:", error);
        res.status(500).json({ error: 'Failed to update Checklist' });
    }
});


   //delete one Checklist 
  router.delete('/checklists/:Checklist_record_id', async (req, res) => {
    const { Checklist_record_id } = req.params;
    const record = await getRecord(ChecklistTable, Checklist_record_id);

    try {
      await deleteRecords(ChecklistTable, [Checklist_record_id]);

      deleteCache(Cachekeys.CHECKLIST);
      res.status(200).json({ message: 'Checklist deleted successfully' });
    } catch (error) {
      console.error("Failed to delete Checklist:", error);
      res.status(500).json({ error: 'Failed to delete Checklist' });
    }
  });

module.exports = router;