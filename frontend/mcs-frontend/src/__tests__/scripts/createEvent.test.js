import axios from 'axios';
import createEvent from './createEvent';

jest.mock('axios');

describe('createEvent', () => {
    test('successfully creates an event', async () => {
        const mockEvent = { title: 'Test Event', date: '2024-08-01' };
        const mockResponse = { status: 201 };
        axios.post.mockResolvedValue(mockResponse);

        const result = await createEvent(mockEvent);
        expect(result).toBe(201);
        expect(axios.post).toHaveBeenCalledWith(
            `${process.env.REACT_APP_BACKEND_URL}/event`,
            mockEvent
        );
    });

    test('handles errors when creating an event', async () => {
        const mockEvent = { title: 'Test Event', date: '2024-08-01' };
        const mockError = new Error('Network error');
        axios.post.mockRejectedValue(mockError);

        await expect(createEvent(mockEvent)).rejects.toThrow('Network error');
    });
});