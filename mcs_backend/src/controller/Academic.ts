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
//get all academics
router.get('/academics', async (req, res) => {
  try {
    const cachedAcademics = getCache(Cachekeys.ACADEMICS);
    if (cachedAcademics) {
        return res.json(cachedAcademics).status(200);
    }
    const accommodations = await getTable(AcademicTable, "");
    const formattedAcademics: { [k: string]: any; }[] = [];
    accommodations.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      formattedAcademics.push(plainFields);
      console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
    });
    setCache(Cachekeys.ACADEMICS, formattedAcademics);
    res.json(formattedAcademics);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Get a specific academic by ID
router.get('/academics/academic/:academic_record_id', async (req, res) => {
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
//get all academics for one Canvassing
router.get('/Academic/:canvassingID', async (req, res) => {
  const { canvassingID } = req.params;

  try {
    const Canvassing = await getTable(AcademicTable, "");
    const academicCanvassing: { [k: string]: any; }[] = [];

    Canvassing.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      if (plainFields.Canvassing && plainFields.Canvassing.includes(canvassingID)) {
        academicCanvassing.push(plainFields);
      }
    });

    if (academicCanvassing.length === 0) {
      return res.status(404).json({ message: 'No Canvassing found for this academic' });
    }

    res.json(academicCanvassing);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/Academic/:mainEventID', async (req, res) => {
  const { mainEventID } = req.params;
  const newAcademic: Academic = req.body;
  newAcademic.MainEvent = [mainEventID];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newAcademic.Email)) {
      return res.status(400).json({ error: 'Invalid email format' });
  }
  const cateringRecord = {
      fields: newAcademic
  };
  
  try {
      await createRecord(AcademicTable, [cateringRecord]);
      deleteCache(Cachekeys.ACADEMICS);
      res.status(200).json({ message: 'Academic created successfully' });
  } catch (error) {
      console.error("Failed to create Academic:", error);
      res.status(500).json({ error: 'Failed to create Academic' });
  }
});
module.exports = router;