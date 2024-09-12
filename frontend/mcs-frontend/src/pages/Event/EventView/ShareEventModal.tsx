// EmailComposerModal.tsx
import React from 'react'
import 'react-quill/dist/quill.snow.css'
import { EmailComposerModal } from '../../../components'
import { MainEvent, Speaker } from '../../../types/frontendTypes'

interface ShareEventModalProps {
    isOpen: boolean
    onClose: () => void
    event: MainEvent
    speaker: Speaker
}

function generateHtmlEmailTemplate(event: MainEvent, speaker: Speaker) {
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

export const ShareEventModal: React.FC<ShareEventModalProps> = ({
    isOpen,
    onClose,
    event,
    speaker,
}) => {
    const { emailSubject, emailContent } = generateHtmlEmailTemplate(
        event,
        speaker
    )

    return (
        <>
            <EmailComposerModal
                open={isOpen}
                onClose={onClose}
                modalTitle={`Share Event: ${event.EventName}`}
                subject={emailSubject}
                body={emailContent}
            />
        </>
    )
}
