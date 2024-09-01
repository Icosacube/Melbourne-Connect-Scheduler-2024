import request from 'supertest';
import express from 'express';
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from '../models/airtable';
import { getCache, setCache, deleteCache } from '../utils/caching';
import { Cachekeys } from '../Enum/Cachekeys';

const cateringRouter = require('../controller/catering'); 
const app = express();
app.use(express.json());
app.use('/', cateringRouter);

jest.mock('../models/airtable', () => ({
  getTable: jest.fn(),
  getRecord: jest.fn(),
  createRecord: jest.fn(),
  updateRecord: jest.fn(),
  deleteRecords: jest.fn(),
}));

jest.mock('../utils/caching', () => ({
  getCache: jest.fn(),
  setCache: jest.fn(),
  deleteCache: jest.fn(),
}));

describe('Catering Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCache as jest.Mock).mockReturnValue(null); 
  });

  describe('GET /catering', () => {
    it('should return all caterings when cache is empty', async () => {
      const mockData = [
        {
          id: 'rec1',
              fields: {
              BookingReference: "abcd",
            Description: 'Canapes',
                  Cost: 1000,
            FundingAccount: "FundingAccount1",
            MainEvent: ['mainEvent1'],
            ExpenseDate: '2024-09-06',
          },
        },
        {
          id: 'rec2',
          fields: {
            BookingReference: "11111",
            Description: 'Drinks and Dinner',
                  Cost: 10000,
            FundingAccount: "FundingAccount2",
            MainEvent: ['mainEvent2'],
            ExpenseDate: '2024-10-06',
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map((item) =>
          new Map(Object.entries(item.fields).concat([['id', item.id]]))
        )
      );

      const response = await request(app).get('/catering');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
            BookingReference: "abcd",
            Description: 'Canapes',
                  Cost: 1000,
            FundingAccount: "FundingAccount1",
            MainEvent: ['mainEvent1'],
              ExpenseDate: '2024-09-06',
            id: "rec1"
        },
        {
            BookingReference: "11111",
            Description: 'Drinks and Dinner',
                  Cost: 10000,
            FundingAccount: "FundingAccount2",
            MainEvent: ['mainEvent2'],
            ExpenseDate: '2024-10-06',
            id: "rec2"
        },
      ]);
      expect(getCache).toHaveBeenCalledWith(Cachekeys.CATERINGS);
      expect(getTable).toHaveBeenCalledWith(expect.any(String), expect.any(String));
      expect(setCache).toHaveBeenCalledWith(Cachekeys.CATERINGS, expect.any(Array));
    });

    it('should return 500 if there is a server error', async () => {
      (getTable as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app).get('/catering');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('GET /catering/:catering_record_id', () => {
    it('should return a specific catering by ID', async () => {
      const mockRecord = {
        id: 'rec1',
        fields: {
            BookingReference: "abcd",
            Description: 'Canapes',
                  Cost: 1000,
            FundingAccount: "FundingAccount1",
            MainEvent: ['mainEvent1'],
            ExpenseDate: '2024-09-06',
        },
      };

      (getRecord as jest.Mock).mockResolvedValue(
        new Map(Object.entries(mockRecord.fields).concat([['id', mockRecord.id]]))
      );

      const response = await request(app).get('/catering/rec1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        BookingReference: "abcd",
        Description: 'Canapes',
              Cost: 1000,
        FundingAccount: "FundingAccount1",
        MainEvent: ['mainEvent1'],
          ExpenseDate: '2024-09-06',
        id: "rec1"
      });
    });

    it('should return 404 if the catering is not found', async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/catering/nonexistent');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Catering not found');
    });

    it('should return 500 if there is a server error', async () => {
      (getRecord as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app).get('/catering/rec1');
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });

  describe('GET /catering/event/:mainEventID', () => {
    it('should return all caterings for a specific main event', async () => {
      const mockData = [
        {
          id: 'rec1',
          fields: {
            BookingReference: "abcd",
            Description: 'Canapes',
                  Cost: 1000,
            FundingAccount: "FundingAccount1",
            MainEvent: ['mainEvent1'],
            ExpenseDate: '2024-09-06',
          },
        },
        {
          id: 'rec2',
          fields: {
            BookingReference: "11111",
            Description: 'Drinks and Dinner',
                  Cost: 10000,
            FundingAccount: "FundingAccount2",
            MainEvent: ['mainEvent2'],
            ExpenseDate: '2024-10-06',
           
          },
          },
          {
            id: 'rec3',
            fields: {
              BookingReference: "666666",
              Description: 'Chicken Wings',
                    Cost: 10000,
              FundingAccount: "FundingAccount3",
              MainEvent: ['mainEvent1'],
              ExpenseDate: '2024-09-06',
              
            },
          },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map((item) =>
          new Map(Object.entries(item.fields).concat([['id', item.id]]))
        )
      );

      const response = await request(app).get('/catering/event/mainEvent1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
            BookingReference: "abcd",
            Description: 'Canapes',
                  Cost: 1000,
            FundingAccount: "FundingAccount1",
            MainEvent: ['mainEvent1'],
              ExpenseDate: '2024-09-06',
            id: "rec1"
        },
        {
            BookingReference: "666666",
            Description: 'Chicken Wings',
                  Cost: 10000,
            FundingAccount: "FundingAccount3",
            MainEvent: ['mainEvent1'],
            ExpenseDate: '2024-09-06',
            id: "rec3"
        },
      ]);
      expect(getTable).toHaveBeenCalledWith(expect.any(String), expect.any(String));
    });

    it('should return 404 if no caterings are found for the main event', async () => {
      (getTable as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/catering/event/nonexistentEvent');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('No catering found for this main event');
    });

    it('should return 500 if there is a server error', async () => {
      (getTable as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app).get('/catering/event/mainEvent1');
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });

  describe('POST /catering', () => {
    it('should create a new catering', async () => {
      const newCatering = {
        BookingReference: "888888",
            Description: 'Dominos Pizza',
                  Cost: 100000,
            FundingAccount: "FundingAccount3",
            MainEvent: ['mainEvent2'],
            ExpenseDate: '2024-09-06',
      };

      (createRecord as jest.Mock).mockResolvedValue(['recNew']);

      const response = await request(app).post('/catering').send(newCatering);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Catering created successfully');
      expect(createRecord).toHaveBeenCalledWith(expect.any(String), [
        { fields: newCatering },
      ]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.CATERINGS);
    });

    it('should return 500 if there is a server error', async () => {
      const newCatering = {
        BookingReference: "888888",
        Description: 'Dominos Pizza',
              Cost: 100000,
        FundingAccount: "FundingAccount3",
        MainEvent: ['mainEvent2'],
        ExpenseDate: '2024-09-06',
      };

      (createRecord as jest.Mock).mockRejectedValue(new Error('Failed to create catering'));

      const response = await request(app).post('/catering').send(newCatering);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to create catering');
    });
  });

  describe('PUT /catering/:catering_record_id', () => {
    it('should update an existing catering', async () => {
      const updatedCatering = {
        BookingReference: "888888",
        Description: '48HR Pizza',
              Cost: 4000,
        FundingAccount: "FundingAccount2",
        MainEvent: ['mainEvent2'],
        ExpenseDate: '2024-09-06',
      };

      (updateRecord as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .put('/catering/rec1')
        .send(updatedCatering);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Catering updated successfully');
      expect(updateRecord).toHaveBeenCalledWith(expect.any(String), [
        { id: 'rec1', fields: updatedCatering },
      ]);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.CATERINGS);
    });

    it('should return 500 if there is a server error', async () => {
      const updatedCatering = {
        BookingReference: "888888",
        Description: '48HR Pizza',
              Cost: 4000,
        FundingAccount: "FundingAccount2",
        MainEvent: ['mainEvent2'],
        ExpenseDate: '2024-09-06',
      };

      (updateRecord as jest.Mock).mockRejectedValue(new Error('Failed to update catering'));

      const response = await request(app)
        .put('/catering/rec1')
        .send(updatedCatering);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to update catering');
    });
  });

  describe('DELETE /catering/:catering_record_id', () => {
    it('should delete an existing catering', async () => {
      (deleteRecords as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete('/catering/rec1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Catering deleted successfully');
      expect(deleteRecords).toHaveBeenCalledWith(expect.any(String), ['rec1']);
      expect(deleteCache).toHaveBeenCalledWith(Cachekeys.CATERINGS);
    });

    it('should return 500 if there is a server error', async () => {
      (deleteRecords as jest.Mock).mockRejectedValue(new Error('Failed to delete catering'));

      const response = await request(app).delete('/catering/rec1');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to delete catering');
    });
  });
});
