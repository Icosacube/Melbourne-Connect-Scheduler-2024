import axios from 'axios'
import dayjs from 'dayjs'
import {
    getAllMainEvents,
    getMainEventById,
    createMainEvent,
    updateMainEventById,
    deleteMainEventById,
    defaultMainEvent
} from '../../../scripts/event/functions' 
import { MainEvent } from '../../../types/frontendTypes'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('MainEvent Service', () => {
    beforeEach(() => {
        
        jest.spyOn(console, 'error').mockImplementation(() => {});
    })

    afterEach(() => {
        
        jest.restoreAllMocks();
    })

    describe('getAllMainEvents', () => {
        it('should fetch and format all main events', async () => {
            const mockEvents = [
                {
                    id: 'event123',
                    EventName: 'Test Event',
                    Date: '2024-05-01',
                    Speaker: [],
                    Venue: []
                },
                {
                    id: 'event456',
                    EventName: 'Another Event',
                    Date: '2024-06-01',
                    Speaker: [],
                    Venue: []
                }
            ]

            mockedAxios.get.mockResolvedValue({ data: mockEvents })

            const result = await getAllMainEvents()

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_MAINEVENT_API_PATH}`
            )
            expect(result).toHaveLength(2)
            expect(result[0].EventName).toBe('Test Event')
            expect(result[1].EventName).toBe('Another Event')
        })

        it('should handle errors and return an empty array', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'))

            const result = await getAllMainEvents()

            expect(result).toEqual([]) 
            expect(console.error).toHaveBeenCalledWith('Error fetching all main events:', expect.any(Error))
        })
    })

    describe('getMainEventById', () => {
        it('should fetch a single main event by ID', async () => {
            const mockEvent = {
                id: 'event123',
                EventName: 'Test Event',
                Date: '2024-05-01',
                Speaker: [],
                Venue: []
            }

            mockedAxios.get.mockResolvedValue({ data: mockEvent })

            const result = await getMainEventById('event123')

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_MAINEVENT_API_PATH}/event123`
            )
            expect(result.EventName).toBe('Test Event')
        })

        it('should handle errors and return an empty main event', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'))

            const result = await getMainEventById('event123')
            console.log("RESULT is this: " + result.toString())
            expect(result).toEqual({}) 
            expect(console.error).toHaveBeenCalledWith('Error fetching main event by ID:', expect.any(Error))
        })
    })

    describe('createMainEvent', () => {
        const newMainEvent: MainEvent = {
            ...defaultMainEvent,
            EventName: 'New Event',
            Date: dayjs(),
        }

        it('should create a main event successfully', async () => {
            mockedAxios.post.mockResolvedValue({ data: { message: 'Main event created successfully' } })

            await createMainEvent(newMainEvent)

            expect(mockedAxios.post).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_MAINEVENT_API_PATH}`,
                expect.any(Object) 
            )
        })

        it('should handle errors when creating a main event', async () => {
            mockedAxios.post.mockRejectedValue(new Error('Network error'))

            const result = await createMainEvent(newMainEvent)

            expect(result).toEqual({}) 
            expect(console.error).toHaveBeenCalledWith('Error creating main event:', expect.any(Error))
        })
    })

    describe('updateMainEventById', () => {
        const updatedMainEvent: MainEvent = {
            ...defaultMainEvent,
            RecordID: 'event123',
            EventName: 'Updated Event',
            Date: dayjs(),
        }

        it('should update a main event successfully', async () => {
            mockedAxios.put.mockResolvedValue({ data: { message: 'Main event updated successfully' } })

            await updateMainEventById(updatedMainEvent)

            expect(mockedAxios.put).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_MAINEVENT_API_PATH}/event123`,
                expect.any(Object)
            )
        })

        it('should handle errors when updating a main event', async () => {
            mockedAxios.put.mockRejectedValue(new Error('Network error'))

            await updateMainEventById(updatedMainEvent)

            expect(console.error).toHaveBeenCalledWith('Error updating main event by ID:', expect.any(Error))
        })
    })

    describe('deleteMainEventById', () => {
        it('should delete a main event by ID successfully', async () => {
            mockedAxios.delete.mockResolvedValue({ status: 200 })

            const result = await deleteMainEventById('event123')

            expect(mockedAxios.delete).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_MAINEVENT_API_PATH}/event123`
            )
            expect(result).toBe(200)
        })

        it('should handle errors when deleting a main event', async () => {
            mockedAxios.delete.mockRejectedValue(new Error('Network error'))

            const result = await deleteMainEventById('event123')

            expect(result).toBeUndefined()
            expect(console.error).toHaveBeenCalledWith('Error deleting main event by ID:', expect.any(Error))
        })
    })
})