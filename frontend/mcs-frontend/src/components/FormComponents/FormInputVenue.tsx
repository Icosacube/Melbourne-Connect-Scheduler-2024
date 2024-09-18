import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
} from '@mui/icons-material'
import { Box, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useRevalidator } from 'react-router-dom'
import { deleteVenue } from '../../scripts/venue/functions'
import { Venue } from '../../types/frontendTypes'
import { CreateVenueModal } from '../Venues/CreateVenueModal'
import { EditVenueModal } from '../Venues/EditVenueModal'
import { DeleteDialog } from '../Dialog'

interface FormInputVenueProps {
    control: any
    name: string
    venues: Venue[]
    label: string
}

export const FormInputVenue: React.FC<FormInputVenueProps> = ({
    control,
    name,
    venues,
    label,
}) => {
    const [open, setOpen] = useState(false)
    const [openCreateVenueModal, setOpenCreateVenueModal] = useState(false)
    const [openEditVenueModal, setOpenEditVenueModal] = useState(false)
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const revalidator = useRevalidator()

    const handleCloseCreateVenueModal = () => {
        setOpenCreateVenueModal(false)
    }

    const handleCloseEditVenueModal = () => {
        setOpenEditVenueModal(false)
    }

    const handleOpenAddVenueModal = () => {
        setOpenCreateVenueModal(true)
    }

    const handleOpenEditVenueModal = (venue: Venue) => {
        setOpenEditVenueModal(true)
        setSelectedVenue(venue)
    }

    const handleDeleteIconClick = async (venue: Venue) => {
        setOpenDeleteDialog(true)
        setSelectedVenue(venue)
    }

    const handleDeleteVenue = async () => {
        if (!selectedVenue) {
            return
        }
        setDeleting(true)
        await deleteVenue(selectedVenue.RecordID)
        revalidator.revalidate()
        setOpenDeleteDialog(false)
        setDeleting(false)
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false)
    }

    const editVenueModal = () => {
        if (!selectedVenue) {
            return <></>
        }
        return (
            <EditVenueModal
                open={openEditVenueModal}
                handleClose={handleCloseEditVenueModal}
                venue={selectedVenue}
            />
        )
    }

    return (
        <>
            <InputLabel>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        fullWidth
                        multiple
                        renderValue={(selected) => {
                            // Map over the selected RecordIDs to get the corresponding venue names
                            const selectedVenueNames = selected.map(
                                (id: string) => {
                                    const venue = venues.find(
                                        (venue) => venue.RecordID === id
                                    )
                                    return venue ? venue.VenueName : ''
                                }
                            )

                            // Join the names with a comma and return
                            const displayValue = selectedVenueNames
                                .filter((name: any) => name)
                                .join(', ')

                            return (
                                <Box
                                    sx={{
                                        textWrap: 'pretty',
                                    }}
                                >
                                    {displayValue}
                                </Box>
                            )
                        }}
                    >
                        {venues.map((venue) => (
                            <MenuItem
                                key={venue.RecordID}
                                value={venue.RecordID}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    width="100%"
                                >
                                    <span>{venue.VenueName}</span>
                                    <Box>
                                        <IconButton
                                            size="small"
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                handleOpenEditVenueModal(venue)
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                handleDeleteIconClick(venue)
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </MenuItem>
                        ))}
                        <MenuItem onClick={handleOpenAddVenueModal}>
                            <Box display="flex" alignItems="center">
                                <AddIcon fontSize="small" />
                                <span>Add New Venue</span>
                            </Box>
                        </MenuItem>
                    </Select>
                )}
            />
            <CreateVenueModal
                open={openCreateVenueModal}
                handleClose={handleCloseCreateVenueModal}
            />
            {editVenueModal()}
            <DeleteDialog
                open={openDeleteDialog}
                deleting={deleting}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleDeleteVenue}
                name="venue"
            />
        </>
    )
}
