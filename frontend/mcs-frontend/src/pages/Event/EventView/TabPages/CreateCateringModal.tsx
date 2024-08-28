import { Box, Button, Grid, Modal, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs'
import {
    FormInputNumber,
    FormInputMultiSelect,
    FormInputText,
    FormInputDate,
    SubmitButton,
    FormInputTextLong,
    BottomSuccessSnackbar,
} from '../../../../components/'
import { AxiosResponse } from 'axios'
import { Catering } from '../../../../types/frontendTypes'
import { createCatering } from '../../../../scripts/catering/functions'

interface CreateCateringModalProps {
    handleClose: () => void
    open: boolean
    eventID: string
    fundingAccounts: Map<string, string>
    addCatering: (catering: Catering) => void
}

const CreateCateringFormDefaultValues: Catering = {
    RecordID: '',
    BookingReference: '',
    Description: '',
    Cost: 0,
    ExpenseDate: dayjs(),
    FundingAccount: [],
    MainEvent: [],
    Finance: [],
}

export const CreateCateringModal: React.FC<CreateCateringModalProps> = ({
    handleClose,
    open,
    eventID,
    fundingAccounts,
    addCatering,
}) => {
    const { handleSubmit, reset, control, setValue } = useForm<Catering>({
        defaultValues: CreateCateringFormDefaultValues,
    })

    const onSubmit = async (data: Catering) => {
        setSubmitting(true)
        try {
            const res: AxiosResponse = await createCatering(data, eventID)
            setShowSuccess(true)
            addCatering(data)
        } catch (error) {
            console.error(error)
        } finally {
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
                aria-labelledby="create-new-trip"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] min-w-[500px] max-h-[95vh] overflow-y-auto">
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-16 flex space-between justify-items"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Add Catering Entry
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
                            <FormInputMultiSelect
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
                        <Grid item xs={12} container justifyContent="flex-end">
                            <SubmitButton
                                submitting={submitting}
                                onClick={handleSubmit(onSubmit)}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>

            {/* Snackbar for success message after event creation */}
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Catering created successfully"
            />
        </>
    )
}
