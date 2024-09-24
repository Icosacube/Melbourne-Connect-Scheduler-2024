import { EmailContentProps } from './EmailContent'

export const EmailContentCanvassing = ({
    recipientEmail,
    recipientTitle,
    recipientName,
    formLink,
}: EmailContentProps): string => {
    const professorName = 'Ellen Xhaka'
    const topic = 'Discussing AI Safety'

    const availableTimes = [
        'Monday, June 6th, 10:00 AM',
        'Wednesday, June 8th, 2:00 PM',
        'Friday, June 10th, 11:00 AM',
        'Tuesday, June 14th, 3:00 PM',
    ]

    const contactInformation =
        'Email: frances@example.com | Phone: +1 (123) 456-7890'

    const emailSubject = `Meeting Availability for ${professorName}`
    const emailBody = `Dear ${recipientTitle} ${recipientName},

I hope this email finds you well. I am reaching out to discuss the possibility of scheduling a meeting to discuss ${topic}.

I am available for a meeting at the following times:

- ${availableTimes[0]}
- ${availableTimes[1]}
- ${availableTimes[2]}
- ${availableTimes[3]}

Please let me know which of these options works best for you, or if you have any alternative times in mind. Additionally, feel free to suggest a preferred meeting platform (e.g., Zoom, Microsoft Teams) or location if an in-person meeting is possible.

Additionally, please use this form to submit personal information about yourself: ${formLink} 

I look forward to hearing from you and finding a mutually convenient time to meet.

Best regards,
Professor ${professorName}
${contactInformation}`

    return `mailto:${encodeURIComponent(
        recipientEmail
    )}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
        emailBody
    )}`
}