import React, { FC } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'

// Assuming Finance and FinanceRow types are imported from your types file
import { Finance } from '../../types/frontendTypes'
type FinanceRow = Finance & {
    EventName: string
    isGroup?: boolean
}
interface FinanceTableProps {
    rows: (FinanceRow & { isGroup?: boolean })[]
}

const columns: GridColDef[] = [
    {
        field: 'ExpenseDate',
        headerName: 'Expense Date',
        width: 150,
        renderCell: (params: GridRenderCellParams) => {
            if (params.row.isGroup) {
                console.log(params)
                return (
                    <Typography
                        variant="h6"
                        sx={{ width: '100%', padding: '8px' }}
                    >
                        {params.row.EventName}
                    </Typography>
                )
            }

            const date = dayjs(params.value)
            return date.isValid() ? date.format('YYYY.MM.DD') : ''
        },
        colSpan: (value, row) => {
            if (row.isGroup) return 5
        },
    },
    { field: 'ExpenseCategory', headerName: 'Category', width: 150 },
    { field: 'ExpenseDescription', headerName: 'Description', width: 300 },
    { field: 'Cost', headerName: 'Total Amount', width: 150, type: 'number' },
    { field: 'FundingAccount', headerName: 'Funding Account', width: 200 },
]

export const FinanceTable: React.FC<FinanceTableProps> = ({ rows }) => {
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
            }

            // Add the group header and its associated records
            groupedRecords.push(groupHeader, ...eventRecords)
        }

        return groupedRecords
    }

    const rowsWithGroups = addGroupHeaders(rows)
    return (
        <DataGrid
            rows={rowsWithGroups}
            columns={columns}
            getRowId={(row) => row.RecordID}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[5, 10]}
            getRowClassName={(params) =>
                params.row.isGroup ? 'group-row' : 'data-row'
            }
            sx={{
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f5f5f5',
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
