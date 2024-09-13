import request from 'supertest';
import express from 'express';
import {
  getTable,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecords,
} from '../models/airtable';

const serviceRouter = require('../controller/service');
const app = express();
app.use(express.json());
app.use('/', serviceRouter);

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

describe('Service Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /services', () => {
    it('should return all services', async () => {
      const mockData = [
        {
          id: 'rec1',
          fields: {
              ServiceDescription: 'Service 1',
              Notes: "Uber",
            Cost: 100,
              MainEvent: 'mainEvent1',
            FundingAccocunt: "0001",
            Date: '2024-12-01',
          },
        },
        {
          id: 'rec2',
          fields: {
            ServiceDescription: 'Service 1',
              Notes: "Coffee and Brunch",
            Cost: 40,
              MainEvent: 'mainEvent2',
            FundingAccocunt: "0003",
            Date: '2024-12-21',
          },
        },
      ];

      (getTable as jest.Mock).mockResolvedValue(
        mockData.map((item) =>
          new Map(Object.entries(item.fields).concat([['id', item.id]]))
        )
      );

      const response = await request(app).get('/services');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
            ServiceDescription: 'Service 1',
            Notes: "Uber",
          Cost: 100,
            MainEvent: 'mainEvent1',
          FundingAccocunt: "0001",
              Date: '2024-12-01',
          id: "rec1"
        },
        {
            ServiceDescription: 'Service 1',
            Notes: "Coffee and Brunch",
          Cost: 40,
            MainEvent: 'mainEvent2',
          FundingAccocunt: "0003",
            Date: '2024-12-21',
          id: "rec2"
        },
      ]);
      expect(getTable).toHaveBeenCalledWith(expect.any(String), expect.any(String));
    });

    it('should return 500 if there is a server error', async () => {
      (getTable as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app).get('/services');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('GET /services/service/:service_record_id', () => {
    it('should return a specific service by ID', async () => {
      const mockRecord = {
        id: 'rec1',
        fields: {
            ServiceDescription: 'Service 1',
            Notes: "Uber",
          Cost: 100,
            MainEvent: 'mainEvent1',
          FundingAccocunt: "0001",
              Date: '2024-12-01',
        },
      };

      (getRecord as jest.Mock).mockResolvedValue(
        new Map(Object.entries(mockRecord.fields).concat([['id', mockRecord.id]]))
      );

      const response = await request(app).get('/services/service/rec1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ServiceDescription: 'Service 1',
        Notes: "Uber",
      Cost: 100,
        MainEvent: 'mainEvent1',
      FundingAccocunt: "0001",
          Date: '2024-12-01',
          id: "rec1"
      });
    });

    it('should return 404 if the service is not found', async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/services/service/nonexistent');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Service not found');
    });

    it('should return 500 if there is a server error', async () => {
      (getRecord as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app).get('/services/service/rec1');
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });

  describe('POST /service/:mainEventID', () => {
    it('should create a new service for a main event', async () => {
      const newService = {
        ServiceDescription: 'Service 1',
        Notes: "Lunch",
      Cost: 300,
        MainEvent: ['mainEvent3'],
      FundingAccocunt: "0001",
          Date: '2024-12-01',
      };

      (createRecord as jest.Mock).mockResolvedValue(['recNew']);

      const response = await request(app)
        .post('/service/mainEvent3')
        .send(newService);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Service created successfully');
      expect(createRecord).toHaveBeenCalledWith(expect.any(String), [
        { fields: newService },
      ]);
    });

    it('should return 500 if there is a server error', async () => {
      const newService = {
        ServiceDescription: 'Service 1',
        Notes: "Lunch",
      Cost: 300,
        MainEvent: 'mainEvent3',
      FundingAccocunt: "0001",
          Date: '2024-12-01',
      };

      (createRecord as jest.Mock).mockRejectedValue(new Error('Failed to create service'));

      const response = await request(app)
        .post('/service/mainEvent3')
        .send(newService);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to create service');
    });
  });

  describe('PUT /services/:service_record_id', () => {
    it('should update an existing service', async () => {
      const updatedService = {
        ServiceDescription: 'Service 4',
        Notes: "Dinner",
      Cost: 300,
        MainEvent: 'mainEvent3',
      FundingAccocunt: "0003",
          Date: '2024-10-01',
      };

      (updateRecord as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .put('/services/rec1')
        .send(updatedService);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Service updated successfully');
      expect(updateRecord).toHaveBeenCalledWith(expect.any(String), [
        { id: 'rec1', fields: updatedService },
      ]);
    });

    it('should return 500 if there is a server error', async () => {
      const updatedService = {
        ServiceDescription: 'Updated Service',
        Cost: 200,
        MainEvent: ['mainEventUpdated'],
        Date: '2024-12-20',
      };

      (updateRecord as jest.Mock).mockRejectedValue(new Error('Failed to update service'));

      const response = await request(app)
        .put('/services/rec1')
        .send(updatedService);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to update service');
    });
  });

  describe('DELETE /services/:service_record_id', () => {
    it('should delete an existing service', async () => {
      (deleteRecords as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete('/services/rec1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Service deleted successfully');
      expect(deleteRecords).toHaveBeenCalledWith(expect.any(String), ['rec1']);
    });

    it('should return 500 if there is a server error', async () => {
      (deleteRecords as jest.Mock).mockRejectedValue(new Error('Failed to delete service'));

      const response = await request(app).delete('/services/rec1');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to delete service');
    });
  });
});
