import { Grid, Modal, Paper, Typography } from '@mui/material'
import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    FormInputDate,
    FormInputMultiAutocomplete,
    FormInputNumber,
    FormInputText,
    FormInputTextLong,
    SubmitButton,
    BottomSuccessSnackbar,
    FormButtonGroup,
} from '../../../../../components/'
import { Catering } from '../../../../../types/frontendTypes'
import { updateCateringByID } from '../../../../../scripts/catering/functions'
import { useRevalidator } from 'react-router-dom'

interface EditCateringModalProps {
    handleClose: () => void
    open: boolean
    catering: Catering
    eventID: string
    fundingAccounts: Map<string, string>
}

const EditCateringFormDefaultValues: Catering = {
    RecordID: '',
    BookingReference: '',
    Description: '',
    Cost: 0,
    ExpenseDate: dayjs(),
    FundingAccount: [],
    MainEvent: [],
    Finance: [],
}

export const EditCateringModal: React.FC<EditCateringModalProps> = ({
    handleClose,
    open,
    catering,
    fundingAccounts,
}) => {
    const { handleSubmit, reset, control, watch } = useForm<Catering>({
        defaultValues: catering || EditCateringFormDefaultValues,
    })
    const revalidator = useRevalidator()

    const onSubmit = async (data: Catering) => {
        setSubmitting(true)
        try {
            const res: AxiosResponse = await updateCateringByID(data)
            if (res.status !== 200) {
                throw new Error('Failed to update catering')
            }
            revalidator.revalidate()
            setShowSuccess(true)
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

    const [showSuccess, setShowSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const isSubmitDisabled = () => {
        const description = watch('Description')
        return !description
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="update-catering"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] min-w-[450px] max-h-[95vh] overflow-y-auto">
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-16 flex space-between justify-items"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Update Catering
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <FormInputText
                                name="BookingReference"
                                control={control}
                                label="Booking Reference"
                            />
                        </Grid>
                        <Grid item xs={8} md={4}>
                            <FormInputDate
                                name="ExpenseDate"
                                control={control}
                                label="Expense Date"
                            />
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <FormInputNumber
                                name="Cost"
                                control={control}
                                label="Cost"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputMultiAutocomplete
                                name="FundingAccount"
                                control={control}
                                label="Funding Account"
                                // Display themis strings for funding account options
                                options={Array.from(
                                    fundingAccounts.entries()
                                ).map(([id, themisString]) => ({
                                    label: themisString,
                                    value: id,
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputTextLong
                                name="Description"
                                control={control}
                                label="Description"
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

            {/* Snackbar for success message after event creation */}
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Catering updated successfully"
            />
        </>
    )
}
