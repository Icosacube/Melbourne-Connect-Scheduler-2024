import {
    Grid,
    Paper,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material'
import React, { FC, useState, useEffect } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVertOutlined'
import { Accommodation } from '../../../types/frontendTypes'
import { getFundingAccountByID } from '../../../scripts/fundingAccount/functions'
import { EditAccomModal } from './EditAccomModal'
import { deleteAccom } from '../../../scripts/accommodation/functions'
import { DeleteDialog, BottomSuccessSnackbar } from '../../../components'

interface AccomProps {
    accom: Accommodation
}

export const AccomCard: FC<AccomProps> = ({ accom }) => {
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [fundingAccountStrings, setFundingAccountStrings] =
        useState<String>('')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        getFundingAccountStrings(accom.FundingAccount)
    }, [accom.FundingAccount])

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
            const res = await deleteAccom(accom.RecordID) // Similar function to deleteFlight
            if (res) {
                setShowSuccess(true)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                console.log('Failed to delete accommodation')
            }
        } catch (error) {
            console.error('Error deleting accommodation:', error)
        } finally {
            setOpenDeleteDialog(false)
        }
    }

    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false)
    }

    return (
        <>
            <Paper className="w-full px-6 py-4 rounded-lg">
                <Grid container className="flex space-between items-flex-start">
                    <Grid item xs={10} container>
                        <Grid item xs={9}>
                            <Typography variant="h5" noWrap>
                                {accom.HotelName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" noWrap gutterBottom>
                                {accom.Address}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                Room {accom.Room}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                {accom.CheckIn.format('DD MMM YY')} -{' '}
                                {accom.CheckOut.format('DD MMM YY')}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body1" noWrap>
                                {accom.Notes}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Typography variant="body1">
                                {accom.BookingReference}
                            </Typography>
                        </Grid>
                        <Grid item xs={9} md={6}>
                            <Typography variant="body1" noWrap>
                                {isLoading
                                    ? 'loading account..'
                                    : fundingAccountStrings}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Typography variant="h6">${accom.Cost}</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        container
                        direction="column"
                        justifyContent="space-between"
                    >
                        <Grid item container justifyContent="flex-end">
                            <IconButton onClick={handleMenuClick}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleEditClick}>
                                    Edit
                                </MenuItem>
                                <MenuItem onClick={handleDeleteClick}>
                                    <Typography color={'error'}>
                                        Delete
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Grid>
                        <Grid item>
                            <img
                                alt="accommodation"
                                style={{ width: '100%' }}
                                src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc="
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <EditAccomModal
                    handleClose={handleEditClose}
                    open={openEditModal}
                    accom={accom}
                />
                <DeleteDialog
                    open={openDeleteDialog}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    name="accommodation"
                />
            </Paper>
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Accommodation Deleted Successfully"
            />
        </>
    )
}

export default AccomCard
