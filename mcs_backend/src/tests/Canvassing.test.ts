import request from 'supertest';
import express from 'express';
const canvassingRouter = require('../controller/Canvassing');
import { getTable, getRecord, createRecord, updateRecord, deleteRecords } from '../models/airtable';
import { getCache, setCache, deleteCache } from '../utils/caching';

const app = express();
app.use(express.json());
app.use("/", canvassingRouter);

// Mock Airtable and caching functions
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

describe('Canvassing API', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe('GET /canvassings', () => {
    it('should return cached canvassings if available', async () => {
      const cachedData = [{ id: '1', Academic: 'John Doe' }];
      (getCache as jest.Mock).mockReturnValue(cachedData);

      const res = await request(app).get('/canvassings');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(cachedData);
      expect(getCache).toHaveBeenCalledWith('Canvassings');
    });

    it('should return filtered canvassings if no cache', async () => {
      const canvassings = [{ id: '1', Academic: ['John_Doe'], MainEvent: ['Event1'] }];
      (getCache as jest.Mock).mockReturnValue(null);
      (getTable as jest.Mock).mockResolvedValue(canvassings);

      const res = await request(app).get('/canvassings?academic=John_Doe');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(canvassings);
      expect(setCache).toHaveBeenCalledWith('Canvassings', canvassings);
    });

    it('should return 404 if no matching canvassings are found', async () => {
      (getTable as jest.Mock).mockResolvedValue([]);

      const res = await request(app).get('/canvassings?academic=NonExistent');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('No matching canvassings found');
    });
  });

  describe('GET /canvassing/:canvassing_record_id', () => {
    it('should return a specific canvassing by ID', async () => {
      const canvassing = { id: '1', Academic: 'John Doe' };
      (getRecord as jest.Mock).mockResolvedValue(canvassing);

      const res = await request(app).get('/canvassing/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(canvassing);
    });

    it('should return 404 if canvassing not found', async () => {
      (getRecord as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get('/canvassing/1');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Canvassing not found');
    });
  });

  describe('POST /canvassings', () => {
    it('should create a new canvassing', async () => {
      const newCanvassing = {
        MainEvent: 'Event1',
        MixedAcademic: [{ name: 'John Doe', email: 'john@example.com' }],
        StartTime: '10:00',
        EndTime: '12:00',
      };

      (createRecord as jest.Mock).mockResolvedValue(['newCanvassingID']);
      const res = await request(app).post('/canvassings').send([newCanvassing]);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Canvassing created successfully');
      expect(deleteCache).toHaveBeenCalledWith('Canvassings');
    });

    it('should return 400 if canvassings array is invalid', async () => {
      const res = await request(app).post('/canvassings').send([]);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Canvassing array is required');
    });
  });

  describe('PUT /canvassing/:canvassing_record_id', () => {
    it('should update a canvassing', async () => {
      const updatedCanvassing = { StartTime: '11:00', EndTime: '13:00' };

      const res = await request(app)
        .put('/canvassing/1')
        .send(updatedCanvassing);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Canvassing updated successfully');
      expect(updateRecord).toHaveBeenCalledWith(expect.any(String), [
        { id: '1', fields: updatedCanvassing },
      ]);
      expect(deleteCache).toHaveBeenCalledWith('Canvassings');
    });

    it('should return 500 on update failure', async () => {
      (updateRecord as jest.Mock).mockRejectedValue(new Error('Failed to update'));

      const res = await request(app).put('/canvassing/1').send({ StartTime: '11:00' });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Failed to update canvassing');
    });
  });

  describe('DELETE /canvassing/:canvassing_record_id', () => {
    it('should delete a canvassing', async () => {
      const res = await request(app).delete('/canvassing/1');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Canvassing deleted successfully');
      expect(deleteRecords).toHaveBeenCalledWith(expect.any(String), ['1']);
      expect(deleteCache).toHaveBeenCalledWith('Canvassings');
    });

    it('should return 500 on delete failure', async () => {
      (deleteRecords as jest.Mock).mockRejectedValue(new Error('Failed to delete'));

      const res = await request(app).delete('/canvassing/1');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Failed to delete canvassing');
    });
  });
});
