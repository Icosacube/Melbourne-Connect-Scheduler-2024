import React, { useState } from 'react'
import { Grid, Modal, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { AxiosResponse } from 'axios'
import { MainEvent, SubEvent, Speaker } from '../../../../types/frontendTypes'
import { createSubEvent } from '../../../../scripts/subevent/functions'
import {
    FormInputText,
    FormInputDateTime,
    FormInputMultiSelect,
    SubmitButton,
    FormInputTextLong,
    BottomSuccessSnackbar,
} from '../../../../components/'

interface CreateSubEventModalProps {
    handleClose: () => void
    open: boolean
    event: MainEvent
    speakers: Speaker[]
    onSubEventCreation: () => void
}

const CreateSubEventFormDefaultValues: SubEvent = {
    RecordID: '',
    EventName: '',
    EventDescription: '',
    EventType: '',
    StartDate: dayjs(),
    Notes: '',
    MainEvent: [],
    Completed: false,
    Speakers: [],
    EndDate: dayjs(),
}

export const CreateSubEventModal: React.FC<CreateSubEventModalProps> = ({
    handleClose,
    open,
    event,
    speakers,
    onSubEventCreation,
}) => {
    const { handleSubmit, reset, control } = useForm<SubEvent>({
        defaultValues: CreateSubEventFormDefaultValues,
    })

    const [showSuccess, setShowSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const onSubmit = async (data: SubEvent) => {
        setSubmitting(true)
        try {
            const res: AxiosResponse = await createSubEvent(
                data,
                event.RecordID
            )
            if (res) {
                setShowSuccess(true)
                onSubEventCreation()
            }
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

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="create-sub-event"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] min-w-[500px] max-h-[95vh] overflow-y-auto">
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-16 flex space-between justify-items"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Create Sub-Event
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
                        <Grid
                            item
                            xs={12}
                            container
                            spacing={2}
                            justifyContent="flex-end"
                        >
                            <Grid item>
                                <SubmitButton
                                    submitting={submitting}
                                    onClick={handleSubmit(onSubmit)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Sub-event created successfully"
            />
        </>
    )
}
