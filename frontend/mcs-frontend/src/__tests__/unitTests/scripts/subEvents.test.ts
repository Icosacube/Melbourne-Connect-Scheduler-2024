import axios from 'axios';
import {
    getSubEventsByMainEventID,
    createSubEvent,
    updateSubEventByID,
    deleteSubEventByID,
    defaultSubEvent
} from '../../../scripts/subevent/functions'; 
import { SubEvent } from '../../../types/frontendTypes';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SubEvent Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.REACT_APP_BACKEND_URL = 'http://test-api.com';
        process.env.REACT_APP_SUBEVENT_API_PATH = '/subEvents';
    });

    describe('getSubEventsByMainEventID', () => {
        it('should fetch and format all sub-events for a main event ID', async () => {
            const mockData = [
                { id: '1', EventName: 'Sub Event 1', MainEvent: ['main1'] },
                { id: '2', EventName: 'Sub Event 2', MainEvent: ['main1'] }
            ];
            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await getSubEventsByMainEventID('main1');

            expect(mockedAxios.get).toHaveBeenCalledWith('http://test-api.com/subEvents');
            expect(result).toHaveLength(2);
            expect(result[0].EventName).toBe('Sub Event 1');
            expect(result[1].MainEvent).toContain('main1');
        });

        it('should return an empty array on error', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getSubEventsByMainEventID('main1');

            expect(result).toEqual([]);
        });
    });

    describe('createSubEvent', () => {
        it('should create a sub-event successfully', async () => {
            const newSubEvent: SubEvent = {
                ...defaultSubEvent,
                EventName: 'Sub Event 1',
                MainEvent: ['main1']
            };
            mockedAxios.post.mockResolvedValue({ data: '1234' });

            const result = await createSubEvent(newSubEvent);

            expect(mockedAxios.post).toHaveBeenCalledWith('http://test-api.com/subEvents', {
                ...newSubEvent,
                RecordID: undefined
            });
            expect(result.RecordID).toBe('1234');
        });

        it('should handle errors when creating a sub-event', async () => {
            mockedAxios.post.mockRejectedValue(new Error('Network error'));

            await expect(createSubEvent(defaultSubEvent)).rejects.toThrow('Network error');
        });
    });

    describe('updateSubEventByID', () => {
        it('should update an existing sub-event successfully', async () => {
            const updatedSubEvent: SubEvent = {
                ...defaultSubEvent,
                RecordID: '1',
                EventName: 'Updated Sub Event',
            };
            mockedAxios.put.mockResolvedValue({ status: 200 });

            const result = await updateSubEventByID(updatedSubEvent);

            expect(mockedAxios.put).toHaveBeenCalledWith('http://test-api.com/subEvents/1', {
                ...updatedSubEvent,
                StartDate: updatedSubEvent.StartDate.toISOString(),
                EndDate: updatedSubEvent.EndDate.toISOString(),
                RecordID: undefined
            });
            expect(result.status).toBe(200);
        });

        it('should handle errors when updating a sub-event', async () => {
            mockedAxios.put.mockRejectedValue(new Error('Network error'));

            await expect(updateSubEventByID(defaultSubEvent)).rejects.toThrow('Network error');
        });
    });

    describe('deleteSubEventByID', () => {
        it('should delete a sub-event successfully', async () => {
            mockedAxios.delete.mockResolvedValue({ status: 204 });

            const result = await deleteSubEventByID('1');

            expect(mockedAxios.delete).toHaveBeenCalledWith('http://test-api.com/subEvents/1');
            expect(result).toBe(204);
        });

        it('should handle errors when deleting a sub-event', async () => {
            mockedAxios.delete.mockRejectedValue(new Error('Network error'));

            await expect(deleteSubEventByID('1')).rejects.toThrow('Network error');
        });
    });
});
