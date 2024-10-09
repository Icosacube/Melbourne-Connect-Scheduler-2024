import { Grid, Modal, Paper, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    BottomSuccessSnackbar,
    FormButtonGroup,
    FormInputDateTime,
    FormInputMultiAutocomplete,
    FormInputText,
    FormInputTextLong,
    SubmitButton,
} from '../../../../components/'
import { createSubEvent } from '../../../../scripts/subevent/functions'
import { MainEvent, Speaker, SubEvent } from '../../../../types/frontendTypes'

interface CreateSubEventModalProps {
    handleClose: () => void
    open: boolean
    event: MainEvent
    speakers: Speaker[]
    onSubEventCreation: () => void
    startDate?: Dayjs
    endDate?: Dayjs
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
    startDate = dayjs(),
    endDate = dayjs(),
}) => {
    const { handleSubmit, reset, control, setValue } = useForm<SubEvent>({
        defaultValues: CreateSubEventFormDefaultValues,
    })

    const [showSuccess, setShowSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        setValue('StartDate', startDate)
        setValue('EndDate', endDate)
    }, [startDate, endDate, setValue])

    const onSubmit = async (data: SubEvent) => {
        setSubmitting(true)
        try {
            data.MainEvent.push(event.RecordID)
            await createSubEvent(data)
            setShowSuccess(true)
            onSubEventCreation()
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
        if (startDate) {
            setValue('StartDate', startDate)
            setValue('EndDate', endDate)
        }
        handleClose()
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="create-sub-event"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] min-w-[450px] max-h-[95vh] overflow-y-auto">
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
                        <FormButtonGroup
                            submitting={submitting}
                            handleClose={handleClose}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                        />
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
