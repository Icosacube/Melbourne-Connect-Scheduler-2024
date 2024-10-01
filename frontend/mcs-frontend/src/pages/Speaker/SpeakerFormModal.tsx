import { Grid, Modal, Paper, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRevalidator } from 'react-router-dom'
import {
    BottomSuccessSnackbar,
    FormInputText,
    FormInputTextLong,
    SubmitButton,
} from '../../components'
import {
    createSpeaker,
    defaultSpeaker,
    updateSpeaker,
} from '../../scripts/speaker/functions'
import { Speaker } from '../../types/frontendTypes'

interface SpeakerFormModalProps {
    handleClose: () => void
    open: boolean
    variant?: 'create' | 'edit'
    speaker?: Speaker
}

export const SpeakerFormModal: React.FC<SpeakerFormModalProps> = ({
    handleClose,
    open,
    variant = 'create',
    speaker = defaultSpeaker,
}) => {
    const { handleSubmit, reset, control, watch } = useForm<Speaker>({
        defaultValues: speaker,
    })

    const [showSuccess, setShowSuccess] = useState(false)
    const [tabValue, setTabValue] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const revalidator = useRevalidator()

    const onSubmit = async (data: Speaker) => {
        setSubmitting(true)
        try {
            let res
            if (variant === 'create') {
                res = await createSpeaker(data)
            } else {
                res = await updateSpeaker(data)
            }

            if (res.status === 200) {
                setShowSuccess(true)
                revalidator.revalidate()
            } else {
                console.log('Failed to create speaker')
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
        handleClose()
        reset()
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const isSubmitDisabled = () => {
        const firstName = watch('FirstName')
        const lastName = watch('LastName')
        const PrimaryEmail = watch('PrimaryEmail')
        return !firstName || !lastName || !PrimaryEmail
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[75vh] overflow-y-auto">
                    <Grid container spacing={3} className="w-full p-16">
                        <Grid item xs={12} lg={6}>
                            <Typography variant="h4">
                                {variant === 'create'
                                    ? 'Create Speaker'
                                    : 'Update Speaker'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                aria-label="form tabs"
                            >
                                <Tab label="About" />
                                <Tab label="Contact" />
                                <Tab label="Work" />
                                <Tab label="Misc" />
                            </Tabs>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            spacing={3}
                            marginTop={'12px'}
                        >
                            {tabValue === 0 && (
                                <Grid container item spacing={3}>
                                    <Grid item xs={6} md={3}>
                                        <FormInputText
                                            name="Title"
                                            control={control}
                                            label="Title"
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <FormInputText
                                            name="AlternativeTitle"
                                            control={control}
                                            label="Alternative Title"
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <FormInputText
                                            name="Pronouns"
                                            control={control}
                                            label="Pronouns"
                                        />
                                    </Grid>

                                    <Grid item xs={6} md={3}>
                                        <FormInputText
                                            name="Headshot"
                                            control={control}
                                            label="Headshot"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormInputText
                                            name="FirstName"
                                            control={control}
                                            label="First Name"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormInputText
                                            name="LastName"
                                            control={control}
                                            label="Last Name"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormInputTextLong
                                            name="Bio"
                                            control={control}
                                            label="Bio"
                                            rows={2}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormInputText
                                            name="PrimaryEmail"
                                            control={control}
                                            label="Primary Email"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormInputText
                                            name="Phone"
                                            control={control}
                                            label="Phone"
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            {tabValue === 1 && (
                                <Grid container item spacing={3}>
                                    <Grid item xs={12}>
                                        <FormInputText
                                            name="Address"
                                            control={control}
                                            label="Street"
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={2}>
                                        <FormInputText
                                            name="CitySuburb"
                                            control={control}
                                            label="City/Suburb"
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={2}>
                                        <FormInputText
                                            name="State"
                                            control={control}
                                            label="State"
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={2}>
                                        <FormInputText
                                            name="Country"
                                            control={control}
                                            label="Country"
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <FormInputText
                                            name="Postcode"
                                            control={control}
                                            label="Postcode"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormInputText
                                            name="PreferredTimezone"
                                            control={control}
                                            label="Timezone"
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            {tabValue === 2 && (
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} md={3}>
                                        <FormInputText
                                            name="WorkTitle"
                                            control={control}
                                            label="Work Title"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormInputText
                                            name="Area"
                                            control={control}
                                            label="Area"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormInputText
                                            name="Category"
                                            control={control}
                                            label="Category"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormInputText
                                            name="Organisation"
                                            control={control}
                                            label="Organisation"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormInputText
                                            name="Department"
                                            control={control}
                                            label="Department"
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            {tabValue === 3 && (
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} md={5}>
                                        <FormInputText
                                            name="EmergencyContactName"
                                            control={control}
                                            label="Emergency Contact Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <FormInputText
                                            name="EmergencyContactRelationship"
                                            control={control}
                                            label="Relationship"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <FormInputText
                                            name="EmergencyContactNumber"
                                            control={control}
                                            label="Emergency Contact Number"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <FormInputText
                                            name="FlyerMembershipName"
                                            control={control}
                                            label="Flyer Membership Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <FormInputText
                                            name="FlyerMembershipNumber"
                                            control={control}
                                            label="Flyer Membership Number"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <FormInputText
                                            name="Confirmed"
                                            control={control}
                                            label="Confirmed"
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Grid
                                container
                                spacing={2}
                                justifyContent="flex-end"
                                alignContent="end"
                            >
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
                </Paper>
            </Modal>

            {/* Snackbar for success message after event creation */}
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Speaker created successfully"
            />
        </>
    )
}
