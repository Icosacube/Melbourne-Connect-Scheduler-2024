import axios from 'axios';
import updateEvent from './updateEvent';

jest.mock('axios');

describe('updateEvent', () => {
    test('successfully updates an event', async () => {
        const mockEvent = { id: 1, title: 'Updated Event', date: '2024-08-01' };
        const mockResponse = { status: 200 };
        axios.put.mockResolvedValue(mockResponse);

        const result = await updateEvent(mockEvent);
        expect(result).toBe(200);
        expect(axios.put).toHaveBeenCalledWith(
            `${process.env.REACT_APP_BACKEND_URL}/event/1`,
            mockEvent
        );
    });

    test('handles errors when updating an event', async () => {
        const mockEvent = { id: 1, title: 'Updated Event', date: '2024-08-01' };
        const mockError = new Error('Network error');
        axios.put.mockRejectedValue(mockError);

        await expect(updateEvent(mockEvent)).rejects.toThrow('Network error');
    });
});