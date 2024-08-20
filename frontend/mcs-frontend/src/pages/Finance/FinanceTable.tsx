import React, { FC } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import { CustomToolbar } from '../../components'
import { Finance as FinanceType, MainEvent } from '../../types/frontendTypes'

type FinanceRow = FinanceType & {
    EventName: string
    EventTotalCost?: number
    isGroup?: boolean
}

interface FinanceTableProps {
    rows: FinanceType[]
    events: MainEvent[]
}

const columns: GridColDef[] = [
    {
        field: 'ExpenseDate',
        headerName: 'Expense Date',
        width: 150,
        renderCell: (params: GridRenderCellParams) => {
            if (params.row.isGroup) {
                return (
                    <Typography variant="body1">
                        {params.row.EventName}
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
    { field: 'ExpenseCategory', headerName: 'Category', width: 150 },
    {
        field: 'ExpenseDescription',
        headerName: 'Description',
        width: 300,
    },
    { field: 'FundingAccount', headerName: 'Funding Account', width: 200 },
    {
        field: 'Cost',
        headerName: 'Cost',
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
    { field: 'EventName', headerName: 'Event Name', width: 200 },
]

export const FinanceTable: FC<FinanceTableProps> = ({ rows, events }) => {
    // Create a map of MainEvent IDs to Event Names and Total Costs
    const eventMap = new Map<string, { name: string; totalCost: number }>()
    events.forEach((event) => {
        eventMap.set(event.RecordID, {
            name: event.EventName,
            totalCost: event.EventTotal || 0, // Assuming EventTotal is a field in MainEvent
        })
    })

    // Add EventName and EventTotalCost to each finance record
    const updatedFinanceData: FinanceRow[] = rows.map((record) => {
        const eventInfo = eventMap.get(record.MainEvent)
        return {
            ...record,
            EventName: eventInfo?.name || '',
            EventTotalCost: eventInfo?.totalCost || 0,
        }
    })

    // Function to add group headers to the finance records
    function addGroupHeaders(records: FinanceRow[]): FinanceRow[] {
        const groupedRecords: FinanceRow[] = []

        // Create a map to store records by MainEvent
        const recordsByEvent = records.reduce((acc, record) => {
            if (!acc[record.MainEvent]) {
                acc[record.MainEvent] = []
            }
            acc[record.MainEvent].push(record)
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
                MainEvent: mainEvent,
                EventName: eventRecords[0].EventName, // Assuming all records for an event have the same EventName
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

    const rowsWithGroups = addGroupHeaders(updatedFinanceData)

    console.log(rowsWithGroups)

    return (
        <DataGrid
            rows={rowsWithGroups}
            columns={columns}
            getRowId={(row) => row.RecordID}
            getRowHeight={() => 'auto'}
            initialState={{
                pagination: {
                    paginationModel: { page: 0 },
                },
                columns: {
                    columnVisibilityModel: {
                        EventName: false,
                    },
                },
            }}
            slots={{ toolbar: CustomToolbar }}
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
            }}
            pageSizeOptions={[5, 10]}
            getRowClassName={(params) =>
                params.row.isGroup ? 'group-row' : 'data-row'
            }
            disableColumnSorting
            sx={{
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#1d6f42',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold',
                },
                '& .MuiDataGrid-row': {
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                },
                '& .MuiDataGrid-cell': {
                    padding: '8px',
                    whiteSpace: 'nowrap', // Prevent text wrapping
                },
                '& .group-row .MuiDataGrid-cell': {
                    backgroundColor: '#e0e0e0',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    whiteSpace: 'normal', // Allow the group row to wrap if needed
                },
            }}
        />
    )
}
