import { Button, Grid, Modal, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar'
import { FormInputTime } from '../../../components/FormComponents/FormInputTime'
import { FormInputText } from '../../../components/FormComponents/FormInputText'
import { FormInputDropdownSingle } from '../../../components/FormComponents/FormInputDropdownSingle'
import { createFlight, defaultFlight } from '../../../scripts/flight/function'
import { Flight, FundingAccount } from '../../../types/frontendTypes'
import {
    defaultFundingAccount,
    getAllFundingAccounts,
    getFundingAccountByID,
} from '../../../scripts/fundingAccount/function'

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
                aria-describedby="modal-modal-description"
            >
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 w-9/12">
                    <Grid
                        container
                        spacing={3}
                        className="w-full p-7 flex space-between justify-items"
                    >
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

                        <Grid item xs={12} md={9} lg={9}>
                            <FormInputDropdownSingle
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
                                label="Price"
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={2.5}>
                            <FormInputText
                                name="DepartureFrom"
                                control={control}
                                label="Departure City"
                            />
                        </Grid>
                        <Grid item xs={12} md={8} lg={3.5}>
                            <FormInputTime
                                name="DepartDate"
                                control={control}
                                label="Departure Time"
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={2.5}>
                            <FormInputText
                                name="ArrivedTo"
                                control={control}
                                label="Arrival City"
                            />
                        </Grid>
                        <Grid item xs={12} md={8} lg={3.5}>
                            <FormInputTime
                                name="ArriveDate"
                                control={control}
                                label="Arrival Time"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                onClick={handleSubmit(onSubmit)}
                                className="bg-primary text-white hover:bg-tertiary"
                            >
                                Save
                            </Button>
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
