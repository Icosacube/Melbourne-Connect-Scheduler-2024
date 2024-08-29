import {
    Grid,
    IconButton,
    Paper,
    Typography,
    Menu,
    MenuItem,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVertOutlined'
import { Flight } from '../../../types/frontendTypes'
import { EditFlightModal } from './EditFlightModal'
import { DeleteDialog, BottomSuccessSnackbar } from '../../../components'
import { getFundingAccountByID } from '../../../scripts/fundingAccount/functions'
import { deleteFlight } from '../../../scripts/flight/functions'

interface FlightProps {
    flight: Flight
}

export const FlightCard: FC<FlightProps> = ({ flight }) => {
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [fundingAccountStrings, setFundingAccountStrings] =
        useState<String>('')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        getFundingAccountStrings(flight.FundingAccount)
    }, [flight.FundingAccount])

    async function getFundingAccountStrings(accountIds: string[]) {
        try {
            const accounts = await Promise.all(
                accountIds.map((accountId) => getFundingAccountByID(accountId))
            )
            const fundingAccountStrings = accounts.map(
                (account) => account?.ThemisString || ''
            )
            setFundingAccountStrings(fundingAccountStrings.join(', '))
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching funding accounts:', error)
        }
    }

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleEditClick = () => {
        handleMenuClose()
        setOpenEditModal(true)
    }

    const handleEditClose = () => {
        setOpenEditModal(false)
    }

    const handleDeleteClick = () => {
        handleMenuClose()
        setOpenDeleteDialog(true)
    }

    const handleDeleteConfirm = async () => {
        try {
            setDeleting(true)
            const res = await deleteFlight(flight.RecordID)
            if (res) {
                setShowSuccess(true)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                console.log('Failed to delete flight')
            }
        } catch (error) {
            console.error('Error deleting flight:', error)
        } finally {
            setOpenDeleteDialog(false)
            setDeleting(false)
        }
    }

    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false)
    }

    return (
        <>
            <Paper className="px-5 pb-4 pt-2">
                <Grid
                    container
                    className="w-full flex justify-between items-center space-y-0.5"
                >
                    <Grid item xs={3}>
                        <Typography noWrap variant="body2">
                            {flight.Airline}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography noWrap variant="body2">
                            {flight.FlightNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography noWrap variant="body2">
                            {flight.FlightReference === ''
                                ? 'unknown'
                                : flight.FlightReference}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} alignSelf={'right'}>
                        <IconButton onClick={handleMenuClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                            <MenuItem onClick={handleDeleteClick}>
                                <Typography color={'error'}>Delete</Typography>
                            </MenuItem>
                        </Menu>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="h5" gutterBottom>
                            {flight.DepartureFrom}
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="h5" gutterBottom>
                            {flight.ArrivedTo}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body2">
                            {flight.DepartDate.format('HH:mm A')}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2">
                            {flight.ArriveDate.format('HH:mm A')}
                        </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="body2" align="right" noWrap>
                            {isLoading
                                ? 'loading account..'
                                : fundingAccountStrings}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body2">
                            {flight.DepartDate.format('DD MMM YY')}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body2">
                            {flight.ArriveDate.format('DD MMM YY')}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" align="right">
                            ${flight.Cost}
                        </Typography>
                    </Grid>
                </Grid>

                <EditFlightModal
                    handleClose={handleEditClose}
                    open={openEditModal}
                    flight={flight}
                />
                <DeleteDialog
                    open={openDeleteDialog}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    name="flight"
                    deleting={deleting}
                />
            </Paper>
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Flight Deleted Successfully"
            />
        </>
    )
}

export default FlightCard
