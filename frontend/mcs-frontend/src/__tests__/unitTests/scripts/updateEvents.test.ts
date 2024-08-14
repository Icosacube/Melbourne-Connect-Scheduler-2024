import axios from 'axios';
import updateEvent from '../../../scripts/event/updateEvent';
import { MainEvent } from '../../../types/frontendTypes';
import dayjs from 'dayjs';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('updateEvent', () => {
  const mockEvent: MainEvent = {
    EventName: 'Updated Event',
    RecordID: '',
    EventAbstract: '',
    EventDescription: '',
    EventbriteLink: '',
    EventBanner: '',
    Date: dayjs(),
    Notes: '',
    Speaker: [],
    GuestAcademic: [],
    Catering: [],
    Venue: [],
    Service: [],
    Completed: false,
    Trip: [],
    SubEvent: []
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