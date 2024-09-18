import { Grid, Modal, Paper, Typography } from '@mui/material'
import 'dayjs/locale/en-au'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useRevalidator } from 'react-router-dom'
import {
    BottomSuccessSnackbar,
    DeleteButton,
    DeleteDialog,
    FormInputDateTime,
    FormInputMultiSelect,
    FormInputText,
    FormInputTextLong,
    FormInputVenue,
    OutlinedButton,
    SubmitButton,
    UploadButton,
} from '../../../components/'
import {
    deleteMainEventById,
    updateMainEventById,
} from '../../../scripts/event/functions'
import { getAllSpeakers } from '../../../scripts/speaker/functions'
import { MainEvent, Speaker, Venue } from '../../../types/frontendTypes'

interface EditEventModalProps {
    event: MainEvent
    handleClose: () => void
    open: boolean
    venues: Venue[]
}

export const EditEventModal: FC<EditEventModalProps> = ({
    event,
    handleClose,
    open,
    venues,
}) => {
    const { handleSubmit, reset, control } = useForm<MainEvent>({
        defaultValues: event,
    })
    const navigate = useNavigate()
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const [deleting, setDeleting] = useState(false)
    const revalidator = useRevalidator()

    const speakers_: Speaker[] = []

    const onSubmit = async (data: MainEvent) => {
        setSubmitting(true)
        try {
            await updateMainEventById(data)
            setShowUpdateSuccess(true)
            revalidator.revalidate()
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
            reset()
            handleClose()
            console.log(data)
        }
    }
    const [speakers, setSpeakers] = useState(speakers_)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (loading && open) {
            const fetchData = async () => {
                console.log('loading data!', loading, open)
                setSpeakers(await getAllSpeakers())
                setLoading(false)
            }

            fetchData()
        }
    }, [speakers, open])

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

    const handleDeleteConfirm = async () => {
        try {
            setDeleting(true)
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
            setDeleting(false)
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
            <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9/12 max-h-[90vh] overflow-y-auto">
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
                    <Grid item xs={12} md={7} lg={4} sx={{ mt: 1 }}>
                        <FormInputVenue
                            control={control}
                            name="Venue"
                            venues={venues}
                            label="Venue"
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
                                        <UploadButton
                                            link={
                                                process.env
                                                    .REACT_APP_EVENT_BANNER_FORM +
                                                event.RecordID
                                            }
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
                deleting={deleting}
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
