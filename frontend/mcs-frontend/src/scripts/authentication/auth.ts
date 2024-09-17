import axios from 'axios'
import cookie from 'cookie'
import { deleteCookie, getCookie, setCookie } from '../cookie/function'

interface loginResponse {
    username: string
    accessToken: string
    LastLoginTime: string
}

export const login = async (username: string, password: string) => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGIN_API_PATH}`,
            { username: username, password: password }
        )

        if (res.status !== 200) {
            // login failed
            console.log('login failed')
            return
        }
        const data = res.data as loginResponse
        console.log('successfully logged in!')
        const token = data.accessToken

        console.log(res.headers)

        //Login token expires after 15 minutes
        var date = new Date()
        date.setTime(date.getTime() + 15 * 60 * 1000)

        setCookie('login', token, { expires: date })

        // set default axios auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } catch (error) {}
}

export const register = async (username: string, password: string) => {
    const token = getCookie('login')

    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_REGISTER_API_PATH}`,
        { username: username, password: password },
        { headers: { Authorization: `Bearer ${token}` } }
    )

    if (res.status !== 201) {
        // login failed
        console.log('register failed')
        console.error(res.statusText)
    }
    // returns nothing else
    console.log('register success')
    return res
}

// refreshes the token provided we have it
export const refresh = async () => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGIN_REFRESH_API_PATH}`
        )

        const data = res.data as loginResponse
        console.log('successfully refreshed token!')
        const token = data.accessToken

        //Login token expires after 15 minutes
        var date = new Date()
        date.setTime(date.getTime() + 15 * 60 * 1000)

        setCookie('login', token, { expires: date })

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } catch (error) {
        console.error(error)
    }
}

export const authGuard = async () => {
    // check if we have valid user info
    const user = getCookie('login')

    // set default axios auth header
    if (user) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user}`
        return true
    } else {
        // if login expire, try to refresh
        try {
            refresh() // why isn't the cookie sending??
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

export const logout = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGOUT_API_PATH}`
    )

    deleteCookie('login')
}
