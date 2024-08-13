import React, { useEffect, useState } from 'react'
import { Button, Grid, Modal, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import BottomSuccessSnackbar from '../../components/BottomSuccessSnackbar/BottomSuccessSnackbar'
import { FormInputDate } from '../../components/FormComponents/FormInputDate'
import { FormInputMultiSelect } from '../../components/FormComponents/FormInputDropdown'
import { DropdownOptions } from '../../components/FormComponents/FormInputProps'
import { createTrip, defaultTrip } from '../../scripts/trip/function'
import { MainEvent, Speaker, Trip } from '../../types/frontendTypes'
import { FormInputDropdownSingle } from '../../components/FormComponents/FormInputDropdownSingle'

interface CreateTripModalProps {
    handleClose: () => void
    open: boolean
    events: MainEvent[]
    speakers: Speaker[]
}

export const CreateTripModal: React.FC<CreateTripModalProps> = ({
    handleClose,
    open,
    events,
    speakers,
}) => {
    const { handleSubmit, reset, control, setValue, watch } = useForm<Trip>({
        defaultValues: defaultTrip,
    })

    const [showSuccess, setShowSuccess] = useState(false)
    const [filteredSpeakers, setFilteredSpeakers] = useState<DropdownOptions[]>(
        []
    )
    const selectedEventIds = watch('MainEvent') || []

    useEffect(() => {
        // Reset speaker options when no event is selected
        if (selectedEventIds.length === 0) {
            setFilteredSpeakers([])
            return
        }

        // collect all speaker IDs from the selected events
        const selectedEventSpeakers = new Set<string>()
        selectedEventIds.forEach((eventId) => {
            const event = events.find((e) => e.RecordID === eventId)
            if (event) {
                event.Speaker.forEach((speakerId) =>
                    selectedEventSpeakers.add(speakerId)
                )
            }
        })

        // Filter speaker dropdown optionss
        const newSpeakers = speakers
            .filter((speaker) => selectedEventSpeakers.has(speaker.RecordID))
            .map((speaker) => ({
                label: `${speaker.FirstName} ${speaker.LastName}`,
                value: speaker.RecordID,
            }))

        setFilteredSpeakers(newSpeakers)
    }, [selectedEventIds, events, speakers])

    const onClose = () => {
        reset()
        handleClose()
    }

    const onSubmit = async (data: Trip) => {
        try {
            const res = await createTrip(data)
            if (res) {
                setShowSuccess(true)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                console.log('Failed to create trip')
            }
        } catch (error) {
            console.error(error)
        } finally {
            reset()
            onClose()
        }
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
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-7 flex space-between justify-items"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                Create New Trip
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputMultiSelect
                                name="MainEvent"
                                control={control}
                                label="Event"
                                options={events.map((event) => ({
                                    label: event.EventName,
                                    value: event.RecordID,
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <FormInputDropdownSingle
                                name="GuestSpeaker"
                                control={control}
                                label="Speaker"
                                options={filteredSpeakers}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormInputDate
                                name="StartDate"
                                control={control}
                                label="Start Date"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormInputDate
                                name="EndDate"
                                control={control}
                                label="End Date"
                            />
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end">
                            <Button
                                variant="contained"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Trip Created Successfully"
            />
        </>
    )
}
