import React, { useState } from 'react'
import {
    Modal,
    Grid,
    Typography,
    TextField,
    Button,
    Paper,
} from '@mui/material'

interface EmailFormModalProps {
    open: boolean
    handleClose: () => void
    onSubmit: (
        recipientEmail: string,
        recipientTitle: string,
        recipientName: string
    ) => void
}

export const EmailFormModal: React.FC<EmailFormModalProps> = ({
    open,
    handleClose,
    onSubmit,
}) => {
    const [recipientEmail, setRecipientEmail] = useState('')
    const [recipientName, setRecipientName] = useState('')
    const [recipientTitle, setRecipientTitle] = useState('')

    const handleFormSubmit = () => {
        onSubmit(recipientEmail, recipientTitle, recipientName)
        handleClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="email-form-modal"
        >
            <Paper className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 min-w-[400px] max-w-[700px]">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Enter Recipient Details
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            label="Title"
                            fullWidth
                            value={recipientTitle}
                            required
                            onChange={(e) => setRecipientTitle(e.target.value)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            label="Recipient Name"
                            fullWidth
                            value={recipientName}
                            required
                            onChange={(e) => setRecipientName(e.target.value)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Recipient Email"
                            fullWidth
                            type="email"
                            value={recipientEmail}
                            required
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-end">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFormSubmit}
                                fullWidth
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}
