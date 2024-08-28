import axios from 'axios'
import dayjs from 'dayjs'
import { MainEvent } from '../../../types/frontendTypes'
import { createMainEvent } from '../../../scripts/event/functions'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('createEvent', () => {
    const mockEvent: MainEvent = {
        id: '1',
        name: 'Test Event',
        date: dayjs(),
        status: EventStatus.Preparation,
        venue: [],
        speakers: [],
        description: 'Test description',
        abstract: 'Test abstract',
    }
    const speakerId = 'rec0aszZKr8m7Fb6W'

    beforeEach(() => {
        jest.clearAllMocks()
        process.env.REACT_APP_BACKEND_URL = 'http://test-api.com'
    })

    it('should create an event successfully', async () => {
        mockedAxios.post.mockResolvedValue({ status: 201 })

        const result = await createMainEvent(mockEvent, speakerId)

        expect(mockedAxios.post).toHaveBeenCalledWith(
            'http://test-api.com/event/rec0aszZKr8m7Fb6W',
            mockEvent
        )
        expect(result).toBe(201)
    })

    it('should handle errors', async () => {
        mockedAxios.post.mockRejectedValue(new Error('Network error'))

        await expect(createEvent(mockEvent, speakerId)).rejects.toThrow(
            'Network error'
        )
    })
})
