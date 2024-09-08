// EmailComposerModal.tsx
import {
    Box,
    Button,
    CircularProgress,
    Modal,
    TextField,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { sendEmail } from '../../../scripts/email/functions'
import { MainEvent, Speaker } from '../../../types/frontendTypes'
import { EmailFormField } from './EmailFormField'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import { BottomSuccessSnackbar } from '../../../components'
import { set } from 'react-hook-form'

interface EmailComposerModalProps {
    isOpen: boolean
    onClose: () => void
    event: MainEvent
    speaker: Speaker
}

// Email validation function
const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
}

const validateEmail = (email: string): string => {
    if (email.trim() === '') {
        return 'Email is required'
    } else if (!isValidEmail(email)) {
        return 'Invalid email address'
    }
    return ''
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

export const EmailComposerModal: React.FC<EmailComposerModalProps> = ({
    isOpen,
    onClose,
    event,
    speaker,
}) => {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [subjectError, setSubjectError] = useState('')
    const [disableSend, setDisabledSend] = useState(true)
    const [sending, setSending] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const reset = () => {
        setFrom('')
        setTo('')
        setSubject('')
        setContent('')
        setSubjectError('')
        setDisabledSend(true)
    }
    const handleCancel = () => {
        reset()
        onClose()
    }
    const handleSend = async () => {
        setDisabledSend(true)
        setSending(true)

        const fromError = validateEmail(from)
        const toError = validateEmail(to)
        const subjectError = subject.trim() ? '' : 'Subject cannot be empty'

        setSubjectError(subjectError)
        if (!fromError && !toError && !subjectError) {
            console.log('Sending email:', { from, to, subject, content })
            const res = await sendEmail(from, to, subject, content)
            console.log('Email sent:', res.status)
            if (res.status === 200) {
                setShowSuccess(true)
                reset()
                onClose()
            } else {
                setShowError(true)
            }
        }
        setSending(false)
        setDisabledSend(false)
    }

    useEffect(() => {
        const fromError = validateEmail(from)
        const toError = validateEmail(to)
        if (!fromError && !toError && !subjectError) {
            setDisabledSend(false)
        }
    }, [from, to, subject, content])
    useEffect(() => {
        const { emailSubject, emailContent } = generateHtmlEmailTemplate(
            event,
            speaker
        )
        if (isOpen) {
            // Pre-populate the subject and content when the modal opens
            setSubject(emailSubject)
            setContent(emailContent)
        }
    }, [isOpen, event])

    const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(e.target.value)
        setSubjectError(e.target.value.trim() ? '' : 'Subject cannot be empty')
    }
    const handleContentChange = (value: string) => {
        setContent(value)
    }
    const handleFromChange = (value: string) => {
        setFrom(value)
    }
    const handleToChange = (value: string) => {
        setTo(value)
    }

    return (
        <>
            <Modal
                open={isOpen}
                onClose={handleCancel}
                aria-labelledby="email-composer-modal"
            >
                <>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '75%',
                            height: '85vh',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="h6" component="h2" gutterBottom>
                            Share Event: {event.EventName}
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                paddingTop: '18px',
                            }}
                        >
                            <EmailFormField
                                label="From*"
                                value={from}
                                onChange={handleFromChange}
                            />
                            <EmailFormField
                                label="To*"
                                value={to}
                                onChange={handleToChange}
                            />
                            <TextField
                                fullWidth
                                label="Subject*"
                                value={subject}
                                onChange={handleSubjectChange}
                                margin="normal"
                                error={!!subjectError}
                                helperText={subjectError}
                                sx={{ mt: 2 }}
                            />
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={handleContentChange}
                                style={{
                                    flexGrow: 1,
                                    marginTop: '16px',
                                    marginBottom: '20px',
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mt: 2,
                            }}
                        >
                            <Button
                                onClick={handleCancel}
                                sx={{ mr: 2 }}
                                startIcon={<CloseIcon />}
                                variant="outlined"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSend}
                                disabled={disableSend}
                                startIcon={
                                    sending ? (
                                        <CircularProgress
                                            size={20}
                                            color="inherit"
                                        />
                                    ) : (
                                        <SendIcon />
                                    )
                                }
                            >
                                Send
                            </Button>
                        </Box>
                    </Box>
                </>
            </Modal>
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Email Sent!"
            />
            <BottomSuccessSnackbar
                showSuccess={showError}
                setShowSuccess={setShowError}
                message="Failed to Send Email"
                variant="error"
            />
        </>
    )
}
