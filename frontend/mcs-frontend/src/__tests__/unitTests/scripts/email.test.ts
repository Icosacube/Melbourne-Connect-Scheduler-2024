import axios from 'axios'
import dayjs from 'dayjs'
import {
    generateEmailTemplateForBlankSpeakerForm,
    generateEmailTemplateForExistingSpeakerForm,
    generateEmailTemplateFromEvents,
    getBlankSpeakerFormLink,
    sendEmail,
} from '../../../scripts/email/functions'
import { MainEvent, Speaker } from '../../../types/frontendTypes'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Email Service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        process.env.REACT_APP_BACKEND_URL = 'http://test-api.com'
        process.env.REACT_APP_SENDEMAIL_API_PATH = '/sendEmail'
        process.env.REACT_APP_SPEAKER_FORM = '/speakerForm'
        process.env.REACT_APP_EVENT_FORM = '/eventForm'
    })

    describe('sendEmail', () => {
        it('should send an email successfully', async () => {
            const mockResponse = { status: 200 }
            mockedAxios.post.mockResolvedValue(mockResponse)

            const result = await sendEmail(
                'from@example.com',
                'to@example.com',
                'cc@example.com',
                'Test Subject',
                'Test Content'
            )

            expect(mockedAxios.post).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SENDEMAIL_API_PATH}`,
                {
                    from: 'from@example.com',
                    to: 'to@example.com',
                    cc: 'cc@example.com',
                    subject: 'Test Subject',
                    content: 'Test Content',
                }
            )
            expect(result).toEqual(mockResponse)
        })

        it('should handle axios error correctly', async () => {
            const mockError = {
                response: {
                    status: 500,
                    data: 'Internal server error',
                },
            }

            mockedAxios.post.mockRejectedValue(mockError)

            const result = await sendEmail(
                'from@example.com',
                'to@example.com',
                'cc@example.com',
                'Test Subject',
                'Test Content'
            )

            expect(result).toEqual(mockError.response)
        })
    })

    describe('getBlankSpeakerFormLink', () => {
        it('should return the speaker form link successfully', async () => {
            const mockData = 'https://test-form-link.com'
            mockedAxios.get.mockResolvedValue({ data: mockData })

            const result = await getBlankSpeakerFormLink()

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SPEAKER_FORM}`
            )
            expect(result).toEqual(mockData)
        })

        it('should return an empty string on error', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'))

            const result = await getBlankSpeakerFormLink()

            expect(result).toEqual('')
        })
    })

    describe('generateEmailTemplateFromEvents', () => {
        it('should generate the correct email template from event and speaker details', () => {
            const mockEvent: MainEvent = {
                RecordID: 'event123',
                EventName: 'Sample Event',
                EventAbstract: 'This is a test event',
                EventDescription: 'Test event description',
                EventBanner: [{ url: 'https://banner-image-url.com' }],
                Date: dayjs('2024-05-01'),
            }
            const mockSpeaker: Speaker = {
                RecordID: 'speaker123',
                PrimaryEmail: 'speaker@example.com',
                FirstName: 'John',
                LastName: 'Doe',
                Title: 'Dr.',
                WorkTitle: 'Professor',
                Organisation: 'University',
                Department: 'Science',
                Bio: 'Test bio',
                Headshot: [{ url: 'https://headshot-image-url.com' }],
            }

            const { emailSubject, emailContent } =
                generateEmailTemplateFromEvents(mockEvent, mockSpeaker)

            expect(emailSubject).toBe(
                'INVITATION: Sample Event | Wednesday, May 1, 2024'
            )
            expect(emailContent).toContain('Sample Event')
            expect(emailContent).toContain('John Doe')
            expect(emailContent).toContain('Test bio')
            expect(emailContent).toContain('https://headshot-image-url.com')
            expect(emailContent).toContain('Wednesday, May 1, 2024')
        })
    })

    describe('generateEmailTemplateForBlankSpeakerForm', () => {
        it('should generate a valid email template for the blank speaker form', async () => {
            const mockFormLink = 'https://test-speaker-form.com'
            mockedAxios.get.mockResolvedValue({ data: mockFormLink })

            const { subject, body } =
                await generateEmailTemplateForBlankSpeakerForm()

            expect(subject).toBe('Invitation to fill out your information')
            expect(body).toContain(mockFormLink)
        })
    })

    describe('generateEmailTemplateForExistingSpeakerForm', () => {
        it('should generate a valid email template for the existing speaker form', async () => {
            const mockSpeaker: Speaker = {
                RecordID: 'speaker123',
                PrimaryEmail: 'speaker@example.com',
                FirstName: 'John',
                LastName: 'Doe',
                Title: 'Dr.',
                WorkTitle: 'Professor',
                Organisation: 'University',
                Department: 'Science',
                Bio: 'Test bio',
                Headshot: [{ url: 'https://headshot-image-url.com' }],
            }
            const mockFormLink = 'https://test-existing-speaker-form.com'
            mockedAxios.get.mockResolvedValue({ data: mockFormLink })

            const { to, subject, body } =
                await generateEmailTemplateForExistingSpeakerForm(mockSpeaker)

            expect(to).toBe('speaker@example.com')
            expect(subject).toBe('Invitation to update your information')
            expect(body).toContain(mockFormLink)
        })
    })
})
