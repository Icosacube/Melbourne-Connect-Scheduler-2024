import request from 'supertest';
import express from 'express';
import { Academic } from '../types/types';
const academicRouter = require('../controller/Academic');

const app = express();
app.use(express.json());
app.use('/', academicRouter);

jest.mock('../models/airtable', () => ({
  getTable: jest.fn(),
  getRecord: jest.fn(),
  createRecord: jest.fn(),
  updateRecord: jest.fn(),
  deleteRecords: jest.fn(),
}));

const { getTable, getRecord } = require('../models/airtable');

describe('Controller tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all academics', async () => {
    const mockData: Array<Map<string, any>> = [
      new Map<string, any>([['id', 'rec123'], ['Email', 'john@example.com'], ['Name', 'John Doe'], ['MainEvent', 'Event1'], ['Canvassing', ['canvas1', 'canvas2']]]),
      new Map<string, any>([['id', 'rec456'], ['Email', 'jane@example.com'], ['Name', 'Jane Doe'], ['MainEvent', 'Event2'], ['Canvassing', ['canvas2']]]),
    ];

    getTable.mockResolvedValue(mockData);

    const response = await request(app).get('/academics');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 'rec123', Email: 'john@example.com', Name: 'John Doe', MainEvent: 'Event1', Canvassing: ['canvas1', 'canvas2'] },
      { id: 'rec456', Email: 'jane@example.com', Name: 'Jane Doe', MainEvent: 'Event2', Canvassing: ['canvas2'] },
    ]);
  });

  it('should return a specific academic by ID', async () => {
    const mockRecord: Map<string, any> = new Map<string, any>([['id', 'rec123'], ['Email', 'john@example.com'], ['Name', 'John Doe'], ['MainEvent', 'Event1'], ['Canvassing', ['canvas1', 'canvas2']]]);

    getRecord.mockResolvedValue(mockRecord);

    const response = await request(app).get('/academics/academic/rec123');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 'rec123', Email: 'john@example.com', Name: 'John Doe', MainEvent: 'Event1', Canvassing: ['canvas1', 'canvas2'] });
  });

  it('should return 404 if academic not found', async () => {
    getRecord.mockResolvedValue(null);

    const response = await request(app).get('/academics/academic/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'academic not found' });
  });

  it('should return all academics for a specific canvassing ID', async () => {
    const mockData: Array<Map<string, any>> = [
      new Map<string, any>([['id', 'rec123'], ['Email', 'john@example.com'], ['Name', 'John Doe'], ['MainEvent', 'Event1'], ['Canvassing', ['canvas1', 'canvas2']]]),
      new Map<string, any>([['id', 'rec456'], ['Email', 'jane@example.com'], ['Name', 'Jane Doe'], ['MainEvent', 'Event2'], ['Canvassing', ['canvas2']]]),
    ];

    getTable.mockResolvedValue(mockData);

    const response = await request(app).get('/Academic/canvas2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 'rec123', Email: 'john@example.com', Name: 'John Doe', MainEvent: 'Event1', Canvassing: ['canvas1', 'canvas2'] },
      { id: 'rec456', Email: 'jane@example.com', Name: 'Jane Doe', MainEvent: 'Event2', Canvassing: ['canvas2'] },
    ]);
  });

  it('should return 404 if no canvassing found for specific ID', async () => {
    const mockData: Array<Map<string, any>> = [
      new Map<string, any>([['id', 'rec123'], ['Email', 'john@example.com'], ['Name', 'John Doe'], ['MainEvent', 'Event1'], ['Canvassing', ['canvas1']]]),
    ];

    getTable.mockResolvedValue(mockData);

    const response = await request(app).get('/Academic/nonexistent');
    console.log(response.status)
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'No Canvassing found for this academic' });
  });
});

