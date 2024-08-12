import { Box, Button, Modal, Typography } from '@mui/material'
import 'dayjs/locale/en-au'
import React, { FC, useEffect, useState } from 'react'
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar'
import updateEvent from '../../../scripts/event/updateEvent'
import { MainEvent, Speaker, Venue } from '../../../types/frontendTypes'
import { FormInputDate } from '../../../components/FormComponents/FormInputDate'
import { FormInputMultiSelect } from '../../../components/FormComponents/FormInputDropdown'
import { FormInputText } from '../../../components/FormComponents/FormInputText'
import { useForm } from 'react-hook-form'
import { Dayjs } from 'dayjs'
import { getAllSpeakers } from '../../../scripts/speaker/functions'
import { getAllVenues } from '../../../scripts/venue/functions'

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
    const speakers_: Speaker[] = []
    const venues_: Venue[] = []

    const onSubmit = () => {
        setEvent(editedEvent)
        updateEvent(editedEvent)
        setShowSuccess(false)
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
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-xl w-9/12">
                    <Typography variant="h5" className="mb-4">
                        Create Event
                    </Typography>
                    {/* Left */}
                    <Box className="flex space-x-10 mb-4">
                        <Box className="space-y-4">
                            <FormInputText
                                name="eventName"
                                control={control}
                                label="Event Name"
                            />
                            <FormInputMultiSelect
                                name="venue"
                                control={control}
                                label="Venue"
                                options={generateVenues()}
                            />
                            <FormInputMultiSelect
                                name="speaker"
                                control={control}
                                label="Speaker"
                                options={generateSpeakers()}
                            />
                        </Box>
                        {/* Right */}
                        <Box className="space-y-4">
                            <FormInputText
                                name="eventDescription"
                                control={control}
                                label="Event Description"
                            />
                            <FormInputText
                                name="eventAbstract"
                                control={control}
                                label="Event Abstract"
                            />
                            <FormInputDate
                                name="date"
                                control={control}
                                label="Date"
                            />
                        </Box>
                    </Box>
                    <Box className="space-x-4">
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            variant={'contained'}
                        >
                            Submit
                        </Button>
                        <Button onClick={() => reset()} variant={'outlined'}>
                            Reset
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Snackbar for success message after event creation */}
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Event created successfully"
            />
        </>
    )

    return loading ? loadingScreen : loadedModal
}

export default EditEventModal
