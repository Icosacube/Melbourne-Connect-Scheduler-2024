import { Button, Modal, Typography, Paper, Grid } from '@mui/material'
import 'dayjs/locale/en-au'
import React, { FC, useEffect, useState } from 'react'
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar'
import { MainEvent, Speaker, Venue } from '../../../types/frontendTypes'
import { FormInputDate } from '../../../components/FormComponents/FormInputDate'
import {
    FormInputDateTime,
    FormInputMultiSelect,
    FormInputText,
    FormInputTextLong,
    OutlinedButton,
    SubmitButton,
} from '../../../components/'
import { useForm } from 'react-hook-form'
import { Dayjs } from 'dayjs'
import { getAllSpeakers } from '../../../scripts/speaker/functions'
import { getAllVenues } from '../../../scripts/venue/functions'
import updateMainEvent from '../../../scripts/event/functions'

interface EditEventModalProps {
    event: MainEvent
    handleClose: () => void
    open: boolean
    setEvent: (event: any) => void
}

interface CreateEventFormInput {
    speaker: string[]
    venue: string[]
    date: Dayjs
    eventDescription: string
    eventName: string
    eventAbstract: string
}

export const EditEventModal: FC<EditEventModalProps> = ({
    event,
    handleClose,
    open,
    setEvent,
}) => {
    const EditEventFormDefaultValues = {
        speaker: event.Speaker,
        venue: event.Venue,
        date: event.Date,
        eventDescription: event.EventDescription,
        eventName: event.EventName,
        eventAbstract: event.EventAbstract,
    }

    const { handleSubmit, reset, control } = useForm<CreateEventFormInput>({
        defaultValues: EditEventFormDefaultValues,
    })
    const [editedEvent, setEditedEvent] = useState(event)
    const [showSuccess, setShowSuccess] = useState(false)

    const [submitting, setSubmitting] = useState(false)

    const speakers_: Speaker[] = []
    const venues_: Venue[] = []

    const onSubmit = () => {
        setSubmitting(true)
        setEvent(editedEvent)
        updateMainEvent(editedEvent)
        setShowSuccess(false)

        setSubmitting(false)
        handleClose()
        setTimeout(() => {
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
            }, 2000)
        }, 0)
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
    const [speakers, setSpeakers] = useState(speakers_)
    const [venues, setVenues] = useState(venues_)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (loading && open) {
            const fetchData = async () => {
                console.log('loading data!', loading, open)
                setSpeakers(await getAllSpeakers())
                setVenues(await getAllVenues())
                setLoading(false)
            }

            fetchData()
        }
    }, [speakers, venues, open])

    // Process data into dropdown form
    const generateSpeakers = () => {
        var speakerList: { label: string; value: string }[] = []
        speakers.forEach((speaker) => {
            speakerList.push({
                label: `${speaker.FirstName} ${speaker.LastName}`,
                value: `${speaker.RecordID}`,
            })
        })

        return speakerList
    }

    const generateVenues = () => {
        var venueList: { label: string; value: string }[] = []
        venues.forEach((venue) => {
            venueList.push({
                label: `${venue.VenueName}`,
                value: `${venue.RecordID}`,
            })
        })

        return venueList
    }

    const loadingScreen = <>Loading...</>
    const loadedModal = (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] min-w-[500px] max-h-[90vh] overflow-y-auto">
                <Grid
                    container
                    spacing={3}
                    className="w-full p-16 flex space-between justify-items"
                >
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Edit Event
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormInputText
                            name="eventName"
                            control={control}
                            label="Event Name"
                        />
                    </Grid>
                    <Grid item xs={12} md={5} lg={3}>
                        <FormInputDateTime
                            name="date"
                            control={control}
                            label="Date"
                        />
                    </Grid>
                    <Grid item xs={12} md={7} lg={4}>
                        <FormInputMultiSelect
                            name="venue"
                            control={control}
                            label="Venue"
                            options={generateVenues()}
                        />
                    </Grid>
                    <Grid item xs={12} lg={5}>
                        <FormInputMultiSelect
                            name="speaker"
                            control={control}
                            label="Speaker"
                            options={generateSpeakers()}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormInputTextLong
                            name="eventDescription"
                            control={control}
                            label="Event Description"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormInputTextLong
                            name="eventAbstract"
                            control={control}
                            label="Talk Abstract"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid
                                container
                                spacing={2}
                                justifyContent="flex-end"
                            >
                                <Grid item>
                                    <OutlinedButton
                                        onClick={() => reset()}
                                        name={'Reset'}
                                    />
                                </Grid>
                                <Grid item>
                                    <SubmitButton
                                        submitting={submitting}
                                        onClick={handleSubmit(onSubmit)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )

    return loading ? loadingScreen : loadedModal
}

export default EditEventModal
