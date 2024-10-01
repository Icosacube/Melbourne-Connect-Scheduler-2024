import { Grid, Modal, Paper, Typography } from '@mui/material'
import 'dayjs/locale/en-au'
import { FC, useState } from 'react'
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
} from '../../components'
import {
    createMainEvent,
    defaultMainEvent,
    deleteMainEventById,
    updateMainEventById,
} from '../../scripts/event/functions'
import { MainEvent, Speaker, Venue } from '../../types/frontendTypes'

interface EventFormModalProps {
    event?: MainEvent
    speakers: Speaker[]
    venues: Venue[]
    handleClose: () => void
    open: boolean
    variant?: 'create' | 'edit'
}

export const EventFormModal: FC<EventFormModalProps> = ({
    event = defaultMainEvent,
    handleClose,
    open,
    speakers,
    venues,
    variant = 'create',
}) => {
    const { handleSubmit, reset, control, watch } = useForm<MainEvent>({
        defaultValues: event,
    })
    const navigate = useNavigate()
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const revalidator = useRevalidator()

    const onSubmit = async (data: MainEvent) => {
        setSubmitting(true)
        try {
            let res
            if (variant === 'create') {
                res = await createMainEvent(data)
            } else {
                res = await updateMainEventById(data)
            }
            if (res.status === 200) {
                setShowUpdateSuccess(true)
                revalidator.revalidate()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
            reset()
            handleClose()
            console.log(data)
        }
    }

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
    const isSubmitDisabled = () => {
        const eventName = watch('EventName')
        const speakers = watch('Speaker').length
        return !eventName || speakers === 0
    }
    const isVariantCreate = () => {
        return variant === 'create'
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9/12 max-h-[90vh] overflow-y-auto">
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-16 flex space-between justify-items"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                {isVariantCreate()
                                    ? 'Create Event'
                                    : 'Edit Event'}
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
                                    {
                                        // Only show delete button if editing
                                        !isVariantCreate() && (
                                            <DeleteButton
                                                onClick={handleDeleteClick}
                                                deleting={deleting}
                                            />
                                        )
                                    }
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
                                                disabled={isSubmitDisabled()}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
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
                message="Event Deleted Successfully"
            />
            {/* Update Event */}
            <BottomSuccessSnackbar
                showSuccess={showUpdateSuccess}
                setShowSuccess={setShowUpdateSuccess}
                message={
                    isVariantCreate()
                        ? 'Event Created Successfully'
                        : 'Event Updated Successfully'
                }
            />
        </>
    )
}

export default EventFormModal
