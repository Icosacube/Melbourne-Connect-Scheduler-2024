import express from 'express';
import { 
    getTable,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecords
} from '../models/airtable';
import { Creation, TableFields, FundingAccount } from '../types/types';

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

router.get('/funding-accounts/:funding_account_id', async (req, res) => {
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

router.post('/funding-accounts/:funding_account_id', async (req, res) => {
    const { funding_account_id } = req.params;
    const newFundingAccount : FundingAccount = req.body;
    const accountRecord : Creation = {
        fields: newFundingAccount 
    };

    try {
        await createRecord(AccountTable, [accountRecord]);
        res.status(200).json({ message: 'Funding Account created successfully' });
    } catch (error) {
        console.error("Failed to create Funding Account:", error);
        res.status(500).json({ error: 'Failed to create Funding Account' });
    }
});


router.put('/funding-accounts/:funding_account_id', async (req, res) => {
    const { funding_account_id } = req.params;
    const updatedFundingAccount: FundingAccount = req.body;

    const recordToUpdate = [{
        id: funding_account_id,
        fields: updatedFundingAccount
    }];

    try {
        await updateRecord(AccountTable, recordToUpdate);
        res.status(200).json({ message: 'Funding Account updated successfully' });
    } catch (error) {
        console.error("Failed to update Funding Account:", error);
        res.status(500).json({ error: 'Failed to update Funding Account' });
    }
});
//delete one venue 
router.delete('/funding-accounts/:funding_account_id', async (req, res) => {
    const { funding_account_id } = req.params;

    try {
        await deleteRecords(AccountTable, [funding_account_id]);
        res.status(200).json({ message: 'Funding Account deleted successfully' });
    } catch (error) {
        console.error("Failed to delete Funding Account:", error);
        res.status(500).json({ error: 'Failed to delete Funding Account' });
    }
});

module.exports = router;