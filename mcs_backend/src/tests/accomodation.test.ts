import request from 'supertest';
import express from 'express';
const accommodationRouter = require('../controller/accomodation');
import { createServer } from 'http';

const app = express();
app.use(express.json());
app.use(accommodationRouter);

const server = createServer(app);

describe('Accommodation Controller Tests', () => {

  // it('should get all accommodations successfully', async () => {
  //   const response = await request(server).get('/accommodations');
  //   expect(response.status).toBe(200);
  //   expect(response.body).toBeInstanceOf(Array);
  //   if (response.body.length > 0) {
  //     const accommodation = response.body[0];
  //     expect(accommodation).toHaveProperty('BookingReference');
  //     expect(accommodation).toHaveProperty('HotelName');
  //     expect(accommodation).toHaveProperty('Address');
  //     expect(accommodation).toHaveProperty('Room');
  //     expect(accommodation).toHaveProperty('CheckIn');
  //     expect(accommodation).toHaveProperty('CheckOut');
  //     expect(accommodation).toHaveProperty('Cost');
  //     expect(accommodation).toHaveProperty('Notes');
  //     expect(accommodation).toHaveProperty('FundingAccount');
  //     expect(accommodation).toHaveProperty('Trip');
  //   }
  // });

  // it('should return 404 for getting a non-existent accommodation by ID', async () => {
  //   const response = await request(server).get('/accommodations/accommodation/nonexistentID');
  //   expect(response.status).toBe(404);
  //   expect(response.body).toHaveProperty('message', 'Accomodation not found');
  // });

  // it('should get accommodation by ID successfully', async () => {
  //   const mockId = 'validID';
  //   const response = await request(server).get(`/accommodations/accommodation/${mockId}`);
  //   expect(response.status).toBe(200);
  //   const accommodation = response.body;
  //   expect(accommodation).toHaveProperty('BookingReference');
  //   expect(accommodation).toHaveProperty('HotelName');
  //   expect(accommodation).toHaveProperty('Address');
  //   expect(accommodation).toHaveProperty('Room');
  //   expect(accommodation).toHaveProperty('CheckIn');
  //   expect(accommodation).toHaveProperty('CheckOut');
  //   expect(accommodation).toHaveProperty('Cost');
  //   expect(accommodation).toHaveProperty('Notes');
  //   expect(accommodation).toHaveProperty('FundingAccount');
  //   expect(accommodation).toHaveProperty('Trip');
  // });

  // it('should get accommodations by tripID successfully', async () => {
  //   const mockTripID = 'trip123';
  //   const response = await request(server).get(`/accommodation/${mockTripID}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toBeInstanceOf(Array);
  //   if (response.body.length > 0) {
  //     const accommodation = response.body[0];
  //     expect(accommodation).toHaveProperty('BookingReference');
  //     expect(accommodation).toHaveProperty('HotelName');
  //     expect(accommodation).toHaveProperty('Address');
  //     expect(accommodation).toHaveProperty('Room');
  //     expect(accommodation).toHaveProperty('CheckIn');
  //     expect(accommodation).toHaveProperty('CheckOut');
  //     expect(accommodation).toHaveProperty('Cost');
  //     expect(accommodation).toHaveProperty('Notes');
  //     expect(accommodation).toHaveProperty('FundingAccount');
  //     expect(accommodation).toHaveProperty('Trip');
  //     expect(accommodation.Trip).toContain(mockTripID);
  //   }
  // });

  // it('should return 404 for getting accommodations by non-existent tripID', async () => {
  //   const response = await request(server).get('/accommodation/nonexistentTripID');
  //   expect(response.status).toBe(404);
  //   expect(response.body).toHaveProperty('message', 'No accommodations found for this trip');
  // });

  // it('should create a new accommodation successfully', async () => {
  //   const newAccommodation = {
  //     BookingReference: 'BR123',
  //     HotelName: 'Test Hotel',
  //     Address: 'Test Address',
  //     Room: '101',
  //     CheckIn: '2024-08-01',
  //     CheckOut: '2024-08-05',
  //     NumberOfNight: 4,
  //     Cost: 200,
  //     Notes: 'Test Notes',
  //     FundingAccount: ['FA123'],
  //     Trip: ['trip123']
  //   };

  //   const response = await request(server).post(`/accommodation/trip123`).send(newAccommodation);
  //   expect(response.status).toBe(201);
  //   expect(response.body).toHaveProperty('message', 'Accommodation created successfully');
  // });

  it('should return 500 for failed accommodation creation', async () => {
    jest.spyOn(require('../models/airtable'), 'createRecord').mockImplementation(() => {
      throw new Error('Mocked error');
    });

    const newAccommodation = {
      BookingReference: 'BR123',
      HotelName: 'Test Hotel',
      Address: 'Test Address',
      Room: '101',
      CheckIn: '2024-08-01',
      CheckOut: '2024-08-05',
      NumberOfNight: 4,
      Cost: 200,
      Notes: 'Test Notes',
      FundingAccount: ['FA123'],
      Trip: ['trip123']
    };

    const response = await request(server).post(`/accommodation/trip123`).send(newAccommodation);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Failed to create accommodation');
  });

  // it('should update an accommodation successfully', async () => {
  //   const mockId = 'validID'; 
  //   const updatedAccommodation = {
  //     BookingReference: 'BR456',
  //     HotelName: 'Updated Hotel',
  //     Address: 'Updated Address',
  //     Room: '202',
  //     CheckIn: '2024-08-06',
  //     CheckOut: '2024-08-10',
  //     NumberOfNight: 4,
  //     Cost: 300,
  //     Notes: 'Updated Notes',
  //     FundingAccount: ['FA456'],
  //     Trip: ['trip123']
  //   };

  //   const response = await request(server).put(`/accommodation/${mockId}`).send(updatedAccommodation);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('message', 'Accommodation updated successfully');
  // });

  it('should return 500 for failed accommodation update', async () => {

    jest.spyOn(require('../models/airtable'), 'updateRecord').mockImplementation(() => {
      throw new Error('Mocked error');
    });

    const mockId = 'validID'; 
    const updatedAccommodation = {
      BookingReference: 'BR456',
      HotelName: 'Updated Hotel',
      Address: 'Updated Address',
      Room: '202',
      CheckIn: '2024-08-06',
      CheckOut: '2024-08-10',
      NumberOfNight: 4,
      Cost: 300,
      Notes: 'Updated Notes',
      FundingAccount: ['FA456'],
      Trip: ['trip123']
    };

    const response = await request(server).put(`/accommodation/${mockId}`).send(updatedAccommodation);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Failed to update accommodation');
  });

  // it('should delete an accommodation successfully', async () => {
  //   const mockId = 'validID'; 

  //   const response = await request(server).delete(`/accommodation/${mockId}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('message', 'Accommodation deleted successfully');
  // });

  it('should return 500 for failed accommodation deletion', async () => {

    jest.spyOn(require('../models/airtable'), 'deleteRecords').mockImplementation(() => {
      throw new Error('Mocked error');
    });

    const mockId = 'validID'; 
    const response = await request(server).delete(`/accommodation/${mockId}`);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Failed to delete accommodation');
  });

  afterAll(() => {
    server.close(); 
  });
});
