// __tests__/accommodationService.test.ts
import axios from 'axios'
import dayjs from 'dayjs'
import {
    getAccomByTripID,
    getAllAccom,
    createAccommodation,
    updateAccom,
    deleteAccom,
} from '../../../scripts/accommodation/functions'
import {
    Accommodation as AccommodationFrontend,
} from '../../../types/frontendTypes'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Accommodation Service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        process.env.REACT_APP_BACKEND_URL = 'http://test-api.com'
        process.env.REACT_APP_ACCOMMODATION_API_PATH = '/accommodation'
    })

    describe('getAccomByTripID', () => {
        it('should fetch accommodations for a specific trip ID', async () => {
            const tripID = 'trip123'
            const mockData = [
                {
                    id: 'accom1',
                    BookingReference: 'BR123',
                    Trip: ['trip123'],
                    CheckIn: '2024-04-30',
                    CheckOut: '2024-05-05',
                },
                {
                    id: 'accom2',
                    BookingReference: 'BR456',
                    Trip: ['trip456'],
                    CheckIn: '2024-05-01',
                    CheckOut: '2024-05-06',
                },
            ]
            mockedAxios.get.mockResolvedValue({ data: mockData })

            const result = await getAccomByTripID(tripID)

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_ACCOMMODATION_API_PATH}`
            )
            expect(result).toHaveLength(1)
            expect(result[0].RecordID).toBe('accom1')
            expect(result[0].Trip).toContain(tripID)
        })

        it('should handle errors and return an empty array', async () => {
            const tripID = 'trip123'
            mockedAxios.get.mockRejectedValue(new Error('Network error'))

            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

            const result = await getAccomByTripID(tripID)

            expect(result).toEqual([])
            expect(consoleErrorSpy).toHaveBeenCalled()
            consoleErrorSpy.mockRestore()
        })
    })

    describe('getAllAccom', () => {
        it('should fetch all accommodations', async () => {
            const mockData = [
                {
                    id: 'accom1',
                    BookingReference: 'BR123',
                    CheckIn: '2024-04-30',
                    CheckOut: '2024-05-05',
                },
                {
                    id: 'accom2',
                    BookingReference: 'BR456',
                    CheckIn: '2024-05-01',
                    CheckOut: '2024-05-06',
                },
            ]
            mockedAxios.get.mockResolvedValue({ data: mockData })

            const result = await getAllAccom()

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_ACCOMMODATION_API_PATH}`
            )
            expect(result).toHaveLength(2)
            expect(result[0].RecordID).toBe('accom1')
            expect(result[1].RecordID).toBe('accom2')
        })

        it('should handle errors and return an empty array', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'))

            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

            const result = await getAllAccom()

            expect(result).toEqual([])
            expect(consoleErrorSpy).toHaveBeenCalled()
            consoleErrorSpy.mockRestore()
        })
    })

    describe('createAccommodation', () => {
        const newAccommodation: AccommodationFrontend = {
            RecordID: '',
            BookingReference: 'BR789',
            HotelName: 'Test Hotel',
            Address: '123 Test St',
            Room: '101',
            CheckIn: dayjs('2024-06-01'),
            CheckOut: dayjs('2024-06-05'),
            NumberOfNight: 4,
            Cost: 500,
            Notes: '',
            FundingAccount: [],
            Trip: [],
        }

        it('should create an accommodation successfully', async () => {
            const expectedData = {
                BookingReference: 'BR789',
                HotelName: 'Test Hotel',
                Address: '123 Test St',
                Room: '101',
                CheckIn: '2024-06-01',
                CheckOut: '2024-06-05',
                Cost: 500,
                Notes: '',
                FundingAccount: [],
                Trip: [],
            }
            mockedAxios.post.mockResolvedValue({ data: newAccommodation })

            const result = await createAccommodation(newAccommodation)

            expect(mockedAxios.post).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_ACCOMMODATION_API_PATH}`,
                expectedData
            )
            expect(result).toEqual(newAccommodation)
        })

        it('should handle errors and return an empty object', async () => {
            mockedAxios.post.mockRejectedValue(new Error('Network error'))

            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

            const result = await createAccommodation(newAccommodation)

            expect(result).toEqual({})
            expect(consoleErrorSpy).toHaveBeenCalled()
            consoleErrorSpy.mockRestore()
        })
    })

    describe('updateAccom', () => {
        const updatedAccommodation: AccommodationFrontend = {
            RecordID: 'accom123',
            BookingReference: 'BR999',
            HotelName: 'Updated Hotel',
            Address: '123 Updated St',
            Room: '202',
            CheckIn: dayjs('2024-07-01'),
            CheckOut: dayjs('2024-07-05'),
            NumberOfNight: 4,
            Cost: 600,
            Notes: '',
            FundingAccount: [],
            Trip: [],
        }

        it('should update an accommodation successfully', async () => {
            const expectedData = {
                BookingReference: 'BR999',
                HotelName: 'Updated Hotel',
                Address: '123 Updated St',
                Room: '202',
                CheckIn: '2024-07-01',
                CheckOut: '2024-07-05',
                Cost: 600,
                Notes: '',
                FundingAccount: [],
                Trip: [],
            }
            mockedAxios.put.mockResolvedValue({ status: 200 })

            const status = await updateAccom(updatedAccommodation)

            expect(mockedAxios.put).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_ACCOMMODATION_API_PATH}${updatedAccommodation.RecordID}`,
                expectedData
            )
            expect(status).toBe(200)
        })

        it('should throw an error when update fails', async () => {
            mockedAxios.put.mockRejectedValue(new Error('Network error'))

            await expect(updateAccom(updatedAccommodation)).rejects.toThrow('Network error')
        })
    })

    describe('deleteAccom', () => {
        const accomID = 'accom123'

        it('should delete an accommodation successfully', async () => {
            mockedAxios.delete.mockResolvedValue({ status: 200 })

            const status = await deleteAccom(accomID)

            expect(mockedAxios.delete).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}/accommodation/${accomID}`
            )
            expect(status).toBe(200)
        })

        it('should throw an error when deletion fails', async () => {
            mockedAxios.delete.mockRejectedValue(new Error('Network error'))

            await expect(deleteAccom(accomID)).rejects.toThrow('Network error')
        })
    })
})
