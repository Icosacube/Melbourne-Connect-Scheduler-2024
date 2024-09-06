import axios from 'axios'

export async function sendEmail(
    from: string,
    to: string,
    subject: string,
    content: string
) {
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
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}
