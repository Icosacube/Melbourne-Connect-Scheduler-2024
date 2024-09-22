import axios from 'axios';
import { getAllFinance, defaultFinance } from '../../../scripts/finance/function'; 
import { Finance } from '../../../types/frontendTypes';
import dayjs from 'dayjs';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Finance Service', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks(); 
    });

    describe('getAllFinance', () => {
        it('should fetch and format all finance records correctly', async () => {
    
            const mockFinanceData = [
                {
                    id: 'finance1',
                    BelongTo: ['event1'],
                    ExpenseCategory: 'Travel',
                    ExpenseDescription: 'Airfare',
                    Cost: 500,
                    ExpenseDate: '2024-06-01',
                    FundingAccount: 'FA12345',
                },
                {
                    id: 'finance2',
                    BelongTo: ['event2'],
                    ExpenseCategory: 'Accommodation',
                    ExpenseDescription: 'Hotel stay',
                    Cost: 1000,
                    ExpenseDate: '2024-07-01',
                    FundingAccount: 'FA67890',
                },
            ];

        
            mockedAxios.get.mockResolvedValue({ data: mockFinanceData });

            const result = await getAllFinance();

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}/finance`
            );

            expect(result).toEqual([
                {
                    RecordID: 'finance1',
                    MainEventID: 'event1',
                    ExpenseCategory: 'Travel',
                    ExpenseDescription: 'Airfare',
                    Cost: 500,
                    ExpenseDate: dayjs('2024-06-01'),
                    FundingAccount: 'FA12345',
                },
                {
                    RecordID: 'finance2',
                    MainEventID: 'event2',
                    ExpenseCategory: 'Accommodation',
                    ExpenseDescription: 'Hotel stay',
                    Cost: 1000,
                    ExpenseDate: dayjs('2024-07-01'),
                    FundingAccount: 'FA67890',
                },
            ]);
        });

        it('should handle errors and return an empty array', async () => {
         
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getAllFinance();

            expect(result).toEqual([]);

            expect(console.error).toHaveBeenCalledWith(
                'Error fetching all finance records:',
                expect.any(Error)
            );
        });
    });
});
