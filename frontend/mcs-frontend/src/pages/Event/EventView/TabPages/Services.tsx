import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { FC, useEffect, useState } from 'react'
import {
    Catering,
    MainEvent,
    FundingAccount,
} from '../../../../types/frontendTypes'
import { getCateringByEventID } from '../../../../scripts/catering/functions'
import Headline from './Headline'
import { Box, Button, Typography } from '@mui/material'
import { getAllFundingAccounts } from '../../../../scripts/fundingAccount/functions'
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined'
import { CreateCateringModal } from './CreateCateringModal'
import dayjs from 'dayjs'
import { AddButton } from '../../../../components'

interface ServicesProps {
    event: MainEvent
}

export const Services: FC<ServicesProps> = ({ event }) => {
    const [catering, setCatering] = useState<Catering[]>([])
    const [fundingAccounts, setFundingAccounts] = useState<FundingAccount[]>([])
    const [fundingAccountMap, setFundingAccountMap] = useState<
        Map<string, string>
    >(new Map())

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedCatering, fetchedFundingAccounts] =
                    await Promise.all([
                        getCateringByEventID(event.RecordID),
                        getAllFundingAccounts(),
                    ])

                setCatering(fetchedCatering)
                setFundingAccounts(fetchedFundingAccounts)

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
                const value = params[0] as string
                return fundingAccountMap.get(value)
            },
        },
    ]

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Box className="  mb-4 flex flex-col">
                <Box className=" flex flex-col">
                    <AddButton name={'Catering Entry'} onClick={handleOpen} />
                    <CreateCateringModal
                        open={open}
                        handleClose={handleClose}
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
                                backgroundColor: '#FBE418',
                                color: 'black',
                            },
                            '.MuiDataGrid-columnHeaderTitleContainer': {
                                backgroundColor: '#FBE418',
                            },
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}
