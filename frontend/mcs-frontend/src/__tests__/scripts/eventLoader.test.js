import axios from 'axios';
import { loader } from './eventLoader';
import dayjs from 'dayjs';

jest.mock('axios');

describe('eventLoader', () => {
    test('successfully loads an event', async () => {
        const mockEvents = [
            { id: 1, title: 'Event 1', date: '2024-08-01', speakers: ['Speaker 1'] },
            { id: 2, title: 'Event 2', date: '2024-08-02', speakers: null },
        ];
        axios.get.mockResolvedValue({ data: mockEvents });

        const result = await loader({ params: { id: 1 } });
        expect(result).toEqual({
            id: 1,
            title: 'Event 1',
            date: expect.any(dayjs),
            speakers: ['Speaker 1'],
        });
    });

    test('handles event not found', async () => {
        const mockEvents = [{ id: 1, title: 'Event 1', date: '2024-08-01' }];
        axios.get.mockResolvedValue({ data: mockEvents });

        const result = await loader({ params: { id: 2 } });
        expect(result).toBeUndefined();
    });

    test('handles errors', async () => {
        axios.get.mockRejectedValue(new Error('Network error'));

        const result = await loader({ params: { id: 1 } });
        expect(result).toBeNull();
    });
});