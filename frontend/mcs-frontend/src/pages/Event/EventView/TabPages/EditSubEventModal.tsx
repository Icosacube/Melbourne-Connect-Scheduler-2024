import React, { FC, useState } from 'react'
import { Grid, Modal, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { AxiosResponse } from 'axios'
import {
    BottomSuccessSnackbar,
    DeleteButton,
    FormInputDateTime,
    FormInputMultiSelect,
    FormInputText,
    FormInputTextLong,
    OutlinedButton,
    SubmitButton,
} from '../../../../components/'
import {
    updateSubEventByID,
    deleteSubEventByID,
} from '../../../../scripts/subevent/functions'
import { SubEvent, Speaker } from '../../../../types/frontendTypes'
import { DeleteDialog } from '../../../../components/'

interface EditSubEventModalProps {
    subEvent: SubEvent
    handleClose: () => void
    open: boolean
    speakers: Speaker[]
    updateSubEvent: (subEvent: SubEvent) => void
    removeSubEvent: (id: string) => void
}

export const EditSubEventModal: FC<EditSubEventModalProps> = ({
    subEvent,
    handleClose,
    open,
    speakers,
    updateSubEvent: updateSubEvent,
    removeSubEvent,
}) => {
    const { handleSubmit, reset, control } = useForm<SubEvent>({
        defaultValues: subEvent,
    })

    const [submitting, setSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const onSubmit = async (data: SubEvent) => {
        setSubmitting(true)
        try {
            const res: AxiosResponse = await updateSubEventByID(data)
            if (res.status !== 200) {
                throw new Error('Failed to update sub-event')
            }
            setShowSuccess(true)
            updateSubEvent(data)
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
            reset()
            handleClose()
        }
    }

    const onClose = () => {
        reset()
        handleClose()
    }

    const handleDeleteConfirm = async () => {
        try {
            setDeleting(true)
            const res = await deleteSubEventByID(subEvent.RecordID)
            if (res) {
                setShowDeleteSuccess(true)
                removeSubEvent(subEvent.RecordID)
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

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                // aria-labelledby="update-sub-event"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] min-w-[500px] max-h-[95vh] overflow-y-auto">
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-16 flex space-between justify-items"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Update Sub-Event
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <FormInputText
                                name="EventName"
                                control={control}
                                label="Event Name"
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <FormInputText
                                name="EventType"
                                control={control}
                                label="Event Type"
                            />
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <FormInputMultiSelect
                                name="Speakers"
                                control={control}
                                label="Speakers"
                                options={speakers.map((speaker) => ({
                                    label: `${speaker.FirstName} ${speaker.LastName}`,
                                    value: speaker.RecordID,
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <FormInputDateTime
                                name="StartDate"
                                control={control}
                                label="Start"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <FormInputDateTime
                                name="EndDate"
                                control={control}
                                label="End"
                            />
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <FormInputTextLong
                                name="EventDescription"
                                control={control}
                                label="Event Description"
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormInputTextLong
                                name="Notes"
                                control={control}
                                label="Notes"
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
                                                onClick={handleSubmit(onSubmit)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
            <DeleteDialog
                open={openDeleteDialog}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                deleting={deleting}
            />
            <BottomSuccessSnackbar
                showSuccess={showDeleteSuccess}
                setShowSuccess={setShowDeleteSuccess}
                message="Sub-event deleted successfully"
            />
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Sub-event updated successfully"
            />
        </>
    )
}
