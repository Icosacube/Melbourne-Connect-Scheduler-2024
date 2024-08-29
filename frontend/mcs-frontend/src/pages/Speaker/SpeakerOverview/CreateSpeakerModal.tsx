import { Grid, Modal, Paper, Typography } from '@mui/material'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    FormInputText,
    FormInputTextLong,
    SubmitButton,
    BottomSuccessSnackbar,
} from '../../../components/'
import {
    createSpeaker,
    defaultSpeaker,
} from '../../../scripts/speaker/functions'
import { Speaker } from '../../../types/frontendTypes'
import { useRevalidator } from 'react-router-dom'

interface CreateSpeakerModalProps {
    handleClose: () => void
    open: boolean
}

export const CreateSpeakerModal: React.FC<CreateSpeakerModalProps> = ({
    handleClose,
    open,
}) => {
    const { handleSubmit, reset, control } = useForm<Speaker>({
        defaultValues: defaultSpeaker,
    })
    const revalidator = useRevalidator()

    const onSubmit = async (data: Speaker) => {
        setSubmitting(true)
        try {
            const res: AxiosResponse = await createSpeaker(data)
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
            console.log(data)
        }
    }
    const onClose = () => {
        handleClose()
        reset()
    }

    const [showSuccess, setShowSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] min-w-[500px] max-h-[95vh] overflow-y-auto">
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-16 flex space-between justify-items"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Create Speaker
                            </Typography>
                        </Grid>
                        <Grid item xs={12} container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6">About</Typography>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <FormInputText
                                    name="Title"
                                    control={control}
                                    label="Title"
                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <FormInputText
                                    name="AlternativeTitle"
                                    control={control}
                                    label="Alternative Title"
                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <FormInputText
                                    name="Pronouns"
                                    control={control}
                                    label="Pronouns"
                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <FormInputText
                                    name="Headshot"
                                    control={control}
                                    label="Headshot"
                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <FormInputText
                                    name="Confirmed"
                                    control={control}
                                    label="Confirmed"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputText
                                    name="FirstName"
                                    control={control}
                                    label="First Name"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputText
                                    name="LastName"
                                    control={control}
                                    label="Last Name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextLong
                                    name="Bio"
                                    control={control}
                                    label="Bio"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    Address & Contact
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputText
                                    name="PrimaryEmail"
                                    control={control}
                                    label="Primary Email"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputText
                                    name="Phone"
                                    control={control}
                                    label="Phone"
                                />
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <FormInputText
                                    name="Address"
                                    control={control}
                                    label="Address"
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <FormInputText
                                    name="CitySuburb"
                                    control={control}
                                    label="City/Suburb"
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <FormInputText
                                    name="State"
                                    control={control}
                                    label="State"
                                />
                            </Grid>
                            <Grid item xs={4} md={3}>
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
                            <Grid item xs={6} md={3}>
                                <FormInputText
                                    name="PreferredTimezone"
                                    control={control}
                                    label="Preferred Timezone"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Work</Typography>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <FormInputText
                                    name="Area"
                                    control={control}
                                    label="Area"
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <FormInputText
                                    name="Category"
                                    control={control}
                                    label="Category"
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <FormInputText
                                    name="WorkTitle"
                                    control={control}
                                    label="Work Title"
                                />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <FormInputText
                                    name="Organisation"
                                    control={control}
                                    label="Organisation"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormInputText
                                    name="Department"
                                    control={control}
                                    label="Department"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Misc</Typography>
                            </Grid>
                            <Grid item xs={8} md={5}>
                                <FormInputText
                                    name="EmergencyContactName"
                                    control={control}
                                    label="Emergency Contact Name"
                                />
                            </Grid>
                            <Grid item xs={4} md={2}>
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
                            <Grid item xs={12} md={7}>
                                <FormInputText
                                    name="FlyerMembershipNumber"
                                    control={control}
                                    label="Flyer Membership Number"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid
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
