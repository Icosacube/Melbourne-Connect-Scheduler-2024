import axios from 'axios';
import dayjs from 'dayjs';
import {
    getAllFlights,
    getFlightsByTripID,
    createFlight,
    updateFlight,
    deleteFlight,
    defaultFlight
} from '../../../scripts/flight/functions'; 
import { Flight as FlightFrontend } from '../../../types/frontendTypes';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Flight Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {}); 
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getAllFlights', () => {
        it('should fetch and format all flights correctly', async () => {
            const mockFlightData = [
                {
                    id: 'flight1',
                    FlightReference: 'FR123',
                    Airline: 'Test Airline',
                    FlightNumber: '1234',
                    DepartureFrom: 'Test City',
                    ArrivedTo: 'Destination City',
                    DepartDate: '2024-06-01T12:00:00Z',
                    ArriveDate: '2024-06-01T16:00:00Z',
                    Cost: 500,
                    Trip: ['trip1'],
                    FundingAccount: ['FA123'],
                    ReturnFlight: []
                }
            ];

            mockedAxios.get.mockResolvedValue({ data: mockFlightData });

            const result = await getAllFlights();

            expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLIGHT_API_PATH}`);
            expect(result).toEqual([
                {
                    RecordID: 'flight1',
                    FlightReference: 'FR123',
                    Airline: 'Test Airline',
                    FlightNumber: '1234',
                    DepartureFrom: 'Test City',
                    ArrivedTo: 'Destination City',
                    DepartDate: dayjs('2024-06-01T12:00:00Z'),
                    ArriveDate: dayjs('2024-06-01T16:00:00Z'),
                    Cost: 500,
                    Trip: ['trip1'],
                    FundingAccount: ['FA123'],
                    ReturnFlight: []
                }
            ]);
        });

        it('should handle errors and return an empty array', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getAllFlights();

            expect(result).toEqual([]);
            expect(console.error).toHaveBeenCalledWith('Error fetching all flights:', expect.any(Error));
        });
    });

    describe('getFlightsByTripID', () => {
        it('should fetch and format flights for a specific trip ID', async () => {
            const mockFlightData = [
                {
                    id: 'flight1',
                    FlightReference: 'FR123',
                    Airline: 'Test Airline',
                    FlightNumber: '1234',
                    DepartureFrom: 'Test City',
                    ArrivedTo: 'Destination City',
                    DepartDate: '2024-06-01T12:00:00Z',
                    ArriveDate: '2024-06-01T16:00:00Z',
                    Cost: 500,
                    Trip: ['trip1'],
                    FundingAccount: ['FA123'],
                    ReturnFlight: []
                }
            ];

            mockedAxios.get.mockResolvedValue({ data: mockFlightData });

            const result = await getFlightsByTripID('trip1');

            expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLIGHT_API_PATH}/trip1`);
            expect(result).toEqual([
                {
                    RecordID: 'flight1',
                    FlightReference: 'FR123',
                    Airline: 'Test Airline',
                    FlightNumber: '1234',
                    DepartureFrom: 'Test City',
                    ArrivedTo: 'Destination City',
                    DepartDate: dayjs('2024-06-01T12:00:00Z'),
                    ArriveDate: dayjs('2024-06-01T16:00:00Z'),
                    Cost: 500,
                    Trip: ['trip1'],
                    FundingAccount: ['FA123'],
                    ReturnFlight: []
                }
            ]);
        });

        it('should handle errors and return an empty array', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getFlightsByTripID('trip1');

            expect(result).toEqual([]);
          
        });
    });

    describe('createFlight', () => {
        const newFlight: FlightFrontend = {
            ...defaultFlight,
            FlightReference: 'FR456',
            Airline: 'New Airline',
            FlightNumber: '5678',
            DepartureFrom: 'New City',
            ArrivedTo: 'New Destination',
            DepartDate: dayjs('2024-07-01T10:00:00Z'),
            ArriveDate: dayjs('2024-07-01T14:00:00Z'),
            Cost: 600,
            Trip: ['trip1'],
            FundingAccount: ['FA123']
        };

        it('should create a new flight successfully', async () => {
            mockedAxios.post.mockResolvedValue({ status: 201 });

            const result = await createFlight(newFlight);

            expect(mockedAxios.post).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLIGHT_API_PATH}/trip1`,
                expect.any(Object) 
            );
            expect(result).toBe(201);
        });
    });

    describe('updateFlight', () => {
        const updatedFlight: FlightFrontend = {
            ...defaultFlight,
            RecordID: 'flight1',
            FlightReference: 'FR789',
            Airline: 'Updated Airline',
            FlightNumber: '7890',
            DepartureFrom: 'Updated City',
            ArrivedTo: 'Updated Destination',
            DepartDate: dayjs('2024-08-01T08:00:00Z'),
            ArriveDate: dayjs('2024-08-01T12:00:00Z'),
            Cost: 700,
            Trip: ['trip1'],
            FundingAccount: ['FA456']
        };

        it('should update a flight successfully', async () => {
            mockedAxios.put.mockResolvedValue({ status: 200 });

            const result = await updateFlight(updatedFlight);

            expect(mockedAxios.put).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLIGHT_API_PATH}/flight1`,
                expect.any(Object) 
            );
            expect(result).toBe(200);
        });
    });

    describe('deleteFlight', () => {
        it('should delete a flight successfully', async () => {
            mockedAxios.delete.mockResolvedValue({ status: 200 });

            const result = await deleteFlight('flight1');

            expect(mockedAxios.delete).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLIGHT_API_PATH}/flight1`
            );
            expect(result).toBe(200);
        });
        
        it('should handle errors when deleting a flight', async () => {

            mockedAxios.delete.mockRejectedValue(new Error('Network error'));
    
            await expect(deleteFlight('flight1')).rejects.toThrow('Network error');
        });;
    });
});
