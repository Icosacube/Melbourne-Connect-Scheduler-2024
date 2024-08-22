import { Grid, Modal, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar'
import {
    FormInputDateTime,
    FormInputText,
    FormInputSingleSelect,
    SubmitButton,
} from '../../../components/'
import { createFlight, defaultFlight } from '../../../scripts/flight/functions'
import { Flight, FundingAccount } from '../../../types/frontendTypes'
import { getAllFundingAccounts } from '../../../scripts/fundingAccount/functions'

interface CreateFlightModalProps {
    handleClose: () => void
    open: boolean
    tripID: string
}

export const CreateFlightModal: React.FC<CreateFlightModalProps> = ({
    handleClose,
    open,
    tripID,
}) => {
    const { handleSubmit, reset, control } = useForm<Flight>({
        defaultValues: defaultFlight,
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

    const onSubmit = async (data: Flight) => {
        setSubmitting(true)
        try {
            data.Trip = [tripID]
            const res = await createFlight(data)
            if (res) {
                setShowSuccess(true)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                console.log('Failed to create flight')
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
            <Modal open={open} onClose={onClose} aria-labelledby="add-flight">
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1000px] min-w-[500px] max-h-[95vh] overflow-y-auto">
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-16 flex space-between justify-items"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Add New Flight
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <FormInputText
                                name="Airline"
                                control={control}
                                label="Airline"
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4.5}>
                            <FormInputText
                                name="FlightNumber"
                                control={control}
                                label="Flight Number"
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4.5}>
                            <FormInputText
                                name="FlightReference"
                                control={control}
                                label="Flight Reference"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormInputText
                                name="DepartureFrom"
                                control={control}
                                label="Departure City"
                                required={true}
                                hint="e.g. MEL"
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <FormInputDateTime
                                name="DepartDate"
                                control={control}
                                label="Departure Time"
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormInputText
                                name="ArrivedTo"
                                control={control}
                                label="Arrival City"
                                required={true}
                                hint="e.g. NYK"
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <FormInputDateTime
                                name="ArriveDate"
                                control={control}
                                label="Arrival Time"
                            />
                        </Grid>
                        <Grid item xs={12} md={9} lg={9}>
                            <FormInputSingleSelect
                                name="FundingAccount"
                                control={control}
                                label="Funding Account"
                                options={fundingAccounts.map((account) => ({
                                    label: `${account.AccountUser} - ${account.ThemisString}`,
                                    value: account.RecordID,
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <FormInputText
                                name="Cost"
                                control={control}
                                label="Price ($)"
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
                message="Flight Created Successfully"
            />
        </>
    )
}
