import axios from 'axios';
import { loader } from './eventsLoader';

jest.mock('axios');

describe('eventsLoader', () => {
    test('successfully loads events', async () => {
        const mockEvents = [
            { id: 1, title: 'Event 1', date: '2024-08-01' },
            { id: 2, title: 'Event 2', date: '2024-08-02' },
        ];
        axios.get.mockResolvedValue({ data: mockEvents });

        const result = await loader();
        expect(result).toEqual([
            { id: 1, title: 'Event 1', date: expect.any(Date) },
            { id: 2, title: 'Event 2', date: expect.any(Date) },
        ]);
    });

    test('handles errors', async () => {
        axios.get.mockRejectedValue(new Error('Network error'));

        const result = await loader();
        expect(result).toEqual({});
    });
});