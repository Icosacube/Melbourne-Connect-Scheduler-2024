import express from 'express';
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from '../models/airtable';

import { Canvassing, TableFields } from '../types/types';
import {Cachekeys} from '../Enum/Cachekeys';
import {getCache,setCache,deleteCache,deleteCacheByPrefix} from '../utils/caching';
const router = express.Router();
const canvassingTable = String(process.env.CANVASSING)
const AcademicTable = String(process.env.ACADEMIC)
// Combined GET endpoint for canvassings
router.get('/canvassings', async (req, res) => {
  const { academic, mainEvent, availableAcademic } = req.query;

  try {
    // Cache
    const cacheKey = `${Cachekeys.CANVASSINGS}_${JSON.stringify(req.query)}`;
    const cachedCanvassing = getCache(cacheKey);
    if (cachedCanvassing) {
      return res.json(cachedCanvassing).status(200);
    }

    const allCanvassing = await getTable(canvassingTable, "");
    const filteredCanvassing: { [k: string]: any; }[] = [];

    allCanvassing.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      
      const matchAcademic = academic ? plainFields.Academic && plainFields.Academic.includes(academic) : true;
      const matchMainEvent = mainEvent ? plainFields.MainEvent && plainFields.MainEvent.includes(mainEvent) : true;
      const matchAvailableAcademic = availableAcademic ? plainFields.AvailableAcademic && plainFields.AvailableAcademic.includes(availableAcademic) : true;

      if (matchAcademic && matchMainEvent && matchAvailableAcademic) {
        filteredCanvassing.push(plainFields);
      }
    });

    if (filteredCanvassing.length === 0) {
      return res.status(404).json({ message: 'No matching canvassings found' });
    }
    
    // Caches
    setCache(cacheKey, filteredCanvassing);
    res.json(filteredCanvassing).status(200);
  } catch (error) {
    console.error("Error fetching canvassings:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get a specific canvassing by ID
router.get('/canvassing/:canvassing_record_id', async (req, res) => {
  const { canvassing_record_id } = req.params;

  try {
    const CanvassingRecord = await getRecord(canvassingTable, canvassing_record_id);
    
    if (!CanvassingRecord) {
      return res.status(404).json({ message: 'Canvassing not found' });
    }
    let plainFields = Object.fromEntries(CanvassingRecord);
    let formattedCanvassing: { [k: string]: any } = plainFields;
    res.json(formattedCanvassing).status(200);
  } catch (error) {
    console.error('Error fetching Canvassing:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/canvassings', async (req, res) => {
  // const { mainEventID, academic, availableAcademic } = req.query;
  // const newCanvassing: Canvassing = req.body;

  // if (typeof mainEventID === 'string') {
  //   newCanvassing.MainEvent = [mainEventID];
  // }
  // if(typeof academic === 'string') {
  //   newCanvassing.Academic = [academic];
  // }
  // if(typeof availableAcademic === 'string') {
  //   newCanvassing.AvailableAcademic = [availableAcademic];
  // }

  // // Validate StartTime and EndTime
  // if (!newCanvassing.StartTime || !newCanvassing.EndTime) {
  //   return res.status(400).json({ error: 'StartTime and EndTime are required' });
  // }

  // const canvassingRecord = {
  //   fields: newCanvassing
  // };
  const canvassings = req.body; 

  if (!Array.isArray(canvassings) || canvassings.length === 0) {
    return res.status(400).json({ error: 'Canvassing array is required' });
  }
  try {
    // await createRecord(canvassingTable, [canvassingRecord]);
    const academicIDs: string[] = [];
    const MixedAcademic = canvassings ? canvassings[0].MixedAcademic : [];

    for (const academic of MixedAcademic) {
      if (academic.id) {
        academicIDs.push(academic.id);
      } else {
        const newAcademic = {
          fields: {
            Name: academic.name,
            Email: academic.email,
          },
        };
        const [createdAcademicID] = await createRecord(AcademicTable, [newAcademic]);
        academicIDs.push(createdAcademicID);
      }
    }

    for (const canvassing of canvassings) {
      const { MainEvent, MixedAcademic, StartTime, EndTime, Venue, AvailableAcademic } = canvassing;
      const newCanvassing: Canvassing = {
        StartTime,
        EndTime,
        Academic: academicIDs,
        MainEvent,
        AvailableAcademic,
        Venue,
      };

      // Create Canvassing record
      const canvassingRecord = { fields: newCanvassing };
      await createRecord(canvassingTable , [canvassingRecord]);
    }
    deleteCacheByPrefix(Cachekeys.CANVASSINGS);
    res.status(200).json({ message: 'Canvassing created successfully' });
  } catch (error) {
    console.error("Failed to create Canvassing:", error);
    res.status(500).json({ error: 'Failed to create Canvassing' });
  }
});
// Update one canvassing
router.put('/canvassing/:canvassing_record_id', async (req, res) => {
  const { canvassing_record_id } = req.params;
  const updatedCanvassingItem: Canvassing = req.body;

  const recordToUpdate = [{
    id: canvassing_record_id,
    fields: updatedCanvassingItem
  }];

  try {
    await updateRecord(canvassingTable, recordToUpdate);
    deleteCacheByPrefix(Cachekeys.CANVASSINGS);
    res.status(200).json({ message: 'Canvassing updated successfully' });
  } catch (error) {
    console.error("Failed to update canvassing:", error);
    res.status(500).json({ error: 'Failed to update canvassing' });
  }
});

// Delete one canvassing
router.delete('/canvassing/:canvassing_record_id', async (req, res) => {
  const { canvassing_record_id } = req.params;

  try {
    await deleteRecords(canvassingTable, [canvassing_record_id]);
    deleteCacheByPrefix(Cachekeys.CANVASSINGS);

    res.status(200).json({ message: 'Canvassing deleted successfully' });
  } catch (error) {
    console.error("Failed to delete canvassing:", error);
    res.status(500).json({ error: 'Failed to delete canvassing' });
  }
});

module.exports = router;
