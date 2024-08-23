import { Box, Button, Grid, Modal, Paper, Typography } from '@mui/material'
import 'dayjs/locale/en-au'
import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    DeleteButton,
    DeleteDialog,
    FormInputDateTime,
    FormInputMultiSelect,
    FormInputText,
    FormInputTextLong,
    OutlinedButton,
    SubmitButton,
    UploadButton,
} from '../../../components/'
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar'
import {
    deleteMainEventById,
    updateMainEventById,
} from '../../../scripts/event/function'
import { getAllSpeakers } from '../../../scripts/speaker/functions'
import { getAllVenues } from '../../../scripts/venue/functions'
import { MainEvent, Speaker, Venue } from '../../../types/frontendTypes'
import { useNavigate } from 'react-router-dom'

interface EditEventModalProps {
    event: MainEvent
    handleClose: () => void
    open: boolean
    setEvent: (event: any) => void
}

export const EditEventModal: FC<EditEventModalProps> = ({
    event,
    handleClose,
    open,
    setEvent,
}) => {
    const { handleSubmit, reset, control } = useForm<MainEvent>({
        defaultValues: event,
    })
    const navigate = useNavigate()
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const speakers_: Speaker[] = []
    const venues_: Venue[] = []

    const onSubmit = async (data: MainEvent) => {
        setSubmitting(true)
        try {
            await updateMainEventById(data)
            setShowUpdateSuccess(true)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
            reset()
            handleClose()
            console.log(data)
        }
    }
    const onClose = () => {
        handleClose()
        reset()
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

    const handleDeleteConfirm = async () => {
        try {
            const res = await deleteMainEventById(event.RecordID)
            if (res) {
                setShowDeleteSuccess(true)
                navigate(`/events`)
            } else {
                console.log('Failed to delete event')
            }
        } catch (error) {
            console.error('Error deleting event:', error)
        } finally {
            setOpenDeleteDialog(false)
        }
    }
    const handleDeleteClick = () => {
        setOpenDeleteDialog(true)
    }
    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false)
    }

    const loadingScreen = <>Loading...</>
    const loadedContent = (
        <>
            <>
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
                                spacing={2}
                                justifyContent="space-between"
                            >
                                <Grid item>
                                    <DeleteButton onClick={handleDeleteClick} />
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
                                            <UploadButton
                                                link={process.env.REACT_APP_EVENT_BANNER_FORM+event.RecordID}
                                                name="Banner"
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
                    </Grid>
                </Paper>
                {/* Delete Event */}
                <DeleteDialog
                    open={openDeleteDialog}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    name="event"
                />
                <BottomSuccessSnackbar
                    showSuccess={showDeleteSuccess}
                    setShowSuccess={setShowDeleteSuccess}
                    message="Trip Deleted Successfully"
                />
                {/* Update Event */}
                <BottomSuccessSnackbar
                    showSuccess={showUpdateSuccess}
                    setShowSuccess={setShowUpdateSuccess}
                    message={'Event updated successfully!'}
                />
            </>
        </>
    )
    const loadedModal = (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {loading ? loadingScreen : loadedContent}
        </Modal>
    )

    return loadedModal
}

export default EditEventModal
