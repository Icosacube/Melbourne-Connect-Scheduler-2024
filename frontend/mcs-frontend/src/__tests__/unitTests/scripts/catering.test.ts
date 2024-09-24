import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import {
    getCateringByEventID,
    createCatering,
    updateCateringByID,
    deleteCateringByID,
    defaultCatering,
} from '../../../scripts/catering/functions'
import { Catering } from '../../../types/frontendTypes'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Catering Service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        process.env.REACT_APP_BACKEND_URL = 'http://test-api.com'
        process.env.REACT_APP_CATERING_API_PATH = '/catering'
    })

    describe('getCateringByEventID', () => {
        it('should fetch catering for a specific event ID', async () => {
            const mainEventId = 'event123'
            const mockData = [
                {
                    id: 'catering1',
                    BookingReference: 'BR123',
                    MainEvent: ['event123'],
                    Description: 'Test catering',
                    Cost: 500,
                    ExpenseDate: '2024-04-30',
                    FundingAccount: ['account1'],
                    Finance: ['finance1'],
                },
                {
                    id: 'catering2',
                    BookingReference: 'BR456',
                    MainEvent: ['event456'],
                    Description: 'Another catering',
                    Cost: 300,
                    ExpenseDate: '2024-05-01',
                    FundingAccount: ['account2'],
                    Finance: ['finance2'],
                },
            ]
            mockedAxios.get.mockResolvedValue({ data: mockData })

            const result = await getCateringByEventID(mainEventId)

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CATERING_API_PATH}`
            )
            expect(result).toHaveLength(1)
            expect(result[0].RecordID).toBe('catering1')
            expect(result[0].MainEvent).toContain(mainEventId)
        })

        it('should handle errors and return an empty array', async () => {
            const mainEventId = 'event123'
            mockedAxios.get.mockRejectedValue(new Error('Network error'))

            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

            const result = await getCateringByEventID(mainEventId)

            expect(result).toEqual([])
            expect(consoleErrorSpy).toHaveBeenCalled()
            consoleErrorSpy.mockRestore()
        })
    })

    describe('createCatering', () => {
        const newCatering: Catering = {
            ...defaultCatering,
            BookingReference: 'BR123',
            Description: 'Test catering',
            Cost: 500,
            ExpenseDate: dayjs(),
            FundingAccount: ['account1'],
            MainEvent: [],
            Finance: ['finance1'],
        }

        it('should create a catering entry successfully', async () => {
            const id = 'event123'
            const expectedData = {
                BookingReference: 'BR123',
                Description: 'Test catering',
                Cost: 500,
                ExpenseDate: dayjs().format('YYYY-MM-DD'),
                FundingAccount: ['account1'],
                MainEvent: ['event123'],
                Finance: ['finance1'],
            }
            mockedAxios.post.mockResolvedValue({ data: newCatering })

            const result = await createCatering(newCatering, id)

            expect(mockedAxios.post).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CATERING_API_PATH}`,
                expectedData
            )
            expect(result).toEqual(newCatering)
        })

        it('should handle errors when creating catering', async () => {
            const id = 'event123'
            mockedAxios.post.mockRejectedValue(new Error('Network error'))

            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

            await expect(createCatering(newCatering, id)).rejects.toThrow('Network error')
            expect(consoleErrorSpy).toHaveBeenCalled()
            consoleErrorSpy.mockRestore()
        })
    })

    describe('updateCateringByID', () => {
        const updatedCatering: Catering = {
            ...defaultCatering,
            RecordID: 'catering1',
            BookingReference: 'BR123',
            Description: 'Updated catering',
            Cost: 600,
            ExpenseDate: dayjs(),
            FundingAccount: ['account1'],
            MainEvent: ['event123'],
            Finance: ['finance1'],
        }

        it('should update a catering entry successfully', async () => {
            const expectedData = {
                BookingReference: 'BR123',
                Description: 'Updated catering',
                Cost: 600,
                ExpenseDate: dayjs().format('YYYY-MM-DD'),
                FundingAccount: ['account1'],
                MainEvent: ['event123'],
                Finance: ['finance1'],
            }
            mockedAxios.put.mockResolvedValue({ status: 200 })

            const result = await updateCateringByID(updatedCatering)

            expect(mockedAxios.put).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CATERING_API_PATH}/${updatedCatering.RecordID}`,
                expectedData
            )
            expect(result.status).toBe(200)
        })

        it('should handle errors when updating catering', async () => {
            mockedAxios.put.mockRejectedValue(new Error('Network error'))

            await expect(updateCateringByID(updatedCatering)).rejects.toThrow('Network error')
        })
    })

    describe('deleteCateringByID', () => {
        const cateringID = 'catering1'

        it('should delete a catering entry successfully', async () => {
            mockedAxios.delete.mockResolvedValue({ status: 200 })

            const status = await deleteCateringByID(cateringID)

            expect(mockedAxios.delete).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_CATERING_API_PATH}/${cateringID}`
            )
            expect(status).toBe(200)
        })

        it('should handle errors when deleting catering', async () => {
            mockedAxios.delete.mockRejectedValue(new Error('Network error'))

            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

            await expect(deleteCateringByID(cateringID)).rejects.toThrow('Network error')
            expect(consoleErrorSpy).toHaveBeenCalled()
            consoleErrorSpy.mockRestore()
        })
    })
})
