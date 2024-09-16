/**
 * @jest-environment jsdom
 */

import axios from 'axios'
import { deleteAllCookies, getCookie } from '../../../scripts/cookie/function'
import { login, logout } from '../../../scripts/authentication/auth'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('authentication', () => {
    const mockUsername = 'testUser'
    const mockPassword = 'testPassword123'

    beforeEach(() => {
        jest.clearAllMocks()
        deleteAllCookies()
        process.env.REACT_APP_BACKEND_URL = 'http://test-api.com'
        process.env.REACT_APP_LOGIN_API_PATH= "/login"
        process.env.REACT_APP_LOGIN_REFRESH_API_PATH="/login/refresh-token"
    })

    test('Login should call the correct URL, and set the login cookie', async () => {
        const mockResponse = {
            username: 'john_doe',
            accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiaWF0IjoxNzI1NDUwMzMwLCJleHAiOjE3MjU0NTEyMzB9.ysABK1lyrVbmtRDxBfK8ZGPu-ylbINHGyvcwn0JGRWs',
            LastLoginTime: '2024-09-04T11:45:30.302Z',
        }

        mockedAxios.post.mockResolvedValue({ data: mockResponse, status: 200 })

        const result = await login(mockUsername, mockPassword)

        expect(mockedAxios.post).toHaveBeenCalledWith(
            'http://test-api.com/login',
            { username: mockUsername, password: mockPassword }
        )
        expect(getCookie('login')).toEqual(mockResponse.accessToken)
    })

    test("Logout should remove login cookie", async () => {
        const mockResponse = {
            username: 'john_doe',
            accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiaWF0IjoxNzI1NDUwMzMwLCJleHAiOjE3MjU0NTEyMzB9.ysABK1lyrVbmtRDxBfK8ZGPu-ylbINHGyvcwn0JGRWs',
            LastLoginTime: '2024-09-04T11:45:30.302Z',
        }

        mockedAxios.post.mockResolvedValue({ data: mockResponse, status: 200 })

        const result = await login(mockUsername, mockPassword)
        logout()

        expect(getCookie('login')).toEqual(undefined)
    })
})
