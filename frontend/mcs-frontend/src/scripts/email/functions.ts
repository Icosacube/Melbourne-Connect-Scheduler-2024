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

// Get form links functions
export async function getBlankSpeakerFormLink() {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SPEAKER_FORM}`
        )
        return res.data
    } catch (error) {
        console.error('Error getting blank speaker form link:', error)
        return ''
    }
}

export async function getExistingSpeakerFormLink(speakerId: string) {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SPEAKER_FORM}/${speakerId}`
        )
        return res.data
    } catch (error) {
        console.error('Error getting existing speaker form link:', error)
        return ''
    }
}

export async function getBlankEventFormLink(speakerId: string) {
    console.log(
        `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_EVENT_FORM}/${speakerId}`
    )
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_EVENT_FORM}`
        )
        return res.data
    } catch (error) {
        console.error('Error getting blank event form link:', error)
        return ''
    }
}

export async function getExistingEventFormLink(
    eventId: string,
    speakerId: string
) {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_EVENT_FORM}/${speakerId}/${eventId}`
        )
        return res.data
    } catch (error) {
        console.error('Error getting existing event form link:', error)
        return ''
    }
}

export async function getBlankSpeakerEventFormLink() {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SPEAKER_EVENT_FORM}`
        )
        console.log(res.data)
        return res.data
    } catch (error) {
        console.error('Error getting blank speaker event form link:', error)
        return ''
    }
}

export async function getExistingSpeakerEventFormLink(
    speakerId: string,
    eventId: string
) {
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SPEAKER_EVENT_FORM}/${speakerId}/${eventId}`
        )
        return res.data
    } catch (error) {
        console.error('Error getting existing speaker event form link:', error)
        return ''
    }
}

// Templating functions
export function generateEmailTemplateFromEvents(
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

export async function generateEmailTemplateForBlankSpeakerForm() {
    const formLink = await getBlankSpeakerFormLink()

    const subject = 'Invitation to fill out your information'

    const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Dear Speaker,</h2>
            <br>
            <p>
                We are excited to invite you to fill in your personal details. 
                Please click the link below to complete your speaker form:
            </p>
            <p>
                <a href="${formLink}" style="color: #007BFF; text-decoration: none;">New Speaker Form Link</a>
            </p>
            <br>
            <p>
                Thank you for your participation!
            </p>
            <br>
            <p>
                Best regards,<br />
                The Event Team
            </p>
        </div>
    `

    return { subject, body }
}

export async function generateEmailTemplateForExistingSpeakerForm(
    speaker: Speaker
) {
    const formLink = await getExistingSpeakerFormLink(speaker.RecordID)

    const to = speaker.PrimaryEmail || ''

    const subject = 'Invitation to update your information'
    const firstName = speaker.FirstName || 'Speaker'
    const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Dear ${firstName},</h2>
            <br>
            <p>
                We are excited to invite you to update your personal details. 
                Please click the link below to complete your speaker form:
            </p>
            <p>
                <a href="${formLink}" style="color: #007BFF; text-decoration: none;">Update Speaker Information Form Link</a>
            </p>
            <br>
            <p>
                Thank you for your participation!
            </p>
            <br>
            <p>
                Best regards,<br />
                The Event Team
            </p>
        </div>
    `

    return { to, subject, body }
}

export async function generateEmailTemplateForBlankEventForm(speaker: Speaker) {
    const formLink = await getBlankEventFormLink(speaker?.RecordID)

    const subject = 'Invitation to create a new event'
    const to = speaker?.PrimaryEmail || ''
    const firstName = speaker?.FirstName || 'Speaker'

    const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Dear ${firstName},</h2>
            <br>
            <p>
                We are excited to invite you to create a new event. 
                Please click the link below to complete your event form:
            </p>
            <p>
                <a href="${formLink}" style="color: #007BFF; text-decoration: none;">New Event Form Link</a>
            </p>
            <br>
            <p>
                Thank you for your participation!
            </p>
            <br>
            <p>
                Best regards,<br />
                The Event Team
            </p>
        </div>
    `

    return { to, subject, body }
}

export async function generateEmailTemplateForExistingEventForm(
    speaker: Speaker,
    event: MainEvent
) {
    const formLink = await getExistingEventFormLink(
        event.RecordID,
        speaker.RecordID
    )

    const subject = 'Invitation to update your event information'
    const to = speaker.PrimaryEmail || ''
    const firstName = speaker.FirstName || 'Speaker'

    const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Dear ${firstName},</h2>
            <br>
            <p>
                We are excited to invite you to update your event. 
                Please click the link below to complete your event form:
            </p>
            <p>
                <a href="${formLink}" style="color: #007BFF; text-decoration: none;">Update Event Form Link</a>
            </p>
            <br>
            <p>
                Thank you for your participation!
            </p>
            <br>
            <p>
                Best regards,<br />
                The Event Team
            </p>
        </div>
    `

    return { to, subject, body }
}

export async function generateEmailTemplateForBlankSpeakerEventForm() {
    const formLink = await getBlankSpeakerEventFormLink()

    const subject = 'Invitation to add your information create a new event'
    const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Dear Speaker,</h2>
            <br>
            <p>
                We are excited to invite you to add your information and create a new event. 
                Please click the link below to complete your event form:
            </p>
            <p>
                <a href="${formLink}" style="color: #007BFF; text-decoration: none;">New Speaker & Event Form Link</a>
            </p>
            <br>
            <p>
                Thank you for your participation!
            </p>
            <br>
            <p>
                Best regards,<br />
                The Event Team
            </p>
        </div>
    `

    return { subject, body }
}

export async function generateEmailTemplateForExistingSpeakerEventForm(
    speaker: Speaker,
    event: MainEvent
) {
    const formLink = await getExistingSpeakerEventFormLink(
        speaker.RecordID,
        event.RecordID
    )

    const to = speaker.PrimaryEmail || ''

    const subject = "Invitation to update your information and event's details"
    const firstName = speaker.FirstName || 'Speaker'
    const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Dear ${firstName},</h2>
            <br>
            <p>
                We are excited to invite you to update your personal information and event details. 
                Please click the link below to complete your speaker and event form:
            </p>
            <p>
                <a href="${formLink}" style="color: #007BFF; text-decoration: none;">Update Speaker & Event Information Form Link</a>
            </p>
            <br>
            <p>
                Thank you for your participation!
            </p>
            <br>
            <p>
                Best regards,<br />
                The Event Team
            </p>
        </div>
    `

    return { to, subject, body }
}
