import {
    useState,
    useMemo,
    useContext,
    createContext,
    FC,
    ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie, setCookie } from '../cookie/function'
import { CookieSerializeOptions } from 'cookie'
import axios from 'axios'

interface loginResponse {
    username: string
    accessToken: string
    LastLoginTime: string
}

// tracks a specific cookie??
export const useCookie = (
    keyName: string,
    defaultValue: any,
    options?: CookieSerializeOptions
) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = getCookie(keyName)
            if (value) {
                return JSON.parse(value)
            } else {
                setCookie(keyName, defaultValue, options || {})
                return defaultValue
            }
        } catch (err) {
            return defaultValue
        }
    })

    const setValue = (newValue: any, options?: CookieSerializeOptions) => {
        try {
            setCookie(keyName, newValue, options || {})
        } catch (err) {
            console.log(err)
        }
        setStoredValue(newValue)
    }
    return [storedValue, setValue]
}

type IAuthContext = {
    token: string | null
    login: (username: string, password: string) => void
    logout: () => void
    authGuard: () => Promise<Boolean>
}

const AuthContext = createContext<IAuthContext>({
    token: null,
    login: () => {},
    logout: () => {},
    authGuard: () => {return new Promise<Boolean>(() => {})}
})

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useCookie('login', null, {
        expires: new Date(-1),
    })

    // called when authenticating user
    const login = async (username: string, password: string) => {
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

            //Login token expires after 15 minutes, refresh cookie should be automatically tracked
            const data = res.data as loginResponse
            console.log('successfully logged in!')
            const token = data.accessToken

            var date = new Date()
            date.setTime(date.getTime() + 15 * 60 * 1000)
            const options = { expires: date }
            setToken(token, options)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            console.log('AuthContext: Logged in')
        } catch (error) {}
    }

    const logout = async () => {
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGOUT_API_PATH}`
        )
        setToken(null)
    }

    const authGuard = async () => {
        // set default axios auth header
        if (token !== null) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            return true
        } else {
            // if login expire, try to refresh
            setToken(getCookie("Login"))
            axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie("Login")}`

            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LOGIN_REFRESH_API_PATH}`
                )

                //Login token expires after 15 minutes, refresh cookie should be automatically tracked
                const data = res.data as loginResponse
                console.log('successfully logged in!')
                const token = data.accessToken

                var date = new Date()
                date.setTime(date.getTime() + 15 * 60 * 1000)
                const options = { expires: date }
                setToken(token, options)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                console.log('AuthContext: Refreshed auth')
                return true
            } catch (error) {
                console.error(error)
                return false
            }
        }
    }

    const value = useMemo(
        () => ({
            token,
            login,
            logout,
            authGuard
        }),
        [token]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export { AuthContext, AuthProvider }
