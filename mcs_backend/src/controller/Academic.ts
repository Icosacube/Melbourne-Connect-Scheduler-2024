import express from 'express';
import { 
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords
} from '../models/airtable';

import { Academic, TableFields } from '../types/types';

const router = express.Router();
const AcademicTable = String(process.env.ACADEMIC)
//get all academics
router.get('/academics', async (req, res) => {
  try {
    const accommodations = await getTable(AcademicTable, "");
    const formattedAcademics: { [k: string]: any; }[] = [];
    accommodations.forEach((fields) => {
      const plainFields = Object.fromEntries(fields);
      formattedAcademics.push(plainFields);
      console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
    });
    res.json(formattedAcademics);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Get a specific academic by ID
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
//get all academics for one Canvassing, merge this filter function to  GET /academics
// filter by canvassingID if the user supplies it otherwise return all academics
// router.get('/academics/:canvassingID', async (req, res) => {
//   const { canvassingID } = req.params;

//   try {
//     const Canvassing = await getTable(AcademicTable, "");
//     const academicCanvassing: { [k: string]: any; }[] = [];

//     Canvassing.forEach((fields) => {
//       const plainFields = Object.fromEntries(fields);
//       if (plainFields.Canvassing && plainFields.Canvassing.includes(canvassingID)) {
//         academicCanvassing.push(plainFields);
//       }
//     });

//     if (academicCanvassing.length === 0) {
//       return res.status(404).json({ message: 'No Canvassing found for this academic' });
//     }

//     res.json(academicCanvassing);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
module.exports = router;