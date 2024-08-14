import React, { useEffect, useState } from 'react'
import { Button, Grid, Modal, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar'
import { FormInputDateTime } from '../../../components/FormComponents/FormInputDateTime'
import { FormInputTextLong } from '../../../components/FormComponents/FormInputTextLong'
import { FormInputMultiSelect } from '../../../components/FormComponents/FormInputDropdown'
import { FormInputText } from '../../../components/FormComponents/FormInputText'
import dayjs, { Dayjs } from 'dayjs'
import { Speaker, Venue } from '../../../types/frontendTypes'
import { MainEvent } from '../../../types/backendTypes'
import { getAllSpeakers } from '../../../scripts/speaker/functions'
import { getAllVenues } from '../../../scripts/venue/functions'
import createEvent from '../../../scripts/event/createEvent'

interface CreateEventModalProps {
    handleClose: () => void
    open: boolean
}

interface CreateEventFormInput {
    speaker: string[]
    venue: string[]
    date: Dayjs
    eventDescription: string
    eventName: string
    eventAbstract: string
}

const CreateEventFormDefaultValues = {
    speaker: [],
    venue: [],
    date: dayjs(),
    eventDescription: '',
    eventName: '',
    eventAbstract: '',
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
    handleClose,
    open,
}) => {
    const { handleSubmit, reset, control } = useForm<CreateEventFormInput>({
        defaultValues: CreateEventFormDefaultValues,
    })

    const [showSuccess, setShowSuccess] = useState(false)
    const [speakers, setSpeakers] = useState<Speaker[]>([])
    const [venues, setVenues] = useState<Venue[]>([])
    const [loading, setLoading] = useState(true)

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

    const onSubmit = (data: CreateEventFormInput) => {
        const eventData: MainEvent = {
            EventName: data.eventName,
            EventAbstract: data.eventAbstract,
            EventDescription: data.eventDescription,
            EventbriteLink: '',
            EventBanner: '',
            Date: data.date.toString(),
            Notes: '',
            Speaker: data.speaker,
            GuestAcademic: [],
            Catering: [],
            Venue: data.venue,
            Service: [],
            Completed: false,
            Trip: [],
            SubEvent: [],
        }
        createEvent(eventData, data.speaker[0])
            .then(() => {
                setShowSuccess(true)
                reset()
                handleClose()
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
            .catch((error) => console.error(error))
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
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 w-9/12">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" className="mb-4">
                                Create Event
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="eventName"
                                control={control}
                                label="Event Name"
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <FormInputDateTime
                                name="date"
                                control={control}
                                label="Date"
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <FormInputMultiSelect
                                name="speaker"
                                control={control}
                                label="Speaker"
                                options={generateSpeakers()}
                            />
                        </Grid>


                        <Grid item xs={12} sm={12} md={4}>
                            <FormInputMultiSelect
                                name="venue"
                                control={control}
                                label="Venue"
                                options={generateVenues()}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormInputTextLong
                                name="eventAbstract"
                                control={control}
                                label="Talk Abstract"
                            />
                        </Grid>
                        <Grid item xs={12}  md={6}>
                            <FormInputTextLong
                                name="eventDescription"
                                control={control}
                                label="Event Description"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid
                                container
                                justifyContent="flex-end"
                                spacing={2}
                            >
                                <Grid item>
                                    <Button
                                        onClick={handleSubmit(onSubmit)}
                                        variant="contained"
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => reset()}
                                        variant="outlined"
                                    >
                                        Reset
                                    </Button>
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
