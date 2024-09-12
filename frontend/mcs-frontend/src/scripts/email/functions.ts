import axios, { AxiosResponse, AxiosError } from 'axios'
import { MainEvent, Speaker } from '../../types/frontendTypes'

export async function sendEmail(
    from: string,
    to: string,
    cc: string,
    subject: string,
    content: string
): Promise<AxiosResponse<any, any>> {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SENDEMAIL_API_PATH}`,
            {
                from,
                to,
                cc,
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

export async function getBlankSpeakerFormLink() {
    return 'google.com'
}

export async function getExistingSpeakerFormLink(speakerId: string) {
    return 'google.com'
}

export async function getBlankSpeakerEventFormLink() {
    return 'google.com'
}

export async function getExistingSpeakerEventFormLink() {
    return 'google.com'
}

export function generateHtmlEmailTemplateFromEvents(
    event: MainEvent,
    speaker: Speaker
) {
    console.log(speaker)

    // Format the date using dayjs
    const formattedDate = event.Date.format('dddd, MMMM D, YYYY')
    const formattedTime = event.Date.format('h:mm A')
    const speakerDetails = [
        speaker.WorkTitle,
        speaker.Department,
        speaker.Organisation,
    ]
        .filter(Boolean)
        .join(' | ')

    const emailSubject = `INVITATION: ${event.EventName} | ${formattedDate}`

    const emailContent = `
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <img src="${
                event.EventBanner[0]?.url
            }" alt="Event Banner" style="max-width: 100%;">
            <h1><b>${event.EventName}</b></h1>
            <p>${event.EventAbstract}</p>
            <br/>
            <h1><b>About the Speaker</b></h1>
            <img src="${speaker.Headshot[0]?.url}" alt="${speaker.FirstName} ${
        speaker.LastName
    }" style="max-width: 20px;"><br>
            <h2><b>${speaker.Title} ${speaker.FirstName} ${
        speaker.LastName
    }</b></h2>
            ${speakerDetails ? `<h3>${speakerDetails}</h3>` : ''}
            <p>${speaker.Bio}</p>
            <br/>
            <h2><b>Event Details:</b></h2>
            <p>${event.EventDescription}</p>
            <ul>
                <li><strong>Date:</strong> ${formattedDate}</li>
                <li><strong>Time:</strong> ${formattedTime}</li>
            </ul>
            <br/>
            <p>We look forward to seeing you at the event!</p>
            
            <p>Best regards,<br>[Your Name]</p>
        </body>
        </html>
    `

    return { emailSubject, emailContent }
}
