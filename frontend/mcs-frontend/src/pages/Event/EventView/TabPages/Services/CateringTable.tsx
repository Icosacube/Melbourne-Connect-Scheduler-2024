import CancelIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { Box } from '@mui/material'
import {
    GridActionsCellItem,
    GridColDef,
    GridRowId,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
} from '@mui/x-data-grid'
import dayjs from 'dayjs'
import React, { FC, useState } from 'react'
import { useRevalidator } from 'react-router-dom'
import {
    AddButton,
    CustomDataGrid,
    DeleteDialog,
} from '../../../../../components'
import { deleteCateringByID } from '../../../../../scripts/catering/functions'
import {
    Catering,
    FundingAccount,
    MainEvent,
} from '../../../../../types/frontendTypes'
import { CreateCateringModal } from './CreateCateringModal'
import { EditCateringModal } from './EditCateringModal'

interface CateringTableProps {
    event: MainEvent
    catering: Catering[]
    fundingAccounts: FundingAccount[]
}

export const CateringTable: FC<CateringTableProps> = ({
    event,
    catering,
    fundingAccounts,
}) => {
    // State variables
    const [selectedCatering, setSelectedCatering] =
        React.useState<Catering | null>(null)
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

    // Handle create modal
    const handleOpenCreate = () => setOpenCreate(true)

    const handleCloseCreate = () => setOpenCreate(false)

    // Handle update modal
    const handleOpenUpdate = (cateringEntry: Catering) => {
        setSelectedCatering(cateringEntry)
        setOpenUpdate(true)
    }

    const handleCloseUpdate = () => {
        setOpenUpdate(false)
        setSelectedCatering(null)
    }

    // Handle delete modal
    const handleDeleteClick = (cateringEntry: Catering) => async () => {
        setSelectedCatering(cateringEntry)
        setDeleteDialogOpen(true)
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false)
        setSelectedCatering(null)
    }

    const handleDeleteCatering = async () => {
        setDeleting(true)
        if (!selectedCatering) return
        try {
            await deleteCateringByID(selectedCatering.RecordID)
        } catch (error) {
            console.error('Error deleting catering:', error)
        } finally {
            revalidator.revalidate()
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
    const columns: GridColDef<Catering>[] = [
        {
            field: 'BookingReference',
            headerName: 'Booking Reference',
            headerClassName: 'catering-table',
            flex: 1,
        },
        {
            field: 'Description',
            headerName: 'Description',
            headerClassName: 'catering-table',
            flex: 1,
        },
        {
            field: 'Cost',
            headerName: 'Cost',
            headerClassName: 'catering-table',
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
            headerClassName: 'catering-table',
            flex: 1,
            valueFormatter: (params) => {
                const date = new Date(params)
                return dayjs(date).format('DD MMM YYYY')
            },
        },
        {
            field: 'FundingAccount',
            headerName: 'Funding Account',
            headerClassName: 'catering-table',
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
                const catering = params.row as Catering
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
                        onClick={() => handleOpenUpdate(catering)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(catering)}
                        color="inherit"
                    />,
                ]
            },
        },
    ]

    return (
        <>
            <Box className="  mb-4 flex flex-col">
                <Box className=" flex justify-end mb-4">
                    <AddButton name={'Catering'} onClick={handleOpenCreate} />
                </Box>
                <Box>
                    <CustomDataGrid
                        columns={columns}
                        rows={catering}
                        getRowId={(c: Catering) => {
                            return c.RecordID
                        }}
                    />
                </Box>
            </Box>
            {selectedCatering && (
                <EditCateringModal
                    handleClose={handleCloseUpdate}
                    open={openUpdate}
                    catering={selectedCatering}
                    eventID={event.RecordID}
                    fundingAccounts={fundingAccountMap}
                />
            )}
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleDeleteCatering}
                deleting={deleting}
            />
            <CreateCateringModal
                open={openCreate}
                handleClose={handleCloseCreate}
                eventID={event.RecordID}
                fundingAccounts={fundingAccountMap}
            />
        </>
    )
}
