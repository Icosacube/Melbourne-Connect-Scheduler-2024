import axios from 'axios';
import { getSpeakers } from './axios';

jest.mock('axios');

describe('axios', () => {
    test('getSpeakers fetches data successfully', async () => {
        const mockData = { speakers: ['Speaker 1', 'Speaker 2'] };
        axios.create.mockReturnValue({
            get: jest.fn().mockResolvedValue({ data: mockData }),
        });

        const result = await getSpeakers();
        expect(result).toEqual(mockData);
    });

    test('getSpeakers handles errors', async () => {
        const mockError = new Error('Network error');
        axios.create.mockReturnValue({
            get: jest.fn().mockRejectedValue(mockError),
        });

        await expect(getSpeakers()).rejects.toThrow('Network error');
    });
});