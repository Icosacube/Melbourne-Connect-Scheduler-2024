import { Grid, Modal, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BottomSuccessSnackbar, FormInputText, SubmitButton } from '..'
import {
    createVenue,
    defaultVenue,
    updateVenue,
} from '../../scripts/venue/functions'
import { Venue } from '../../types/frontendTypes'
import { useRevalidator } from 'react-router-dom'

interface EditVenueModalProps {
    handleClose: () => void
    open: boolean
    venue: Venue
}

export const EditVenueModal: React.FC<EditVenueModalProps> = ({
    handleClose,
    open,
    venue,
}) => {
    const { handleSubmit, reset, control } = useForm<Venue>({
        defaultValues: venue,
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
            const res = await updateVenue(venue)
            if (res) {
                setShowSuccess(true)
                revalidator.revalidate()
            } else {
                console.log('Failed to update venue')
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
            <Modal open={open} onClose={onClose} aria-labelledby="update-venue">
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] min-w-[450px] max-h-[95vh] overflow-y-auto">
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-16 flex space-between justify-items"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Update Venue
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
                message="Venue Updated Successfully"
            />
        </>
    )
}
