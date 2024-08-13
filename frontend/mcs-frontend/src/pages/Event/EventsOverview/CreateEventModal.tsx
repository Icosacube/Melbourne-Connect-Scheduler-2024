import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar'
import { FormInputDate } from '../../../components/FormComponents/FormInputDate'
import { FormInputMultiSelect } from '../../../components/FormComponents/FormInputDropdown'
import { FormInputText } from '../../../components/FormComponents/FormInputText'
import dayjs, { Dayjs } from 'dayjs'
import { Speaker, Venue } from '../../../types/frontendTypes'
import { MainEvent } from '../../../types/backendTypes'
import { getAllSpeakers } from '../../../scripts/speaker/functions'
import { getAllVenues } from '../../../scripts/venue/functions'
import createEvent from '../../../scripts/event/createEvent'
import {FormInputDateTime} from "../../../components/FormComponents/FormInputDateTime";

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

    const onSubmit = (data: CreateEventFormInput) => {
        // cast data to event type
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
        createEvent(eventData, eventData.Speaker[0])
        setShowSuccess(true)
        reset()
        handleClose()
        setTimeout(() => {
            window.location.reload()
        }, 1000)
        console.log(data)
    }

    const onClose = () => {
        handleClose()
        reset()
    }

    // Intent: load data when first opening modal, and that's it
    const speakers_: Speaker[] = []
    const venues_: Venue[] = []
    const [showSuccess, setShowSuccess] = useState(false)
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

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
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
                            <FormInputDateTime
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
}
