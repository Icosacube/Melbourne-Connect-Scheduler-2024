import axios from 'axios';
import dayjs from 'dayjs';
import { loader } from '../../scripts/eventLoader';
import { Event, EventStatus } from '../../types/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('eventLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REACT_APP_BACKEND_URL = 'http://test-api.com';
  });

  it('should load an event successfully', async () => {
    const mockEvent: Event = {
      id: '1',
      name: 'Test Event',
      date: dayjs(),
      status: EventStatus.Preparation,
      speakers: [],
      venue: []
    };
    mockedAxios.get.mockResolvedValue({ data: [mockEvent] });

    const result = await loader({ params: { id: '1' } } as any);

    expect(mockedAxios.get).toHaveBeenCalledWith('http://test-api.com/event');
    expect(result).toEqual({ ...mockEvent, date: expect.any(dayjs) });
  });

  it('should return null if event is not found', async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    const result = await loader({ params: { id: '1' } } as any);

    expect(result).toBeNull();
  });

  it('should handle errors', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    const result = await loader({ params: { id: '1' } } as any);

    expect(result).toBeNull();
  });
});