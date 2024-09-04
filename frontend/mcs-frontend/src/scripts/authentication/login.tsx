import axios from 'axios'
import cookie from 'cookie'

interface loginResponse {
    username: string
    token: string
    LastLoginTime: string
}

export const login = async (username: string, password: string) => {
    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGIN_API_PATH}`,
        { username: username, password: password }
    )

    if (res.status != 200) {
        // login failed
        console.log('login failed')
        return
    }
    const data = res.data as loginResponse
    console.log('successfully logged in!')
    console.log(data.token)

    //Login token expires after 15 minutes
    var date = new Date()
    date.setTime(date.getTime() + 15 * 60 * 1000)

    const loginCookie = cookie.serialize('login', data.token, {
        expires: date,
    })
    document.cookie = loginCookie
}

// refreshes the token provided we have it
export const refresh = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGIN_REFRESH_API_PATH}`
    )

    if (res.status != 200) {
        // login failed
        console.log('login failed')
        return
    }
    const data = res.data as loginResponse
    console.log('successfully logged in!')
    console.log(data.token)

    //Login token expires after 15 minutes
    var date = new Date()
    date.setTime(date.getTime() + 15 * 60 * 1000)

    const refreshCookie = cookie.serialize('login', data.token, {
        expires: date,
    })
    document.cookie = refreshCookie
}