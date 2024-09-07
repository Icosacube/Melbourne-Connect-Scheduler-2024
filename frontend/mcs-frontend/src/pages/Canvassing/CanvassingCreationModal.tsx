import React, { useState } from 'react'
import {
    Modal,
    Grid,
    Typography,
    TextField,
    Paper,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { SubmitButton, BottomSuccessSnackbar } from '../../components/'
import { TimeSlot } from '../../types/frontendTypes'

interface CanvassingCreationModalProps {
    open: boolean
    handleClose: () => void
    timeSlots: TimeSlot[]
    setTimeSlots: (value: TimeSlot[]) => void
}

export const CanvassingCreationModal: React.FC<
    CanvassingCreationModalProps
> = ({ open, handleClose, timeSlots, setTimeSlots }) => {
    const [Email, setEmail] = useState('')
    const [Name, setName] = useState('')
    const [Title, setTitle] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const { handleSubmit, reset, control, watch } = useForm<TimeSlot[]>({
        defaultValues: [],
    })

    const onSubmit = () => {
        setSubmitting(true)
        const newTimeSlots: TimeSlot[] = timeSlots.map((slot) => ({
            MainEvent: slot.MainEvent,
            StartTime: slot.StartTime,
            EndTime: slot.EndTime,
            AvailablePeople: slot.AvailablePeople,
            People: [{ name: Name, email: Email }],
        }))
        setTimeSlots(newTimeSlots)
        console.log(newTimeSlots)
        setSubmitting(false)
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
                            Enter Details
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            label="Title"
                            fullWidth
                            value={Title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={Name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            fullWidth
                            type="email"
                            value={Email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-end">
                        <Grid item>
                            <SubmitButton
                                submitting={submitting}
                                onClick={handleSubmit(onSubmit)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}
