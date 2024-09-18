import AddIcon from '@mui/icons-material/Add'
import CancelIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridRowEditStopReasons,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    GridSlots,
    GridToolbarContainer,
} from '@mui/x-data-grid'
import * as React from 'react'
import { DeleteDialog } from '../../components'
import {
    defaultVenue,
    deleteVenue,
    updateVenue,
} from '../../scripts/venue/functions'
import { Venue } from '../../types/frontendTypes'
import { CreateVenueModal } from './CreateVenueModal'
import { useRevalidator } from 'react-router-dom'

interface VenueRow extends Venue {
    isNew?: boolean
}

interface EditToolbarProps {
    handleOpenCreateModal: () => void
}

function EditToolbar(props: EditToolbarProps) {
    const { handleOpenCreateModal } = props

    return (
        <GridToolbarContainer>
            <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenCreateModal}
            >
                Add Venue
            </Button>
        </GridToolbarContainer>
    )
}

interface VenuesTableProps {
    venues: Venue[]
}

export const VenuesTable: React.FC<VenuesTableProps> = ({ venues }) => {
    const [createModalOpen, setCreateModalOpen] = React.useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
    const [selectedVenue, setSelectedVenue] = React.useState<Venue | null>(null)
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    )
    const [deleting, setDeleting] = React.useState(false)
    const revalidator = useRevalidator()

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false)
    }
    const handleOpenCreateModal = () => {
        setCreateModalOpen(true)
    }

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (
        params,
        event
    ) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true
        }
    }

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        })
    }

    const processRowUpdate = async (
        newRow: Venue,
        oldRow: Venue
    ): Promise<Venue> => {
        try {
            await updateVenue(newRow)
            revalidator.revalidate() // Make sure this is 'revalidator', not 'revalidate'
            return newRow
        } catch (error) {
            console.error('Failed to update venue:', error)
            // If update fails, return the old row
            return oldRow
        }
    }

    const handleSaveClick = (params: GridRowParams) => () => {
        setRowModesModel({
            ...rowModesModel,
            [params.id]: { mode: GridRowModes.View },
        })
    }

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        })
    }

    const handleDeleteClick = (venue: Venue) => async () => {
        setSelectedVenue(venue)
        setDeleteDialogOpen(true)
    }
    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false)
        setSelectedVenue(null)
        revalidator.revalidate()
    }
    const handleDeleteVenue = async () => {
        if (!selectedVenue) return
        setDeleting(true)
        //await deleteVenue(selectedVenue)
        handleCloseDeleteDialog()
        setDeleting(false)
    }
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel)
    }

    const columns: GridColDef[] = [
        { field: 'VenueName', headerName: 'Name', width: 180, editable: true },
        {
            field: 'Location',
            headerName: 'Location',
            width: 180,
            editable: true,
        },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: (params: GridRowParams) => {
                const venue = params.row as VenueRow
                const isInEditMode =
                    rowModesModel[params.id]?.mode === GridRowModes.Edit

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(params)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(params.id)}
                            color="inherit"
                        />,
                    ]
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(params.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(venue)}
                        color="inherit"
                    />,
                ]
            },
        },
    ]
    const getRowId = (row: Venue) => row.RecordID
    return (
        <Box>
            <DataGrid
                rows={venues}
                columns={columns}
                getRowId={getRowId}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar as GridSlots['toolbar'],
                }}
                slotProps={{
                    toolbar: { handleOpenCreateModal },
                }}
            />
            <CreateVenueModal
                open={createModalOpen}
                handleClose={handleCloseCreateModal}
            />
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleDeleteVenue}
                deleting={deleting}
            />
        </Box>
    )
}
