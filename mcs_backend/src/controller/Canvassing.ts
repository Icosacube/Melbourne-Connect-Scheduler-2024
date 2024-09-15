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
import {getCache,setCache,deleteCache} from '../utils/caching';
const router = express.Router();
const canvassingTable = String(process.env.CANVASSING)
const AcademicTable = String(process.env.ACADEMIC)
// Combined GET endpoint for canvassings
router.get('/canvassings', async (req, res) => {
  const { academic, mainEvent, availableAcademic } = req.query;

  try {
    // Cache
    const cachedCanvassing = getCache(Cachekeys.CANVASSINGS);
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
    
    // Cache
    setCache(Cachekeys.CANVASSINGS, filteredCanvassing);
    res.json(filteredCanvassing);
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
    res.json(formattedCanvassing);
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
    for (const canvassing of canvassings) {
      const { MainEvent, MixedAcademic, StartTime, EndTime, Venue, AvailableAcademic } = canvassing;
      const academicIDs: string[] = [];

      for (const academic of MixedAcademic) {
        if (academic.id) {
          academicIDs.push(academic.id);
        } else {
          const newAcademic = {
            fields: {
              Name: academic.name,
              Email: academic.email,
              MainEvent,
            },
          };
          const [createdAcademicID] = await createRecord(AcademicTable, [newAcademic]);
          academicIDs.push(createdAcademicID);
        }
      }

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
    deleteCache(Cachekeys.CANVASSINGS); // Delete cache
    res.status(200).json({ message: 'Canvassing created successfully' });
  } catch (error) {
    console.error("Failed to create Canvassing:", error);
    res.status(500).json({ error: 'Failed to create Canvassing' });
  }
});
router.put('/canvassings', async (req, res) => {
  const { mainEventID } = req.query;
  const newCanvassings: Canvassing[] = req.body; 

  if (typeof mainEventID !== 'string') {
    return res.status(400).json({ error: 'mainEventID is required and must be a string' });
  }

  // Validate
  for (const canvassing of newCanvassings) {
    if (!canvassing.StartTime || !canvassing.EndTime) {
      return res.status(400).json({ error: 'StartTime and EndTime are required for each canvassing' });
    }
  }

  try {
    const filter = `{MainEvent}="${mainEventID}"`;
    const existingRecords = await getTable(canvassingTable, filter);

    if (existingRecords.length > 0) {
      const recordIdsToDelete = existingRecords.map(record => record.get("id") as string);
      await deleteRecords(canvassingTable, recordIdsToDelete);
    }

    const recordsToCreate = newCanvassings.map(canvassing => ({
      fields: canvassing
    }));
    await createRecord(canvassingTable, recordsToCreate);

    deleteCache(Cachekeys.CANVASSINGS); // Delete cache
    res.status(200).json({ message: 'Canvassings replaced successfully' });
  } catch (error) {
    console.error("Failed to replace Canvassings:", error);
    res.status(500).json({ error: 'Failed to replace Canvassings' });
  }
});

module.exports = router;
