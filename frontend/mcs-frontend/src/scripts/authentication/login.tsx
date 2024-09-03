import axios from 'axios'

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
        return
    }
    const data = res.data as loginResponse
    console.log("successfully logged in!")
    console.log(data.token)

    localStorage.setItem('session', data.token)
}
