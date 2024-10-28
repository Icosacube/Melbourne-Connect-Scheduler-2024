import express from 'express';
import { 
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
} from '../models/airtable';
import { Creation, TableFields, FundingAccount } from '../types/types';
import {Cachekeys} from '../Enum/Cachekeys';
import {getCache,setCache,deleteCache} from '../utils/caching';
const router = express.Router();
const accountTable = String(process.env.FUNDINGACCOUNT)

//get all funding accounts
router.get('/funding-accounts', async (req, res) => {
    try {
        const cachedAccount = getCache(Cachekeys.FUNDINGACCOUNTS);
        if (cachedAccount) {
            return res.json(cachedAccount).status(200);
        }
        const account = await getTable(accountTable, "");
        const formattedAccount: { [k: string]: any; }[] = [];
        account.forEach((fields) => {
            const plainFields = Object.fromEntries(fields); 
            formattedAccount.push(plainFields);
            // console.log(`ID: ${plainFields.id}, Fields:`, plainFields);
        });
        setCache(Cachekeys.FUNDINGACCOUNTS, formattedAccount);
        res.json(formattedAccount);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get a specific funding account by ID
router.get('/funding-accounts/:funding_account_id', async (req, res) => {
    const { funding_account_id } = req.params;
    
    try {
      const accountRecord = await getRecord(accountTable, funding_account_id);
      
      if (!accountRecord) {
        return res.status(404).json({ message: 'Account not found' });
      }
      let plainFields = Object.fromEntries(accountRecord);
      let formattedAccount: { [k: string]: any; } = plainFields
      res.json(formattedAccount)

    } catch (error) {
      console.error("Error fetching Funding Account:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//create a new funding account
router.post('/funding-accounts', async (req, res) => {
   
    const newFundingAccount : FundingAccount = req.body;
    const accountRecord : Creation = {
        fields: newFundingAccount 
    };

    try {
        await createRecord(accountTable, [accountRecord]);
        deleteCache(Cachekeys.FUNDINGACCOUNTS);
        res.status(200).json({ message: 'Funding Account created successfully' });
    } catch (error) {
        console.error("Failed to create Funding Account:", error);
        res.status(500).json({ error: 'Failed to create Funding Account' });
    }
});

//update a funding account
router.put('/funding-accounts/:funding_account_id', async (req, res) => {
    const { funding_account_id } = req.params;
    const updatedFundingAccount: FundingAccount = req.body;

    const recordToUpdate = [{
        id: funding_account_id,
        fields: updatedFundingAccount
    }];

    try {
        await updateRecord(accountTable, recordToUpdate);
        deleteCache(Cachekeys.FUNDINGACCOUNTS);
        res.status(200).json({ message: 'Funding Account updated successfully' });
    } catch (error) {
        console.error("Failed to update Funding Account:", error);
        res.status(500).json({ error: 'Failed to update Funding Account' });
    }
});

//delete a funding account
router.delete('/funding-accounts/:funding_account_id', async (req, res) => {
    const { funding_account_id } = req.params;

    try {
        await deleteRecords(accountTable, [funding_account_id]);
        deleteCache(Cachekeys.FUNDINGACCOUNTS);
        res.status(200).json({ message: 'Funding Account deleted successfully' });
    } catch (error) {
        console.error("Failed to delete Funding Account:", error);
        res.status(500).json({ error: 'Failed to delete Funding Account' });
    }
});

module.exports = router;