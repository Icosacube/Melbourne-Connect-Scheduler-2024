import { Box } from '@mui/material'
import dayjs from 'dayjs'
import React, { FC, useEffect, useState } from 'react'
import { AddButton } from '../../../../components'
import { getCateringByEventID } from '../../../../scripts/catering/functions'
import { getAllFundingAccounts } from '../../../../scripts/fundingAccount/functions'
import { Catering, MainEvent } from '../../../../types/frontendTypes'
import { CreateCateringModal } from './CreateCateringModal'
import { EditCateringModal } from './EditCateringModal'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'

import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
} from '@mui/x-data-grid'

interface ServicesProps {
    event: MainEvent
}

export const Services: FC<ServicesProps> = ({ event }) => {
    const [selectedCatering, setSelectedCatering] = React.useState<Catering | null>(null);
    const [catering, setCatering] = useState<Catering[]>([])
    const [fundingAccountMap, setFundingAccountMap] = useState<
        Map<string, string>
    >(new Map())
    const [openCreate, setOpenCreate] = React.useState(false)
    const handleOpenCreate = () => setOpenCreate(true)
    const handleCloseCreate = () => setOpenCreate(false)

    const [openUpdate, setOpenUpdate] = React.useState(false)
    const handleOpenUpdate = (cateringItem: Catering) => {
        setSelectedCatering(cateringItem);
        setOpenUpdate(true);
    };
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
        setSelectedCatering(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedCatering, fetchedFundingAccounts] =
                    await Promise.all([
                        getCateringByEventID(event.RecordID),
                        getAllFundingAccounts(),
                    ])

                setCatering(fetchedCatering)

                // Map funding record ID to themis string
                const map = new Map<string, string>()
                fetchedFundingAccounts.forEach((account) => {
                    map.set(account.RecordID, account.ThemisString)
                })
                setFundingAccountMap(map)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [event.RecordID])

    const handleAddCatering = (newCatering: Catering) => {
        setCatering((prevCatering) => [...prevCatering, newCatering])
    }

    function getRowId(catering: Catering) {
        return catering.RecordID
    }

    const columns: GridColDef<Catering>[] = [
        {
            field: 'BookingReference',
            headerName: 'Booking Reference',
            headerClassName: 'services-table',
            flex: 1,
        },
        {
            field: 'Description',
            headerName: 'Description',
            headerClassName: 'services-table',
            flex: 1,
        },
        {
            field: 'Cost',
            headerName: 'Cost',
            headerClassName: 'services-table',
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
            headerClassName: 'services-table',
            flex: 1,
            valueFormatter: (params) => {
                const date = new Date(params)
                return dayjs(date).format('DD MMM YYYY')
            },
        },
        {
            field: 'FundingAccount',
            headerName: 'Funding Account',
            headerClassName: 'services-table',
            flex: 1,
            valueFormatter: (params) => {
                const values = params as string[];
                return values.map(id => fundingAccountMap.get(id)).join(', ') || 'No Funding Account';
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: (params: GridRowParams) => {
                const cateringItem = params.row as Catering;
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => handleOpenUpdate(cateringItem)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        color="inherit"
                    />,
                ]
            }
        },
    ]

    return (
        <>
            <Box className="  mb-4 flex flex-col">
                <Box className=" flex flex-col mb-4">
                    <AddButton name={'Catering'} onClick={handleOpenCreate} />
                    <CreateCateringModal
                        open={openCreate}
                        handleClose={handleCloseCreate}
                        eventID={event.RecordID}
                        fundingAccounts={fundingAccountMap}
                        addCatering={handleAddCatering}
                    />
                </Box>
                <Box>
                    <DataGrid
                        rows={catering}
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
                            '& .services-table': {
                                color: 'black',
                            },
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
                    updateCatering={(updatedCatering) => {
                    setCatering((prevCatering) =>
                    prevCatering.map((item) =>
                    item.RecordID === updatedCatering.RecordID
                        ? updatedCatering
                        : item
                    )
                );
                handleCloseUpdate();
            }}
        />
    )}
</>
);
};
