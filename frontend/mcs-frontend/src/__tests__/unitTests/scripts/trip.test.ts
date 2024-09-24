import axios from 'axios';
import {
    getAllTrips,
    getTripById,
    getTripsBySpeakerId,
    createTrip,
    updateTrip,
    deleteTrip,
    defaultTrip
} from '../../../scripts/trip/functions';
import { Trip as TripFrontend } from '../../../types/frontendTypes';
import dayjs from 'dayjs';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Trip Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.REACT_APP_BACKEND_URL = 'http://test-api.com';
        process.env.REACT_APP_TRIP_API_PATH = '/trips';
    });

    describe('getAllTrips', () => {
        it('should fetch and format all trips', async () => {
            const mockData = [
                { id: '1', StartDate: '2024-01-01', EndDate: '2024-01-10' },
                { id: '2', StartDate: '2024-02-01', EndDate: '2024-02-10' }
            ];
            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await getAllTrips();

            expect(mockedAxios.get).toHaveBeenCalledWith('http://test-api.com/trips');
            expect(result).toHaveLength(2);
            expect(result[0].RecordID).toBe('1');
            expect(result[1].StartDate).toEqual(dayjs('2024-02-01'));
        });

        it('should return an empty array on error', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getAllTrips();

            expect(result).toEqual([]);
        });
    });

    describe('getTripById', () => {
        it('should fetch and format a trip by ID', async () => {
            const mockData = { id: '1', StartDate: '2024-01-01', EndDate: '2024-01-10' };
            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await getTripById('1');

            expect(mockedAxios.get).toHaveBeenCalledWith('http://test-api.com/trips/1');
            expect(result.RecordID).toBe('1');
            expect(result.StartDate).toEqual(dayjs('2024-01-01'));
        });

        it('should return an empty object on error', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getTripById('1');

            expect(result).toEqual({});
        });
    });

    describe('getTripsBySpeakerId', () => {
        it('should fetch and format trips by speaker ID', async () => {
            const mockData = [
                { id: '1', GuestSpeaker: ['speaker1'], StartDate: '2024-01-01', EndDate: '2024-01-10' },
                { id: '2', GuestSpeaker: ['speaker1'], StartDate: '2024-02-01', EndDate: '2024-02-10' }
            ];
            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await getTripsBySpeakerId('speaker1');

            expect(mockedAxios.get).toHaveBeenCalledWith('http://test-api.com/trips/speaker1');
            expect(result).toHaveLength(2);
            expect(result[0].GuestSpeaker).toContain('speaker1');
        });

        it('should return an empty array on error', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getTripsBySpeakerId('speaker1');

            expect(result).toEqual([]);
        });
    });

    describe('createTrip', () => {
        it('should create a new trip successfully', async () => {
            const newTrip: TripFrontend = {
                ...defaultTrip,
                GuestSpeaker: ['speaker1'],
                StartDate: dayjs('2024-03-01'),
                EndDate: dayjs('2024-03-10')
            };
            mockedAxios.post.mockResolvedValue({ status: 201 });

            const result = await createTrip(newTrip);

            expect(mockedAxios.post).toHaveBeenCalledWith('http://test-api.com/trips', {
                StartDate: '2024-03-01',
                EndDate: '2024-03-10',
                GuestSpeaker: ['speaker1'],
                MainEvent: [],
                Accommodation: [],
                Flight: [],
                Miscellaneous: [],
                AcademicCanvassing: [],
                Completed: false
            });
            expect(result).toBe(201);
        });

        it('should handle errors when creating a trip', async () => {
            mockedAxios.post.mockRejectedValue(new Error('Network error'));

            await expect(createTrip(defaultTrip)).rejects.toThrow('Network error');
        });
    });

    describe('updateTrip', () => {
        it('should update an existing trip successfully', async () => {
            const updatedTrip: TripFrontend = {
                ...defaultTrip,
                RecordID: '1',
                StartDate: dayjs('2024-03-01'),
                EndDate: dayjs('2024-03-10')
            };
            mockedAxios.put.mockResolvedValue({ status: 200 });

            const result = await updateTrip(updatedTrip);

            expect(mockedAxios.put).toHaveBeenCalledWith('http://test-api.com/trips/1', {
                StartDate: '2024-03-01',
                EndDate: '2024-03-10',
                GuestSpeaker: [],
                MainEvent: [],
                Accommodation: [],
                Flight: [],
                Miscellaneous: [],
                AcademicCanvassing: [],
                Completed: false
            });
            expect(result).toBe(200);
        });

        it('should handle errors when updating a trip', async () => {
            mockedAxios.put.mockRejectedValue(new Error('Network error'));

            await expect(updateTrip(defaultTrip)).rejects.toThrow('Network error');
        });
    });

    describe('deleteTrip', () => {
        it('should delete a trip successfully', async () => {
            mockedAxios.delete.mockResolvedValue({ status: 204 });

            const result = await deleteTrip('1');

            expect(mockedAxios.delete).toHaveBeenCalledWith('http://test-api.com/trips/1');
            expect(result).toBe(204);
        });

        it('should handle errors when deleting a trip', async () => {
            mockedAxios.delete.mockRejectedValue(new Error('Network error'));

            await expect(deleteTrip('1')).rejects.toThrow('Network error');
        });
    });
});
