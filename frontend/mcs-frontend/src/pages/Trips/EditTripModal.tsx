import React, { useEffect, useState } from 'react'
import { Grid, Modal, Paper, Typography, CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
    DeleteButton,
    DeleteDialog,
    FormInputDate,
    FormInputMultiSelect,
    FormInputSingleSelect,
    OutlinedButton,
    SubmitButton,
    BottomSuccessSnackbar,
} from '../../components/'
import { DropdownOptions } from '../../components/FormComponents/FormInputProps'
import { updateTrip, deleteTrip } from '../../scripts/trip/functions'
import { MainEvent, Speaker, Trip } from '../../types/frontendTypes'
import { getAllSpeakers } from '../../scripts/speaker/functions'
import { getAllMainEvents } from '../../scripts/event/functions'

interface EditTripModalProps {
    handleClose: () => void
    open: boolean
    trip: Trip
}

export const EditTripModal: React.FC<EditTripModalProps> = ({
    handleClose,
    open,
    trip,
}) => {
    const { handleSubmit, reset, control, watch } = useForm<Trip>({
        defaultValues: trip,
    })
    const navigate = useNavigate()
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false)
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [loading, setLoading] = useState(true)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [events, setEvents] = useState<MainEvent[]>([])
    const [speakers, setSpeakers] = useState<Speaker[]>([])
    const selectedEventIds = watch('MainEvent') || []
    const [filteredSpeakers, setFilteredSpeakers] = useState<DropdownOptions[]>(
        []
    )

    useEffect(() => {
        if (open) {
            setLoading(true)
            Promise.all([getAllMainEvents(), getAllSpeakers()])
                .then(([events, speakers]) => {
                    setEvents(events)
                    setSpeakers(speakers)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [open])

    useEffect(() => {
        if (selectedEventIds.length === 0) {
            setFilteredSpeakers([])
            return
        }

        const selectedEventSpeakers = new Set<string>()
        selectedEventIds.forEach((eventId) => {
            const event = events.find((e) => e.RecordID === eventId)
            if (event) {
                event.Speaker.forEach((speakerId) =>
                    selectedEventSpeakers.add(speakerId)
                )
            }
        })

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
        setSubmitting(true)
        try {
            const res = await updateTrip(data)
            if (res) {
                setShowUpdateSuccess(true)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                console.log('Failed to update trip')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
            reset()
            onClose()
        }
    }

    const handleDeleteClick = () => {
        setOpenDeleteDialog(true)
    }
    const handleDeleteConfirm = async () => {
        try {
            setDeleting(true)
            const res = await deleteTrip(trip.RecordID)
            if (res) {
                setShowDeleteSuccess(true)
                navigate(`/trips`)
            } else {
                console.log('Failed to delete flight')
            }
        } catch (error) {
            console.error('Error deleting flight:', error)
        } finally {
            setOpenDeleteDialog(false)
            setDeleting(false)
        }
    }

    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false)
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="edit-trip-modal"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] min-w-[480px] max-h-[95vh] overflow-y-auto">
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-16 flex space-between justify-items"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Edit Trip
                            </Typography>
                        </Grid>
                        {loading ? (
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                style={{ minHeight: '200px' }}
                            >
                                <CircularProgress />
                            </Grid>
                        ) : (
                            <>
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
                                    <FormInputSingleSelect
                                        name="GuestSpeaker"
                                        control={control}
                                        label="Speaker"
                                        options={filteredSpeakers}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormInputDate
                                        name="StartDate"
                                        control={control}
                                        label="Start Date"
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormInputDate
                                        name="EndDate"
                                        control={control}
                                        label="End Date"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        spacing={2}
                                        justifyContent="space-between"
                                    >
                                        <Grid item>
                                            <DeleteButton
                                                onClick={handleDeleteClick}
                                                deleting={deleting}
                                            />
                                        </Grid>
                                        <Grid item>
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
                                                        onClick={handleSubmit(
                                                            onSubmit
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Paper>
            </Modal>

            <DeleteDialog
                open={openDeleteDialog}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                name="trip"
                deleting={deleting}
            />
            <BottomSuccessSnackbar
                showSuccess={showUpdateSuccess}
                setShowSuccess={setShowUpdateSuccess}
                message="Trip Updated Successfully"
            />
            <BottomSuccessSnackbar
                showSuccess={showDeleteSuccess}
                setShowSuccess={setShowDeleteSuccess}
                message="Trip Deleted Successfully"
            />
        </>
    )
}
