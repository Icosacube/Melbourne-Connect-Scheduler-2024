import axios from 'axios';
import updateEvent from '../../scripts/updateEvent';
import { Event, EventStatus } from '../../types/types';
import dayjs from 'dayjs';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('updateEvent', () => {
  const mockEvent: Event = {
    id: '1',
    name: 'Updated Event',
    date: dayjs(),
    status: EventStatus.Preparation,
    speakers: [],
    venue: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REACT_APP_BACKEND_URL = 'http://test-api.com';
  });

  it('should update an event successfully', async () => {
    mockedAxios.put.mockResolvedValue({ status: 200 });

    const result = await updateEvent(mockEvent);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      'http://test-api.com/event/1',
      mockEvent
    );
    expect(result).toBe(200);
  });

  it('should handle errors', async () => {
    mockedAxios.put.mockRejectedValue(new Error('Network error'));

    await expect(updateEvent(mockEvent)).rejects.toThrow('Network error');
  });
});