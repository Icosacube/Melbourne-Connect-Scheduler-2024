import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar'
import { FormInputDate } from '../../../components/FormComponents/FormInputDate'
import { FormInputMultiSelect } from '../../../components/FormComponents/FormInputDropdown'
import { FormInputText } from '../../../components/FormComponents/FormInputText'
import dayjs, { Dayjs } from 'dayjs'
import { Speaker } from '../../../types/frontendTypes'

interface CreateEventModalProps {
    handleClose: () => void
    open: boolean
    speakers: Speaker[]
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

const speakers = [
    {
        label: 'Speaker 1',
        value: '1',
    },
    {
        label: 'Speaker 2',
        value: '2',
    },
]

const venue = [
    {
        label: 'Venue 1',
        value: '1',
    },
    {
        label: 'Venue 2',
        value: '2',
    },
]

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
    handleClose,
    open,
    speakers
}) => {
    const { handleSubmit, reset, control } = useForm<CreateEventFormInput>({
        defaultValues: CreateEventFormDefaultValues,
    })

    const onSubmit = (data: CreateEventFormInput) => {
        setShowSuccess(true)
        reset()
        handleClose()
        console.log(data)
    }

    const onClose = () => {
        handleClose()
        reset()
    }

    const [showSuccess, setShowSuccess] = useState(false)

    const generateSpeakers = () => {
        var speakerList: { label: string; value: string }[] = []
        var count = 1
        speakers.forEach(speaker => {
            
            speakerList.push({
                label: `${speaker.FirstName} ${speaker.LastName}`,
                value: `${count++}`
            })
        });

        return speakerList;
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
                                options={venue}
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
}
