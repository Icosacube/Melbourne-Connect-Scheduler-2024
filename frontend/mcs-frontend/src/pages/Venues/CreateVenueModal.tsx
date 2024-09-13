import { Grid, Modal, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    BottomSuccessSnackbar,
    FormInputText,
    SubmitButton,
} from '../../components/'
import { createVenue, defaultVenue } from '../../scripts/venue/functions'
import { Venue } from '../../types/frontendTypes'
import { useRevalidator } from 'react-router-dom'

interface CreateVenueModalProps {
    handleClose: () => void
    open: boolean
}

export const CreateVenueModal: React.FC<CreateVenueModalProps> = ({
    handleClose,
    open,
}) => {
    const { handleSubmit, reset, control } = useForm<Venue>({
        defaultValues: defaultVenue,
    })

    const [showSuccess, setShowSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const revalidator = useRevalidator()

    const onClose = () => {
        reset()
        handleClose()
    }

    const onSubmit = async (venue: Venue) => {
        setSubmitting(true) // for button display
        try {
            const res = await createVenue(venue)
            if (res) {
                setShowSuccess(true)
                revalidator.revalidate()
            } else {
                console.log('Failed to create venue')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
            reset()
            onClose()
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="create-new-venue"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] min-w-[450px] max-h-[95vh] overflow-y-auto">
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-16 flex space-between justify-items"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Create New Venue
                            </Typography>
                        </Grid>

                        <Grid item>
                            <FormInputText
                                name="VenueName"
                                control={control}
                                label="Venue Name"
                            />
                        </Grid>
                        <Grid item>
                            <FormInputText
                                name="Location"
                                control={control}
                                label="Location"
                            />
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end">
                            <SubmitButton
                                submitting={submitting}
                                onClick={handleSubmit(onSubmit)}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Venue Created Successfully"
            />
        </>
    )
}
