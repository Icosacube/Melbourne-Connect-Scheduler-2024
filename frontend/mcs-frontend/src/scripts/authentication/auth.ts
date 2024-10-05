import axios from 'axios'
import { redirect } from 'react-router-dom'
import { deleteCookie, getCookie, setCookie } from '../cookie/function'
interface loginResponse {
    username: string
    accessToken: string
    LastLoginTime: string
}

export const login = async (username: string, password: string) => {
    try {
        await authGuard();
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGIN_API_PATH}`,
            { username: username, password: password },
            { withCredentials: true }
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
        setCookie('username', data.username, { expires: date })

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
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGIN_REFRESH_API_PATH}`,
            null,
            { withCredentials: true }
        )

        const data = res.data as loginResponse
        console.log('successfully refreshed token!')
        const token = data.accessToken

        //Login token expires after 15 minutes
        var date = new Date()
        date.setTime(date.getTime() + 15 * 60 * 1000)

        setCookie('login', token, { expires: date })

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        window.location.reload();
    } catch (error) {
        console.error(error)
    }
}

export const authGuard = async () => {
    // check if we have valid user info
    const user = getCookie('login')
    console.log(user)
    // set default axios auth header
    if (user) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user}`
        return true
    } else {
        // if login expire, try to refresh
        try {
            await refresh() // why isn't the cookie sending??
            return true
        } catch (error) {
            console.error(error)
            return redirect('/login')
        }
    }
}

export const logout = async () => {
    try {
        const username = getCookie('username')
        console.log('username', username)
        const token = getCookie('login')

        if (!token) {
            console.log('No user logged in');
            return false; 
        }

        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGOUT_API_PATH}`,
            { username },
            { withCredentials: true }
        );

        if (res.status === 200) {
            deleteCookie('login');
            deleteCookie('username');
            console.log('User logged out successfully!');
            return true;
        } else {
            console.log('Logout failed: ', res.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error during logout:', error);
        return false;

    }
}
