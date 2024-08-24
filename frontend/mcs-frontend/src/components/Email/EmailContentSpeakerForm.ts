import { EmailContentProps, contactMCS} from './EmailContent'

export const EmailContentSpeakerForm = ({
    recipientEmail,
    recipientTitle,
    recipientName,
    formLink = "https://airtable.com/app79kFx8O6KyDmzX/pagdVhuKBJu0OemCS/form",
    contact = contactMCS
}: EmailContentProps): string => {
    const emailSubject = `Register Speaker Information at Melbourne Connect`
    const emailBody = `Dear ${recipientTitle} ${recipientName},

We hope this message finds you well. As we prepare for the upcoming event at Melbourne Connect, we kindly ask you to submit your personal information using the following form: 
${formLink}

We look forward to hearing from you.

Best regards,  
Melbourne Connect Team`

    return `mailto:${encodeURIComponent(
        recipientEmail
    )}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
        emailBody
    )}`
}
