import * as React from 'react'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridSlots,
    GridRowParams,
} from '@mui/x-data-grid'
import { Venue } from '../../types/frontendTypes'
import { Button, Modal } from '@mui/material'
import { deleteVenue } from '../../scripts/venue/functions'
import { CreateVenueModal } from './CreateVenueModal'

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
                Add record
            </Button>
        </GridToolbarContainer>
    )
}

interface VenuesTableProps {
    venues: Venue[]
}

export const VenuesTable: React.FC<VenuesTableProps> = ({ venues }) => {
    const [rows, setRows] = React.useState(venues)
    const [createModalOpen, setCreateModalOpen] = React.useState(false)
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    )

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false)
    }
    const handleOpenCreateModal = () => {
        setCreateModalOpen(true)
    }
    const handleCreateNewVenue = (newVenue: Venue) => {
        setRows([...rows, newVenue])
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

    const handleSaveClick = (params: GridRowParams) => () => {
        console.log(params)
        console.log(rowModesModel)
        setRowModesModel({
            ...rowModesModel,
            [params.id]: { mode: GridRowModes.View },
        })
    }

    const handleDeleteClick = (venue: Venue) => async () => {
        await deleteVenue(venue)
        setRows(rows.filter((row) => row.RecordID !== venue.RecordID))
    }

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        })

        const editedRow = rows.find((row) => row.RecordID === id)
        // if (editedRow!.isNew) {
        //     setRows(rows.filter((row) => row.id !== id))
        // }
    }

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false }
        //setRows(rows.map((row) => (row.RecordID === newRow.Record ? updatedRow : row)))
        return updatedRow
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
                rows={rows}
                columns={columns}
                getRowId={getRowId}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                // processRowUpdate={processRowUpdate}
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
                handleCreateNewVenue={handleCreateNewVenue}
            />
        </Box>
    )
}
