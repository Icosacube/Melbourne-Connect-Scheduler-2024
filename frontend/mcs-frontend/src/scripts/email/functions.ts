import axios, { AxiosResponse, AxiosError } from 'axios'

export async function sendEmail(
    from: string,
    to: string,
    subject: string,
    content: string
): Promise<AxiosResponse<any, any>> {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SENDEMAIL_API_PATH}`,
            {
                from,
                to,
                subject,
                content,
            }
        )
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response)
            return error.response as AxiosResponse
        } else {
            console.error('Generic error:', error)
            throw error // or handle it differently depending on the use case
        }
    }
}
