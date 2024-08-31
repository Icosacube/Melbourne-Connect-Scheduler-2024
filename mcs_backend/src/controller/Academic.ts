import express from 'express';
import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords
} from '../models/airtable';
import {Cachekeys} from '../Enum/Cachekeys';
import {getCache,setCache,deleteCache} from '../utils/caching';
import { Academic, TableFields } from '../types/types';

const router = express.Router();
const AcademicTable = String(process.env.ACADEMIC)

// Combined GET endpoint for academics
router.get('/academics', async (req, res) => {
  const { mainEventID, canvassingID } = req.query;

  try {
    //cache
    const cachedAcademics = getCache(Cachekeys.ACADEMICS);
    if (cachedAcademics) {
      return res.json(cachedAcademics).status(200);
    }

    const allAcademics = await getTable(AcademicTable, "");
    const filteredAcademics: { [k: string]: any; }[] = [];

    // Filter based on query parameters
    allAcademics.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      const matchMainEvent = mainEventID ? plainFields.MainEvent && plainFields.MainEvent.includes(mainEventID) : true;
      const matchCanvassing = canvassingID ? plainFields.Canvassing && plainFields.Canvassing.includes(canvassingID) : true;

      if (matchMainEvent && matchCanvassing) {
        filteredAcademics.push(plainFields);
      }
    });

    // Check academics 
    if (filteredAcademics.length === 0) {
      return res.status(404).json({ message: 'No matching academics found' });
    }
    // Cache
    setCache(Cachekeys.ACADEMICS, filteredAcademics);
    res.json(filteredAcademics);
  } catch (error) {
    console.error("Error fetching academics:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/academics/:academic_record_id', async (req, res) => {
  const { academic_record_id } = req.params;
  
  try {
    const academicRecord = await getRecord(AcademicTable, academic_record_id);
    
    if (!academicRecord) {
      return res.status(404).json({ message: 'academic not found' });
    }
    let plainFields = Object.fromEntries(academicRecord);
    let formattedAcademics: { [k: string]: any; } = plainFields
    res.json(formattedAcademics)

  } catch (error) {
    console.error("Error fetching academic:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/academics', async (req, res) => {
  const { mainEventID, canvassingID } = req.query;
  const newAcademic: Academic = req.body;
  if (typeof mainEventID === 'string') {
    newAcademic.MainEvent = [mainEventID];
  }
  if (typeof canvassingID === 'string') {
    newAcademic.Canvassing = [canvassingID];
  }
  
  // Validate email 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newAcademic.Email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const cateringRecord = {
    fields: newAcademic
  };

  try {
    await createRecord(AcademicTable, [cateringRecord]);
    deleteCache(Cachekeys.ACADEMICS);//delete cache
    res.status(200).json({ message: 'Academic created successfully' });
  } catch (error) {
    console.error("Failed to create Academic:", error);
    res.status(500).json({ error: 'Failed to create Academic' });
  }
});
module.exports = router;