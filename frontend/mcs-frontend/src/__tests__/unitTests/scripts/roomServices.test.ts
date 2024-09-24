import axios from 'axios';
import {
    getRoomServicesByEventID,
    createRoomService,
    updateRoomServiceByID,
    deleteRoomServiceByID,
    defaultRoomService
} from '../../../scripts/roomServices/functions'; 
import dayjs from 'dayjs';
import { Service } from '../../../types/frontendTypes';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Room Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getRoomServicesByEventID', () => {
        it('should fetch and format room services correctly by event ID', async () => {
            const mockRoomServices = [
                {
                    id: 'service1',
                    Cost: 100,
                    ServiceDescription: 'Room Cleaning',
                    Notes: 'Cleaning',
                    ExpenseDate: '2024-06-01',
                    FundingAccount: ['FA123'],
                    MainEvent: ['event123'],
                    Finance: []
                }
            ];

            mockedAxios.get.mockResolvedValue({ data: mockRoomServices });

            const result = await getRoomServicesByEventID('event123');

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SERVICE_API_PATH}`
            );

            expect(result).toEqual([
                {
                    ...defaultRoomService,
                    RecordID: 'service1',
                    Cost: 100,
                    ServiceDescription: 'Room Cleaning',
                    Notes: 'Cleaning',
                    ExpenseDate: dayjs('2024-06-01'),
                    FundingAccount: ['FA123'],
                    MainEvent: ['event123'],
                    Finance: []
                }
            ]);
        });

        it('should handle errors and return an empty array', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getRoomServicesByEventID('event123');

            expect(result).toEqual([]);
            // expect(console.error).toHaveBeenCalledWith(
            //     'Error fetching room services:',
            //     expect.any(Error)
            // );
        });
    });

    describe('createRoomService', () => {
        const newRoomService: Service = {
            ...defaultRoomService,
            Cost: 150,
            ServiceDescription: 'New Room Service',
            MainEvent: ['event123']
        };

        it('should create a room service successfully', async () => {
            mockedAxios.post.mockResolvedValue({ data: { ...newRoomService } });

            const result = await createRoomService(newRoomService, 'event123');

            expect(mockedAxios.post).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SERVICE_API_PATH}`,
                expect.any(Object) // Expect any formatted object
            );
            expect(result).toEqual(newRoomService);
        });

        it('should handle errors while creating a room service', async () => {
            mockedAxios.post.mockRejectedValue(new Error('Network error'));

            await expect(createRoomService(newRoomService, 'event123')).rejects.toThrow('Network error');
     
        });
    });

    describe('updateRoomServiceByID', () => {
        const updatedRoomService: Service = {
            ...defaultRoomService,
            RecordID: 'service1',
            Cost: 200,
            ServiceDescription: 'Updated Room Service',
            MainEvent: ['event123']
        };

        it('should update a room service successfully', async () => {
            mockedAxios.put.mockResolvedValue({ status: 200 });

            const result = await updateRoomServiceByID(updatedRoomService);

            expect(mockedAxios.put).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SERVICE_API_PATH}/service1`,
                expect.any(Object)
            );
            expect(result.status).toBe(200);
        });

        it('should handle errors while updating a room service', async () => {
            mockedAxios.put.mockRejectedValue(new Error('Network error'));

            await expect(updateRoomServiceByID(updatedRoomService)).rejects.toThrow('Network error');
          
        });
    });

    describe('deleteRoomServiceByID', () => {
        it('should delete a room service successfully', async () => {
            mockedAxios.delete.mockResolvedValue({ status: 204 });

            const result = await deleteRoomServiceByID('service1');

            expect(mockedAxios.delete).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SERVICE_API_PATH}/service1`
            );
            expect(result).toBe(204);
        });
        it('should handle errors while deleting a room service', async () => {
            const mockError = new Error('Network error');
            mockedAxios.delete.mockRejectedValue(mockError);
    
            await expect(deleteRoomServiceByID('service1')).rejects.toThrow('Network error');
  
        });
    });
});
