import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import React, { FC } from 'react'
import { Finance as FinanceType } from '../../types/frontendTypes'
import { CustomToolbarWithGroups } from './FinanceTableToolBar'

type FinanceRow = FinanceType & {
    isGroup?: boolean
}

interface FinanceTableProps {
    rows: FinanceType[]
}

export const FinanceTable: FC<FinanceTableProps> = ({ rows }) => {
    const columns: GridColDef[] = [
        {
            field: 'ExpenseDate',
            headerName: 'Expense Date',
            headerClassName: 'table-header',
            width: 150,
            renderCell: (params: GridRenderCellParams) => {
                if (params.row.isGroup) {
                    return (
                        <Typography variant="body1">
                            {params.row.MainEventName}
                        </Typography>
                    )
                }

                const date = dayjs(params.value)
                return date.isValid() ? date.format('YYYY.MM.DD') : ''
            },
            colSpan: (value, row) => {
                if (row.isGroup) {
                    return 3
                }
                return 1
            },
        },
        {
            field: 'ExpenseCategory',
            headerName: 'Category',
            headerClassName: 'table-header',
            width: 150,
        },
        {
            field: 'ExpenseDescription',
            headerName: 'Description',
            headerClassName: 'table-header',
            width: 300,
            flex: 1,
        },
        {
            field: 'FundingAccount',
            headerName: 'Funding Account',
            headerClassName: 'table-header',
            width: 200,
        },
        {
            field: 'Cost',
            headerName: 'Cost',
            headerClassName: 'table-header',
            width: 150,
            type: 'number',
            renderCell: (params: GridRenderCellParams) => {
                if (params.row.isGroup) {
                    return (
                        <Typography
                            variant="body1"
                            sx={{ width: '100%', padding: '8px' }}
                        >
                            {params.row.EventTotalCost}
                        </Typography>
                    )
                }
                return params.row.Cost
            },
        },
        {
            field: 'MainEventName',
            headerName: 'Event Name',
            headerClassName: 'table-header',
            width: 200,
        },
    ]
    // Function to add group headers to the finance records
    function addGroupHeaders(records: FinanceRow[]): FinanceRow[] {
        const groupedRecords: FinanceRow[] = []

        // Create a map to store records by MainEvent
        const recordsByEvent = records.reduce((acc, record) => {
            if (!acc[record.MainEventID]) {
                acc[record.MainEventID] = []
            }
            acc[record.MainEventID].push(record)
            return acc
        }, {} as Record<string, FinanceRow[]>)

        // Iterate over each event and add a group header followed by its records
        for (const [mainEvent, eventRecords] of Object.entries(
            recordsByEvent
        )) {
            // Calculate the total cost for the event
            const totalCost = eventRecords.reduce(
                (sum, record) => sum + (record.Cost || 0),
                0
            )

            // Add a group header for the event
            const groupHeader: FinanceRow = {
                RecordID: `group-${mainEvent}`,
                MainEventID: mainEvent,
                MainEventName: `${eventRecords[0].MainEventDate?.format(
                    'DD.MM.YYYY'
                )} | ${eventRecords[0].MainEventName} | Keynote Speaker: ${
                    eventRecords[0].KeyNoteSpeakerName
                }`, // Assuming all records for an event have the same EventName
                ExpenseCategory: '',
                ExpenseDescription: '',
                Cost: 0,
                ExpenseDate: dayjs(), // Use the current date or a specific date if needed
                FundingAccount: '',
                isGroup: true,
                EventTotalCost: totalCost,
            }

            // Add the group header and its associated records
            groupedRecords.push(groupHeader, ...eventRecords)
        }

        return groupedRecords
    }

    const rowsWithGroups = addGroupHeaders(rows)
    console.log(rowsWithGroups)

    return (
        <Box
            className="shadow-md rounded-lg"
            sx={{
                backgroundColor: 'background.paper',
                width: '100%',
                height: '75vh',
            }}
        >
            <DataGrid
                rows={rowsWithGroups}
                columns={columns}
                getRowId={(row) => row.RecordID}
                getRowHeight={() => 'auto'}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                    columns: {
                        columnVisibilityModel: {
                            MainEventName: false,
                        },
                    },
                }}
                slots={{ toolbar: CustomToolbarWithGroups }}
                slotProps={{
                    filterPanel: {
                        sx: {
                            '& .MuiDataGrid-filterForm': {
                                paddingY: '1.5rem',
                                paddingLeft: '0',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '0.125rem',
                            },
                            '& .MuiFormControl-root': { marginRight: '0.5rem' },
                        },
                    },
                    baseButton: {
                        sx: {
                            color: 'text.primary',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        },
                    },
                }}
                getRowClassName={(params) =>
                    params.row.isGroup ? 'group-row' : 'data-row'
                }
                disableColumnSorting
                sx={{
                    '& .table-header': {
                        backgroundColor: 'secondary.main',
                        color: 'black',
                    },
                    '& .MuiDataGrid-row': {
                        borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    },
                    '& .MuiDataGrid-cell': {
                        padding: '8px',
                    },
                    '& .group-row .MuiDataGrid-cell': {
                        backgroundColor: '#E5E4E2',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        whiteSpace: 'normal', // Allow the group row to wrap if needed
                    },
                }}
            />
        </Box>
    )
}
