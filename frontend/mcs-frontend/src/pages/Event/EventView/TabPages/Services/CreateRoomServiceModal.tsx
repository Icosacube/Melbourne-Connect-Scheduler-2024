import { Grid, Modal, Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    FormInputDate,
    FormInputMultiSelect,
    FormInputNumber,
    FormInputText,
    FormInputTextLong,
    SubmitButton,
    BottomSuccessSnackbar,
} from '../../../../../components/'
import { Service } from '../../../../../types/frontendTypes'
import { createRoomService } from '../../../../../scripts/roomServices/functions'
import { useRevalidator } from 'react-router-dom'

interface CreateRoomServiceModalProps {
    handleClose: () => void
    open: boolean
    eventID: string
    fundingAccounts: Map<string, string>
}

const CreateRoomServiceFormDefaultValues: Service = {
    RecordID: '',
    Cost: 0,
    ServiceDescription: '',
    ExpenseDate: dayjs(),
    Notes: '',
    FundingAccount: [],
    MainEvent: [],
    Finance: [],
}

export const CreateRoomServiceModal: React.FC<CreateRoomServiceModalProps> = ({
    handleClose,
    open,
    eventID,
    fundingAccounts,
}) => {
    const { handleSubmit, reset, control } = useForm<Service>({
        defaultValues: CreateRoomServiceFormDefaultValues,
    })

    const revalidator = useRevalidator()

    const onSubmit = async (data: Service) => {
        setSubmitting(true)
        try {
            console.log('point two')
            const res = await createRoomService(data, eventID)
            if (res) {
                revalidator.revalidate()
                setShowSuccess(true)
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
                                Add Room Service
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <FormInputText
                                name="ServiceDescription"
                                control={control}
                                label="Description"
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
                                name="Notes"
                                control={control}
                                label="Notes"
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
