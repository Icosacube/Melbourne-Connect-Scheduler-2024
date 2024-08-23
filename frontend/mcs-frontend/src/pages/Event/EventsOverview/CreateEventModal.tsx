import { Grid, Modal, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormInputText, SubmitButton } from '../../../components/'
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar'
import { FormInputDateTime } from '../../../components/FormComponents/FormInputDateTime'
import { FormInputMultiSelect } from '../../../components/FormComponents/FormInputMultiSelect'
import { FormInputTextLong } from '../../../components/FormComponents/FormInputTextLong'
import {
    createMainEvent,
    defaultMainEvent,
} from '../../../scripts/event/functions'
import { getAllSpeakers } from '../../../scripts/speaker/functions'
import { getAllVenues } from '../../../scripts/venue/functions'
import { MainEvent } from '../../../types/frontendTypes'
import { Speaker, Venue } from '../../../types/frontendTypes'

interface CreateEventModalProps {
    handleClose: () => void
    open: boolean
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
    handleClose,
    open,
}) => {
    const { handleSubmit, reset, control } = useForm<MainEvent>({
        defaultValues: defaultMainEvent,
    })

    const [showSuccess, setShowSuccess] = useState(false)
    const [speakers, setSpeakers] = useState<Speaker[]>([])
    const [venues, setVenues] = useState<Venue[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (loading && open) {
            const fetchData = async () => {
                setSpeakers(await getAllSpeakers())
                setVenues(await getAllVenues())
                setLoading(false)
            }

            fetchData()
        }
    }, [loading, open])

    const generateSpeakers = () => {
        return speakers.map((speaker) => ({
            label: `${speaker.FirstName} ${speaker.LastName}`,
            value: speaker.RecordID,
        }))
    }

    const generateVenues = () => {
        return venues.map((venue) => ({
            label: venue.VenueName,
            value: venue.RecordID,
        }))
    }

    const onSubmit = async (data: MainEvent) => {
        setSubmitting(true)
        console.log(data)
        try {
            await createMainEvent(data)
            setShowSuccess(true)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
            reset()
            handleClose()
        }
    }

    const onClose = () => {
        handleClose()
        reset()
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] min-w-[500px] max-h-[95vh] overflow-y-auto">
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-16 flex space-between justify-items"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Create Event
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="EventName"
                                control={control}
                                label="Event Name"
                            />
                        </Grid>
                        <Grid item xs={12} md={5} lg={3}>
                            <FormInputDateTime
                                name="Date"
                                control={control}
                                label="Date"
                            />
                        </Grid>
                        <Grid item xs={12} md={7} lg={4}>
                            <FormInputMultiSelect
                                name="Venue"
                                control={control}
                                label="Venue"
                                options={generateVenues()}
                            />
                        </Grid>
                        <Grid item xs={12} lg={5}>
                            <FormInputMultiSelect
                                name="Speaker"
                                control={control}
                                label="Speaker"
                                options={generateSpeakers()}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormInputTextLong
                                name="EventDescription"
                                control={control}
                                label="Event Description"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormInputTextLong
                                name="EventAbstract"
                                control={control}
                                label="Talk Abstract"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid
                                container
                                justifyContent="flex-end"
                                spacing={2}
                            >
                                <Grid item>
                                    <SubmitButton
                                        submitting={submitting}
                                        onClick={handleSubmit(onSubmit)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>

            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Event created successfully"
            />
        </>
    )
}
