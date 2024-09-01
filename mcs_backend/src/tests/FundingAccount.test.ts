import request from 'supertest';
import express from 'express';
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from '../models/airtable';

const fundingAccountRouter = require('../controller/fundingAccount'); 
const app = express();
app.use(express.json());
app.use('/', fundingAccountRouter);

jest.mock('../models/airtable', () => ({
  getTable: jest.fn(),
  getRecord: jest.fn(),
  createRecord: jest.fn(),
  updateRecord: jest.fn(),
  deleteRecords: jest.fn(),
}));

describe('Funding Account Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /funding-accounts', () => {
    it('should return all funding accounts', async () => {
      const mockData = [
          {
              id: 'rec1',
              fields: {
                  ThemisString: '0001',
                  Description: 'Account 1',
                  AccountUser: 'Holder',
                  Limit: 5000,
                  Accomodation: ["accomo1", "accomo2"],
                  Miscellanueous: ["misc1", "misc2"],
                  Venue: ["venue1", "venue2"],
                  Catering: ["catering1", "catering2"],
                  Flight: ["flight1"],
                  Service: ["service1","service2"],
            ExpiryDate: '2024-12-31',
          },
        },
        {
          id: 'rec2',
          fields: {
            ThemisString: '0002',
            Description: 'Account 2',
            AccountUser: 'Holder',
            Limit: 50000,
            Accomodation: ["accomo3", "accomo4"],
            Miscellanueous: ["misc3", "misc4"],
            Venue: ["venue3", "venue4"],
            Catering: ["catering3", "catering4"],
            Flight: ["flight2"],
            Service: ["service3","service4"],
      ExpiryDate: '2026-12-1',
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map((item) =>
          new Map(Object.entries(item.fields).concat([['id', item.id]]))
        )
      );

      const response = await request(app).get('/funding-accounts');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
            ThemisString: '0001',
            Description: 'Account 1',
            AccountUser: 'Holder',
            Limit: 5000,
            Accomodation: ["accomo1", "accomo2"],
            Miscellanueous: ["misc1", "misc2"],
            Venue: ["venue1", "venue2"],
            Catering: ["catering1", "catering2"],
            Flight: ["flight1"],
            Service: ["service1","service2"],
              ExpiryDate: '2024-12-31',
      id: "rec1"
        },
        {
            ThemisString: '0002',
            Description: 'Account 2',
            AccountUser: 'Holder',
            Limit: 50000,
            Accomodation: ["accomo3", "accomo4"],
            Miscellanueous: ["misc3", "misc4"],
            Venue: ["venue3", "venue4"],
            Catering: ["catering3", "catering4"],
            Flight: ["flight2"],
            Service: ["service3","service4"],
            ExpiryDate: '2026-12-1',
      id:"rec2"
        },
      ]);
      expect(getTable).toHaveBeenCalledWith(expect.any(String), expect.any(String));
    });

    it('should return 500 if there is a server error', async () => {
      (getTable as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app).get('/funding-accounts');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('GET /funding-accounts/:funding_account_id', () => {
    it('should return a specific funding account by ID', async () => {
      const mockRecord = {
        id: 'rec1',
        fields: {
         
            ThemisString: '0001',
            Description: 'Account 1',
            AccountUser: 'Holder',
            Limit: 5000,
            Accomodation: ["accomo1", "accomo2"],
            Miscellanueous: ["misc1", "misc2"],
            Venue: ["venue1", "venue2"],
            Catering: ["catering1", "catering2"],
            Flight: ["flight1"],
            Service: ["service1","service2"],
              ExpiryDate: '2024-12-31',
        },
      };

      (getRecord as jest.Mock).mockResolvedValue(
        new Map(Object.entries(mockRecord.fields).concat([['id', mockRecord.id]]))
      );

      const response = await request(app).get('/funding-accounts/rec1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
       
        ThemisString: '0001',
        Description: 'Account 1',
        AccountUser: 'Holder',
        Limit: 5000,
        Accomodation: ["accomo1", "accomo2"],
        Miscellanueous: ["misc1", "misc2"],
        Venue: ["venue1", "venue2"],
        Catering: ["catering1", "catering2"],
        Flight: ["flight1"],
        Service: ["service1","service2"],
          ExpiryDate: '2024-12-31',
          id: "rec1"
      });
    });

    it('should return 404 if the funding account is not found', async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/funding-accounts/nonexistent');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Account not found');
    });

    it('should return 500 if there is a server error', async () => {
      (getRecord as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app).get('/funding-accounts/rec1');
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });

  describe('POST /funding-accounts', () => {
    it('should create a new funding account', async () => {
      const newFundingAccount = {
        
        ThemisString: '0003',
        Description: 'Account 3',
        AccountUser: 'Holder',
        Limit: 10000,
        ExpiryDate: '2024-12-31',
      };

      (createRecord as jest.Mock).mockResolvedValue(['recNew']);

      const response = await request(app)
        .post('/funding-accounts')
        .send(newFundingAccount);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Funding Account created successfully');
      expect(createRecord).toHaveBeenCalledWith(expect.any(String), [
        { fields: newFundingAccount },
      ]);
    });

    it('should return 500 if there is a server error', async () => {
      const newFundingAccount = {
       
        ThemisString: '0003',
        Description: 'Account 3',
        AccountUser: 'Holder',
        Limit: 10000,
        ExpiryDate: '2024-12-31',
      };

      (createRecord as jest.Mock).mockRejectedValue(new Error('Failed to create Funding Account'));

      const response = await request(app)
        .post('/funding-accounts')
        .send(newFundingAccount);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to create Funding Account');
    });
  });

  describe('PUT /funding-accounts/:funding_account_id', () => {
    it('should update an existing funding account', async () => {
      const updatedFundingAccount = {
        
        ThemisString: '0003',
        Description: 'Account 3',
        AccountUser: 'User',
        Limit: 100000,
        ExpiryDate: '2024-12-31',
      };

      (updateRecord as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .put('/funding-accounts/rec1')
        .send(updatedFundingAccount);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Funding Account updated successfully');
      expect(updateRecord).toHaveBeenCalledWith(expect.any(String), [
        { id: 'rec1', fields: updatedFundingAccount },
      ]);
    });

    it('should return 500 if there is a server error', async () => {
      const updatedFundingAccount = {
        ThemisString: '0003',
        Description: 'Account 3',
        AccountUser: 'User',
        Limit: 100000,
        ExpiryDate: '2024-12-31',
      };

      (updateRecord as jest.Mock).mockRejectedValue(new Error('Failed to update Funding Account'));

      const response = await request(app)
        .put('/funding-accounts/rec1')
        .send(updatedFundingAccount);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to update Funding Account');
    });
  });

  describe('DELETE /funding-accounts/:funding_account_id', () => {
    it('should delete an existing funding account', async () => {
      (deleteRecords as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete('/funding-accounts/rec1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Funding Account deleted successfully');
      expect(deleteRecords).toHaveBeenCalledWith(expect.any(String), ['rec1']);
    });

    it('should return 500 if there is a server error', async () => {
      (deleteRecords as jest.Mock).mockRejectedValue(new Error('Failed to delete Funding Account'));

      const response = await request(app).delete('/funding-accounts/rec1');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to delete Funding Account');
    });
  });
});