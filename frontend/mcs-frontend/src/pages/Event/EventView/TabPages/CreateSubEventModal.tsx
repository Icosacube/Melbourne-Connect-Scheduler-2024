import { Grid, Modal, Paper, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import {
    BottomSuccessSnackbar,
    EmailComposerModal,
    FormButtonGroup,
    FormInputDateTime,
    FormInputMultiAutocomplete,
    FormInputText,
    FormInputTextLong,
    SubmitButton,
} from '../../../../components/'
import {
    createSubEvent,
    defaultSubEvent,
} from '../../../../scripts/subevent/functions'
import {
    Academic,
    MainEvent,
    Speaker,
    SubEvent,
} from '../../../../types/frontendTypes'
import { generateEmailTemplateForCreateSubEvent } from '../../../../scripts/email/functions'
import { getAllAcademics } from '../../../../scripts/academic/functions'

interface CreateSubEventModalProps {
    handleClose: () => void
    open: boolean
    event: MainEvent
    speakers: Speaker[]
    onSubEventCreation: () => void
    academics?: Academic[]
    startDate?: Dayjs
    endDate?: Dayjs
}
export const CreateSubEventModal: React.FC<CreateSubEventModalProps> = ({
    handleClose,
    open,
    event,
    speakers,
    onSubEventCreation,
    startDate = dayjs(),
    endDate = dayjs(),
    academics = [],
}) => {
    const { handleSubmit, reset, control, setValue, watch } = useForm<SubEvent>(
        {
            defaultValues: defaultSubEvent,
        }
    )

    const [showSuccess, setShowSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [academicOptions, setAcademicOptions] = useState<Academic[]>([])
    const [openEmailModal, setOpenEmailModal] = useState(false)
    const [emailComposerData, setEmailComposerData] = useState({
        to: [] as string[],
        subject: '',
        body: '',
    })

    useEffect(() => {
        setValue('StartDate', startDate)
        setValue('EndDate', endDate)
    }, [startDate, endDate, setValue])

    useEffect(() => {
        if (academics.length == 0) {
            getAllAcademics().then((academics) => setAcademicOptions(academics))
        } else {
            setAcademicOptions(academics)
        }
    }, [])

    const subEventName = watch('EventName')
    const speakersEmails = watch('Speakers')
        .map((id) => {
            const speaker = speakers.find((s) => s.RecordID === id)
            return speaker ? speaker.PrimaryEmail : null
        })
        .filter((email) => email !== null) as string[]

    const onSubmit = async (data: SubEvent) => {
        setSubmitting(true)
        const { subject, body } = generateEmailTemplateForCreateSubEvent(data)
        setEmailComposerData({
            to: speakersEmails,
            subject: subject,
            body: body,
        })
        try {
            data.MainEvent.push(event.RecordID)
            await createSubEvent(data)
            setShowSuccess(true)
            onSubEventCreation()
            setOpenEmailModal(true)
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
            reset()
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

    const handleEmailModalClose = () => {
        setOpenEmailModal(false)
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
                modalTitle={'New Sub-Event Details: ' + subEventName}
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
                        <FormButtonGroup
                            submitting={submitting}
                            handleClose={handleClose}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                        />
                    </Grid>
                </Paper>
            </Modal>
            {emailComposer()}
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Sub-event created successfully"
            />
        </>
    )
}
