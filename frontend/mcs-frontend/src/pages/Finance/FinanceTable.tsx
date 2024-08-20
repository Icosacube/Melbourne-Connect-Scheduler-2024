import React, { FC } from 'react'
import {
    DataGrid,
    GridColDef,
    GridCsvExportOptions,
    GridCsvGetRowsToExportParams,
    gridExpandedSortedRowIdsSelector,
    gridPaginatedVisibleSortedGridRowIdsSelector,
    GridRenderCellParams,
    gridSortedRowIdsSelector,
    GridToolbar,
    GridToolbarContainer,
    useGridApiContext,
} from '@mui/x-data-grid'
import { ButtonProps, Typography, Button } from '@mui/material'
import dayjs from 'dayjs'
import { Finance } from '../../types/frontendTypes'
import { createSvgIcon } from '@mui/material/utils'
import { CustomToolbar } from '../../components'

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
    { field: 'FundingAccount', headerName: 'Funding Account', width: 200 },
    { field: 'Cost', headerName: 'Cost', width: 150, type: 'number' },
]

export const FinanceTable: FC<FinanceTableProps> = ({ rows }) => {
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
            slots={{ toolbar: CustomToolbar }}
            pageSizeOptions={[5, 10]}
            getRowClassName={(params) =>
                params.row.isGroup ? 'group-row' : 'data-row'
            }
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

// const getRowsFromCurrentPage = ({ apiRef }: GridCsvGetRowsToExportParams) =>
//     gridPaginatedVisibleSortedGridRowIdsSelector(apiRef)

// const getUnfilteredRows = ({ apiRef }: GridCsvGetRowsToExportParams) =>
//     gridSortedRowIdsSelector(apiRef)

// const getFilteredRows = ({ apiRef }: GridCsvGetRowsToExportParams) =>
//     gridExpandedSortedRowIdsSelector(apiRef)

// const ExportIcon = createSvgIcon(
//     <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
//     'SaveAlt'
// )

// function CustomToolbar() {
//     const apiRef = useGridApiContext()

//     const handleExport = (options: GridCsvExportOptions) =>
//         apiRef.current.exportDataAsCsv(options)

//     const buttonBaseProps: ButtonProps = {
//         color: 'primary',
//         size: 'small',
//         startIcon: <ExportIcon />,
//     }

//     return (
//         <GridToolbarContainer>
//             <Button
//                 {...buttonBaseProps}
//                 onClick={() =>
//                     handleExport({ getRowsToExport: getRowsFromCurrentPage })
//                 }
//             >
//                 Current page rows
//             </Button>
//             <Button
//                 {...buttonBaseProps}
//                 onClick={() =>
//                     handleExport({ getRowsToExport: getFilteredRows })
//                 }
//             >
//                 Filtered rows
//             </Button>
//             <Button
//                 {...buttonBaseProps}
//                 onClick={() =>
//                     handleExport({ getRowsToExport: getUnfilteredRows })
//                 }
//             >
//                 Unfiltered rows
//             </Button>
//         </GridToolbarContainer>
//     )
// }
