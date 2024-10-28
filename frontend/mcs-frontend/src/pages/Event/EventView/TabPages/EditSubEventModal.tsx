import React, { FC, useEffect, useState } from 'react'
import { Grid, Modal, Paper, Typography } from '@mui/material'
import { set, useForm } from 'react-hook-form'
import { AxiosResponse } from 'axios'
import {
    BottomSuccessSnackbar,
    DeleteButton,
    EmailComposerModal,
    FormInputDateTime,
    FormInputMultiAutocomplete,
    FormInputText,
    FormInputTextLong,
    OutlinedButton,
    SubmitButton,
} from '../../../../components/'
import {
    updateSubEventByID,
    deleteSubEventByID,
} from '../../../../scripts/subevent/functions'
import { SubEvent, Speaker, Academic } from '../../../../types/frontendTypes'
import { DeleteDialog } from '../../../../components/'
import { getAllAcademics } from '../../../../scripts/academic/functions'

import {
    generateEmailTemplateForCreateSubEvent,
    generateEmailTemplateForEditSubEvent,
} from '../../../../scripts/email/functions'

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
    updateSubEvent,
    removeSubEvent,
}) => {
    const { handleSubmit, reset, control, watch } = useForm<SubEvent>({
        defaultValues: subEvent,
    })

    const [submitting, setSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openEmailModal, setOpenEmailModal] = useState(false)
    const [emailComposerData, setEmailComposerData] = useState({
        to: [] as string[],
        subject: '',
        body: '',
    })
    const [academicOptions, setAcademicOptions] = useState<Academic[]>([])

    useEffect(() => {
        getAllAcademics().then((academics) => setAcademicOptions(academics))
    }, [subEvent])

    const onSubmit = async (data: SubEvent) => {
        setSubmitting(true)
        const { subject, body } = generateEmailTemplateForEditSubEvent(subEvent)
        setEmailComposerData({
            to: speakerEmails,
            subject: subject,
            body: body,
        })
        try {
            const res: AxiosResponse = await updateSubEventByID(data)
            if (res.status !== 200) {
                throw new Error('Failed to update sub-event')
            }
            setShowSuccess(true)
            updateSubEvent(data)
            setOpenEmailModal(true)
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
            reset()
        }
    }

    const watchedSpeakers = watch('Speakers', subEvent.Speakers)

    const speakerEmails = watchedSpeakers
        .map((id) => {
            const speaker = speakers.find((s) => s.RecordID === id)
            return speaker ? speaker.PrimaryEmail : null
        })
        .filter((email) => email !== null) as string[]

    const onClose = () => {
        reset()
        handleClose()
    }

    const handleEmailModalOpen = () => setOpenEmailModal(true)
    const handleEmailModalClose = () => setOpenEmailModal(false)

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

    const emailComposer = () => {
        if (!openEmailModal) {
            return <></>
        }
        return (
            <EmailComposerModal
                open={true}
                onClose={handleEmailModalClose}
                to={emailComposerData.to}
                modalTitle={`Sub-Event Details: ${subEvent.EventName}`}
                subject={emailComposerData.subject}
                body={emailComposerData.body}
            />
        )
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                // aria-labelledby="update-sub-event"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] min-w-[450px] max-h-[95vh] overflow-y-auto">
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
                        <Grid item xs={12} md={8}>
                            <FormInputText
                                name="EventName"
                                control={control}
                                label="Event Name"
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormInputText
                                name="EventType"
                                control={control}
                                label="Event Type"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormInputMultiAutocomplete
                                name="Speakers"
                                control={control}
                                label="Speakers"
                                options={speakers.map((speaker) => ({
                                    label: `${speaker.FirstName} ${speaker.LastName}`,
                                    value: speaker.RecordID,
                                }))}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormInputMultiAutocomplete
                                name="Academics"
                                control={control}
                                label="Academics"
                                options={academicOptions.map((academic) => ({
                                    label: `${academic.Name}`,
                                    value: academic.RecordID,
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormInputDateTime
                                name="StartDate"
                                control={control}
                                label="Start"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="space-between"
                        >
                            <Grid item>
                                <OutlinedButton
                                    name="Cancel"
                                    onClick={handleClose}
                                />
                            </Grid>
                            <Grid
                                item
                                container
                                spacing={2}
                                justifyContent="flex-end"
                                xs="auto"
                            >
                                <Grid item>
                                    <DeleteButton
                                        onClick={handleDeleteClick}
                                        deleting={deleting}
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
                </Paper>
            </Modal>
            {emailComposer()}
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
