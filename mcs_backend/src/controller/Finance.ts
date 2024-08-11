
import express from 'express';
import { 
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
} from '../models/airtable';
// import { Creation, TableFields, } from '../types/types';

const router = express.Router();
const financeTable = String(process.env.FINANCE)

router.get('/finance', async (req, res) => {
    try {
        const account = await getTable(financeTable, "");
        const formattedAccount: { [k: string]: any; }[] = [];
        account.forEach((fields) => {
            const plainFields = Object.fromEntries(fields); 
            formattedAccount.push(plainFields);
            console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
        });
        res.json(formattedAccount);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

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


router.delete('/finance/:finance_id', async (req, res) => {
    const { finance_id } = req.params;

    try {
        await deleteRecords(financeTable, [finance_id]);
        res.status(200).json({ message: 'Finance record deleted successfully' });
    } catch (error) {
        console.error("Failed to delete Finance record:", error);
        res.status(500).json({ error: 'Failed to delete Finance record' });
    }
});

module.exports = router;