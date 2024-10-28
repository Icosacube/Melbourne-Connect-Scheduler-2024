import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import {
    Box,
    Button,
    Chip,
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
import { sendEmail } from '../../scripts/email/functions'
import { FormInputEmail } from '../FormComponents/FormInputEmail'

interface EmailComposerModalProps {
    open: boolean
    onClose: () => void
    modalTitle?: string
    from?: string
    to?: string
    cc?: string
    subject?: string
    body?: string
}

interface EmailFormData {
    from: string
    to: string
    cc: string
    subject: string
    body: string
}

export const EmailComposerModal: React.FC<EmailComposerModalProps> = ({
    open,
    onClose,
    modalTitle = 'Compose Email',
    from = '',
    to = '',
    cc = '',
    subject = '',
    body = '',
}) => {
    const [emailData, _] = React.useState({
        from,
        to,
        cc,
        subject,
        body,
    })
    const {
        control,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<EmailFormData>({
        mode: 'onChange',
        defaultValues: {
            from: emailData.from,
            to: emailData.to,
            cc: emailData.cc,
            subject: emailData.subject,
            body: emailData.body,
        },
    })
    const [sending, setSending] = React.useState(false)
    const [showSuccess, setShowSuccess] = React.useState(false)
    const [showError, setShowError] = React.useState(false)

    const onSubmit = async (data: EmailFormData) => {
        setSending(true)
        const { from, to, cc, subject, body } = data

        const res = await sendEmail(from, to, cc, subject, body)
        console.log('Email sent:', res.status)
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
                            className="space-y-6"
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
                            <FormInputEmail
                                name="cc"
                                control={control}
                                label="Cc"
                            />
                            <FormInputEmail
                                name="to"
                                control={control}
                                label="To"
                                required
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
