import { Box } from '@mui/material'
import dayjs from 'dayjs'
import React, { FC, useState } from 'react'
import { AddButton, DeleteDialog } from '../../../../../components'
import { deleteRoomServiceByID } from '../../../../../scripts/roomServices/functions'
import {
    Service,
    MainEvent,
    FundingAccount,
} from '../../../../../types/frontendTypes'
import { EditRoomServiceModal } from './EditRoomServiceModal'
import { CreateRoomServiceModal } from './CreateRoomServiceModal'
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
    GridRowModes,
    GridRowId,
    GridRowModesModel,
} from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Close'
import { useRevalidator } from 'react-router-dom'

interface RoomServicesTableProps {
    eventId: string
    roomServices: Service[]
    fundingAccounts: FundingAccount[]
}

export const RoomServicesTable: FC<RoomServicesTableProps> = ({
    eventId,
    roomServices,
    fundingAccounts,
}) => {
    // State variables
    const [selectedRoomService, setSelectedRoomService] =
        React.useState<Service | null>(null)
    const fundingAccountMap = new Map(
        fundingAccounts.map((account) => [
            account.RecordID,
            account.ThemisString,
        ])
    )
    const [openCreate, setOpenCreate] = React.useState(false)
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    )
    const [deleting, setDeleting] = useState(false)
    const revalidator = useRevalidator()

    function getRowId(roomService: Service) {
        return roomService.RecordID
    }

    // Handlers

    // Handle create modal
    const handleOpenCreate = () => setOpenCreate(true)

    const handleCloseCreate = () => setOpenCreate(false)

    // Handle update modal
    const handleOpenUpdate = (roomService: Service) => {
        setSelectedRoomService(roomService)
        setOpenUpdate(true)
    }

    const handleCloseUpdate = () => {
        setOpenUpdate(false)
        setSelectedRoomService(null)
    }

    // Handle delete modal
    const handleDeleteClick = (roomService: Service) => async () => {
        setSelectedRoomService(roomService)
        setDeleteDialogOpen(true)
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false)
        setSelectedRoomService(null)
    }

    const handleDeleteRoomService = async () => {
        setDeleting(true)
        if (!selectedRoomService) return
        try {
            await deleteRoomServiceByID(selectedRoomService.RecordID)
        } catch (error) {
            console.error('Error deleting room service:', error)
        } finally {
            if (revalidator) {
                revalidator.revalidate()
            }
            setDeleting(false)
            handleCloseDeleteDialog()
        }
    }

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        })
    }

    // Define columns for DataGrid
    const columns: GridColDef<Service>[] = [
        {
            field: 'ServiceDescription',
            headerName: 'Description',
            headerClassName: 'room-service-table',
            flex: 1,
        },
        {
            field: 'Cost',
            headerName: 'Cost',
            headerClassName: 'room-service-table',
            flex: 1,
            valueFormatter: (params) => {
                const value = params as number

                // Format the number to two decimal places and with $ symbol
                const formattedValue = new Intl.NumberFormat('en-AU', {
                    style: 'currency',
                    currency: 'AUD',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(value)

                return formattedValue
            },
        },
        {
            field: 'ExpenseDate',
            headerName: 'Expense Date',
            headerClassName: 'room-service-table',
            flex: 1,
            valueFormatter: (params) => {
                const date = new Date(params)
                return dayjs(date).format('DD MMM YYYY')
            },
        },
        {
            field: 'Notes',
            headerName: 'Notes',
            headerClassName: 'room-service-table',
            flex: 1,
        },
        {
            field: 'FundingAccount',
            headerName: 'Funding Account',
            headerClassName: 'room-service-table',
            flex: 1,
            valueFormatter: (params) => {
                const values = params as string[]
                return (
                    values.map((id) => fundingAccountMap.get(id)).join(', ') ||
                    'No Funding Account'
                )
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: (params: GridRowParams) => {
                const roomService = params.row as Service
                const isInEditMode =
                    rowModesModel[params.id]?.mode === GridRowModes.Edit

                if (isInEditMode) {
                    return [
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
                        onClick={() => handleOpenUpdate(roomService)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(roomService)}
                        color="inherit"
                    />,
                ]
            },
        },
    ]

    return (
        <>
            <Box className="  mb-4 flex flex-col">
                <Box className=" flex flex-col mb-4">
                    <AddButton
                        name={'Room Service'}
                        onClick={handleOpenCreate}
                    />
                    <CreateRoomServiceModal
                        open={openCreate}
                        handleClose={handleCloseCreate}
                        eventID={eventId}
                        fundingAccounts={fundingAccountMap}
                    />
                </Box>
                <Box>
                    <DataGrid
                        rows={roomServices}
                        columns={columns}
                        getRowId={getRowId}
                        autoHeight
                        pageSizeOptions={[5, 10]}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        checkboxSelection
                        sx={{
                            '& .room-service-table': {
                                color: 'black',
                            },
                        }}
                    />
                </Box>
            </Box>
            {selectedRoomService && (
                <EditRoomServiceModal
                    handleClose={handleCloseUpdate}
                    open={openUpdate}
                    roomService={selectedRoomService}
                    eventID={eventId}
                    fundingAccounts={fundingAccountMap}
                />
            )}
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleDeleteRoomService}
                deleting={deleting}
            />
        </>
    )
}
