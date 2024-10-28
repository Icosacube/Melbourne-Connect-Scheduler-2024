import axios from 'axios'
import dayjs from 'dayjs'
import {
    getAllFundingAccounts,
    getFundingAccountByID,
} from '../../../scripts/fundingAccount/functions'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('FundingAccount Service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    describe('getAllFundingAccounts', () => {
        it('should fetch and format all funding accounts correctly', async () => {
            const mockFundingAccountsData = [
                {
                    id: 'account1',
                    ThemisString: 'ABC123',
                    Description: 'Test Account',
                    AccountUser: 'User1',
                    AccountType: 'Type1',
                    Notes: 'Sample Notes',
                    Limit: 1000,
                    ExpiryDate: '2024-12-31',
                    Accommodation: [],
                    Miscellaneous: [],
                    Venue: [],
                    Catering: [],
                    Flight: [],
                    Service: [],
                },
            ]

            mockedAxios.get.mockResolvedValue({ data: mockFundingAccountsData })

            const result = await getAllFundingAccounts()

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FUNDINGACCOUNT_API_PATH}`
            )

            expect(result).toEqual([
                {
                    RecordID: 'account1',
                    ThemisString: 'ABC123',
                    Description: 'Test Account',
                    AccountUser: 'User1',
                    AccountType: 'Type1',
                    Notes: 'Sample Notes',
                    Limit: 1000,
                    ExpiryDate: dayjs('2024-12-31'),
                    Accommodation: [],
                    Miscellaneous: [],
                    Venue: [],
                    Catering: [],
                    Flight: [],
                    Service: [],
                },
            ])
        })

        it('should handle errors and return an empty array', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'))

            const result = await getAllFundingAccounts()

            expect(result).toEqual([])
            expect(console.error).toHaveBeenCalledWith(
                'Error fetching all funding accounts:',
                expect.any(Error)
            )
        })
    })

    describe('getFundingAccountByID', () => {
        it('should fetch and format a funding account by ID correctly', async () => {
            const mockFundingAccountData = {
                id: 'account1',
                ThemisString: 'ABC123',
                Description: 'Test Account',
                AccountUser: 'User1',
                AccountType: 'Type1',
                Notes: 'Sample Notes',
                Limit: 1000,
                ExpiryDate: '2024-12-31',
                Accommodation: [],
                Miscellaneous: [],
                Venue: [],
                Catering: [],
                Flight: [],
                Service: [],
            }

            mockedAxios.get.mockResolvedValue({ data: mockFundingAccountData })

            const result = await getFundingAccountByID('account1')

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FUNDINGACCOUNT_API_PATH}/account1`
            )

            expect(result).toEqual({
                RecordID: 'account1',
                ThemisString: 'ABC123',
                Description: 'Test Account',
                AccountUser: 'User1',
                AccountType: 'Type1',
                Notes: 'Sample Notes',
                Limit: 1000,
                ExpiryDate: dayjs('2024-12-31'),
                Accommodation: [],
                Miscellaneous: [],
                Venue: [],
                Catering: [],
                Flight: [],
                Service: [],
            })
        })

        it('should handle errors and return null', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'))

            const result = await getFundingAccountByID('account1')

            expect(result).toBeNull()
            expect(console.error).toHaveBeenCalledWith(
                'Error fetching the funding account:',
                expect.any(Error)
            )
        })
    })
})
