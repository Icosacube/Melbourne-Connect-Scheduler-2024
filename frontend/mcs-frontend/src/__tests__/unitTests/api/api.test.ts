import axios from 'axios';
import { getSpeakers } from '../../api/axios'; 

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getSpeakers function', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should fetch speakers successfully', async () => {
    // Mock data
    const mockSpeakers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];

    // Mock the axios instance and its get method
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockSpeakers })
    } as any);

    // Call the function
    const result = await getSpeakers();

    // Assertions
    expect(result).toEqual(mockSpeakers);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL
    });
    expect(mockedAxios.create().get).toHaveBeenCalledWith('/1');
  });

  it('should handle errors when fetching speakers', async () => {
    // Mock error
    const mockError = new Error('Network error');

    // Mock the axios instance and its get method to throw an error
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockRejectedValue(mockError)
    } as any);

    // Call the function and expect it to throw
    await expect(getSpeakers()).rejects.toThrow('Network error');

    // Assertions
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL
    });
    expect(mockedAxios.create().get).toHaveBeenCalledWith('/1');
    expect(console.error).toHaveBeenCalledWith('Error fetching data:', mockError);
  });
});