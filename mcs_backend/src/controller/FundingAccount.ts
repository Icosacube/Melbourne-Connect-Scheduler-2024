import express from 'express';
import { 
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
} from '../models/airtable';
import { FundingAccount } from '../types/types';

const router = express.Router();
const AccountTable = String(process.env.FUNDINGACCOUNT)

router.get('/funding-accounts', async (req, res) => {
    try {
        const account = await getTable(AccountTable, "");
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

router.get('/funding-accounts/:funding_account_id/', async (req, res) => {
    const { funding_account_id } = req.params;
    
    try {
      const AccountRecord = await getRecord(AccountTable, funding_account_id);
      
      if (!AccountRecord) {
        return res.status(404).json({ message: 'Account not found' });
      }
      let plainFields = Object.fromEntries(AccountRecord);
      let formattedAccount: { [k: string]: any; } = plainFields
      res.json(formattedAccount)

    } catch (error) {
      console.error("Error fetching Funding Account:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;