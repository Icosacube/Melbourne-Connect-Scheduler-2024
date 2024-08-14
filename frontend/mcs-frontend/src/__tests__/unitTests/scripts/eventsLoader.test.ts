import axios from 'axios';
import dayjs from 'dayjs';
import { loader } from '../../../scripts/event/eventsLoader';
import { MainEvent } from '../../../types/frontendTypes';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('eventsLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REACT_APP_BACKEND_URL = 'http://test-api.com';
  });

  it('should load events successfully', async () => {
    const mockEvents: MainEvent[] = [
      {
        EventName: 'Event 1', Date: dayjs(), Speaker: [], Venue: [],
        RecordID: '',
        EventAbstract: '',
        EventDescription: '',
        EventbriteLink: '',
        EventBanner: '',
        Notes: '',
        GuestAcademic: [],
        Catering: [],
        Service: [],
        Completed: false,
        Trip: [],
        SubEvent: []
      },
      {
        EventName: 'Event 2', Date: dayjs(), Speaker: [], Venue: [],
        RecordID: '',
        EventAbstract: '',
        EventDescription: '',
        EventbriteLink: '',
        EventBanner: '',
        Notes: '',
        GuestAcademic: [],
        Catering: [],
        Service: [],
        Completed: false,
        Trip: [],
        SubEvent: []
      }
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