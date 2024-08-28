import { Grid, Modal, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    FormInputText,
    FormInputDate,
    FormInputSingleSelect,
    SubmitButton,
    FormInputTextLong,
    BottomSuccessSnackbar,
} from '../../../components/'
import { updateAccom } from '../../../scripts/accommodation/function'
import { Accommodation, FundingAccount } from '../../../types/frontendTypes'
import { getAllFundingAccounts } from '../../../scripts/fundingAccount/function'

interface EditAccomModalProps {
    handleClose: () => void
    open: boolean
    accom: Accommodation
}

export const EditAccomModal: React.FC<EditAccomModalProps> = ({
    handleClose,
    open,
    accom,
}) => {
    const { handleSubmit, reset, control } = useForm<Accommodation>({
        defaultValues: accom,
    })

    const [showSuccess, setShowSuccess] = useState(false)
    const [fundingAccounts, setFundingAccounts] = useState<FundingAccount[]>([])
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (open) {
            getAllFundingAccounts().then((accounts) =>
                setFundingAccounts(accounts)
            )
        }
    }, [open])

    const onClose = () => {
        reset()
        handleClose()
    }

    const onSubmit = async (data: Accommodation) => {
        setSubmitting(true)
        try {
            const res = await updateAccom(data)
            if (res) {
                setShowSuccess(true)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                console.log('Failed to update Accommodation')
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
                                Add New Accommodation
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="HotelName"
                                control={control}
                                label="Hotel Name"
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="Address"
                                control={control}
                                label="Address"
                            />
                        </Grid>

                        <Grid item xs={12} md={8} lg={4}>
                            <FormInputText
                                name="BookingReference"
                                control={control}
                                label="Booking Reference"
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={2}>
                            <FormInputText
                                name="Room"
                                control={control}
                                label="Room"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <FormInputDate
                                name="CheckIn"
                                control={control}
                                label="Check-In Date"
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <FormInputDate
                                name="CheckOut"
                                control={control}
                                label="Check-Out Date"
                            />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <FormInputSingleSelect
                                name="FundingAccount"
                                control={control}
                                label="Funding Account"
                                options={fundingAccounts.map((account) => ({
                                    label: `${
                                        account.AccountUser === ''
                                            ? 'unknown user'
                                            : account.AccountUser
                                    } - ${account.ThemisString}`,
                                    value: account.RecordID,
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormInputText
                                name="Cost"
                                control={control}
                                label="Cost ($)"
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
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Accommodation Updated Successfully"
            />
        </>
    )
}
