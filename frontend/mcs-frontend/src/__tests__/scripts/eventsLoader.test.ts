import axios from 'axios';
import dayjs from 'dayjs';
import { loader } from '../../scripts/eventsLoader';
import { Event, EventStatus } from '../../types/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('eventsLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REACT_APP_BACKEND_URL = 'http://test-api.com';
  });

  it('should load events successfully', async () => {
    const mockEvents: Event[] = [
      { id: '1', name: 'Event 1', date: dayjs(), status: EventStatus.Preparation, speakers: [], venue: [] },
      { id: '2', name: 'Event 2', date: dayjs(), status: EventStatus.Ongoing, speakers: [], venue: [] }
    ];
    mockedAxios.get.mockResolvedValue({ data: mockEvents });

    const result = await loader();

    expect(mockedAxios.get).toHaveBeenCalledWith('http://test-api.com/event');
    expect(result).toEqual(mockEvents);
  });

  it('should handle errors', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    const result = await loader();

    expect(result).toEqual({});
  });
});