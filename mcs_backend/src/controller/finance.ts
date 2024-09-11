
import express from 'express';
import { 
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
} from '../models/airtable';
// import { Creation, TableFields, } from '../types/types';
import {Cachekeys} from '../Enum/Cachekeys';
import {getCache,setCache,deleteCache} from '../utils/caching';
const router = express.Router();
const financeTable = String(process.env.FINANCE)

// get all finance records
router.get('/finance', async (req, res) => {
    try {
        const cachedFinance = getCache(Cachekeys.FINANCE);
        if (cachedFinance) {
            return res.json(cachedFinance).status(200);
        }
        const Finance = await getTable(financeTable, "");
        const formattedFinance: { [k: string]: any; }[] = [];
        Finance.forEach((fields) => {
            const plainFields = Object.fromEntries(fields); 
            formattedFinance.push(plainFields);
            console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
        });
        setCache(Cachekeys.FINANCE, formattedFinance);
        res.json(formattedFinance);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get finance record by finance record ID
router.get('/finance/:finance_id', async (req, res) => {
    const { finance_id } = req.params;
    
    try {
      const financeRecord = await getRecord(financeTable, finance_id);
      
      if (!financeRecord) {
        return res.status(404).json({ message: 'Finance record not found' });
      }
      let plainFields = Object.fromEntries(financeRecord);
      let formattedRecord: { [k: string]: any; } = plainFields
      res.json(formattedRecord)

    } catch (error) {
      console.error("Error fetching Finance record:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// delete finance record
router.delete('/finance/:finance_id', async (req, res) => {
    const { finance_id } = req.params;

    try {
        await deleteRecords(financeTable, [finance_id]);
        deleteCache(Cachekeys.FINANCE);
        res.status(200).json({ message: 'Finance record deleted successfully' });
    } catch (error) {
        console.error("Failed to delete Finance record:", error);
        res.status(500).json({ error: 'Failed to delete Finance record' });
    }
});

module.exports = router;