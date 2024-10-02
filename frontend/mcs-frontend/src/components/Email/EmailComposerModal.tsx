import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    InputAdornment,
    Modal,
    TextField,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {
    BottomSuccessSnackbar,
    FormInputMultiEmail,
    FormInputText,
    SubmitButton,
} from '..'
import { FormInputEmail } from '../FormComponents/FormInputEmail'
import { sendEmail } from '../../scripts/email/functions'
import CCBCCFields from './CCBCCField'

interface EmailComposerModalProps {
    open: boolean
    onClose: () => void
    modalTitle?: string
    from?: string
    to?: string[]
    cc?: string[]
    bcc?: string[]
    subject?: string
    body?: string
}

interface EmailFormData {
    from: string
    to: string[]
    cc: string[]
    bcc: string[]
    subject: string
    body: string
}

export const EmailComposerModal: React.FC<EmailComposerModalProps> = ({
    open,
    onClose,
    modalTitle = 'Compose Email',
    from = process.env.REACT_APP_SENDER_EMAIL || '',
    to = [],
    cc = [],
    bcc = [],
    subject = '',
    body = '',
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<EmailFormData>({
        mode: 'onChange',
        defaultValues: {
            from: from,
            to: to,
            cc: cc,
            bcc: bcc,
            subject: subject,
            body: body,
        },
    })
    const [sending, setSending] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [showCC, setShowCC] = useState(false)
    const [showBCC, setShowBCC] = useState(false)

    const onSubmit = async (data: EmailFormData) => {
        setSending(true)
        const { from, to, cc, bcc, subject, body } = data
        console.log('Email data:', data)
        const res = await sendEmail(from, to, cc, bcc, subject, body)

        if (res.status === 200) {
            setShowSuccess(true)
            reset()
            onClose()
        } else {
            setShowError(true)
        }

        setSending(false)
    }

    const handleCloseModal = () => {
        reset()
        onClose()
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleCloseModal}
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
                            {modalTitle}
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                paddingTop: '18px',
                            }}
                            className="[&>*]:mb-5 [&>*:nth-child(2)]:mb-0 [&>*:nth-child(3)]:mb-0 pr-3"
                        >
                            <Controller
                                name={'from'}
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        size="small"
                                        error={!!error}
                                        onChange={onChange}
                                        value={''}
                                        fullWidth
                                        label={'From'}
                                        variant="outlined"
                                        required
                                        type="email"
                                        disabled
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {value && (
                                                        <Chip
                                                            label={value}
                                                            variant="outlined"
                                                        />
                                                    )}
                                                </InputAdornment>
                                            ),
                                        }}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                            <FormInputMultiEmail
                                name="to"
                                control={control}
                                label="To"
                                required
                            />
                            <CCBCCFields
                                control={control}
                                showCC={showCC}
                                showBCC={showBCC}
                                onToggleCC={() => setShowCC(!showCC)}
                                onToggleBCC={() => setShowBCC(!showBCC)}
                            />
                            <FormInputText
                                name="subject"
                                control={control}
                                label="Subject"
                                required
                                hint={'Subject is required'}
                            />
                            <Controller
                                name="body"
                                control={control}
                                render={({ field }) => (
                                    <ReactQuill
                                        theme="snow"
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="flex-grow flex flex-col"
                                        modules={{
                                            toolbar: [
                                                [
                                                    { header: '1' },
                                                    { header: '2' },
                                                    { font: [] },
                                                ],
                                                [{ size: [] }],
                                                [
                                                    'bold',
                                                    'italic',
                                                    'underline',
                                                    'strike',
                                                    'blockquote',
                                                ],
                                                [
                                                    { list: 'ordered' },
                                                    { list: 'bullet' },
                                                    { indent: '-1' },
                                                    { indent: '+1' },
                                                ],
                                                ['link', 'image', 'video'],
                                                ['clean'],
                                            ],
                                        }}
                                    />
                                )}
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
                                onClick={handleCloseModal}
                                sx={{ mr: 2 }}
                                startIcon={<CloseIcon />}
                                variant="outlined"
                            >
                                Cancel
                            </Button>
                            <SubmitButton
                                onClick={handleSubmit(onSubmit)}
                                submitting={sending}
                                disabled={!isValid}
                                startIcon={<SendIcon />}
                            />
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
