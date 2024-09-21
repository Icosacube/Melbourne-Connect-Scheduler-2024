import axios from 'axios';
import {
    getAllVenues,
    getVenueById,
    getVenueByMainEventId,
    createVenue,
    updateVenue,
    deleteVenue,
    defaultVenue
} from '../../../scripts/venue/functions'; 
import { Venue } from '../../../types/frontendTypes';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Venue Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.REACT_APP_BACKEND_URL = 'http://test-api.com';
        process.env.REACT_APP_VENUE_API_PATH = '/venues';
    });

    describe('getAllVenues', () => {
        it('should fetch and format all venues', async () => {
            const mockData = [
                { id: '1', VenueName: 'Venue 1', Location: 'Location 1' },
                { id: '2', VenueName: 'Venue 2', Location: 'Location 2' }
            ];
            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await getAllVenues();

            expect(mockedAxios.get).toHaveBeenCalledWith('http://test-api.com/venues');
            expect(result).toHaveLength(2);
            expect(result[0].RecordID).toBe('1');
            expect(result[0].VenueName).toBe('Venue 1');
        });

        it('should return an empty array on error', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getAllVenues();

            expect(result).toEqual([]);
        });
    });

    describe('getVenueById', () => {
        it('should fetch and format a venue by ID', async () => {
            const mockData = { id: '1', VenueName: 'Venue 1', Location: 'Location 1' };
            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await getVenueById('1');

            expect(mockedAxios.get).toHaveBeenCalledWith('http://test-api.com/venues/1');
            expect(result.RecordID).toBe('1');
            expect(result.VenueName).toBe('Venue 1');
        });

        it('should return an empty object on error', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getVenueById('1');

            expect(result).toEqual({});
        });
    });

    describe('getVenueByMainEventId', () => {
        it('should fetch and format venues by main event ID', async () => {
            const mockData = [
                { id: '1', VenueName: 'Venue 1', MainEvent: ['event1'] },
                { id: '2', VenueName: 'Venue 2', MainEvent: ['event1'] }
            ];
            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await getVenueByMainEventId('event1');

            expect(mockedAxios.get).toHaveBeenCalledWith('http://test-api.com/venues');
            expect(result).toHaveLength(2);
            expect(result[0].MainEvent).toContain('event1');
        });

        it('should return an empty array on error', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getVenueByMainEventId('event1');

            expect(result).toEqual([]);
        });
    });

    describe('createVenue', () => {
        it('should create a venue successfully', async () => {
            const newVenue: Venue = {
                ...defaultVenue,
                VenueName: 'New Venue',
                Location: 'New Location'
            };
            const mockResponse = { data: { ...newVenue, RecordID: '3' } };
            mockedAxios.post.mockResolvedValue(mockResponse);

            const result = await createVenue(newVenue);

            expect(mockedAxios.post).toHaveBeenCalledWith('http://test-api.com/venues', {
                VenueName: 'New Venue',
                Location: 'New Location'
            });
            expect(result.RecordID).toBe('3');
        });

        it('should return an empty object on error', async () => {
            mockedAxios.post.mockRejectedValue(new Error('Network error'));

            const result = await createVenue(defaultVenue);

            expect(result).toEqual({});
        });
    });

    describe('updateVenue', () => {
        it('should update a venue successfully', async () => {
            const updatedVenue: Venue = {
                ...defaultVenue,
                RecordID: '1',
                VenueName: 'Updated Venue',
                Location: 'Updated Location'
            };
            const mockResponse = { data: updatedVenue };
            mockedAxios.put.mockResolvedValue(mockResponse);

            const result = await updateVenue(updatedVenue);

            expect(mockedAxios.put).toHaveBeenCalledWith('http://test-api.com/venues/1', {
                VenueName: 'Updated Venue',
                Location: 'Updated Location'
            });
            expect(result.VenueName).toBe('Updated Venue');
        });

        it('should return an empty object on error', async () => {
            mockedAxios.put.mockRejectedValue(new Error('Network error'));

            const result = await updateVenue(defaultVenue);

            expect(result).toEqual({});
        });
    });

    describe('deleteVenue', () => {
        it('should delete a venue successfully', async () => {
            mockedAxios.delete.mockResolvedValue({ status: 204 });

            const result = await deleteVenue('1');

            expect(mockedAxios.delete).toHaveBeenCalledWith('http://test-api.com/venues/1');
            expect(result).toBe(true);
        });

        it('should return false on error', async () => {
            mockedAxios.delete.mockRejectedValue(new Error('Network error'));

            const result = await deleteVenue('1');

            expect(result).toBe(false);
        });
    });
});
