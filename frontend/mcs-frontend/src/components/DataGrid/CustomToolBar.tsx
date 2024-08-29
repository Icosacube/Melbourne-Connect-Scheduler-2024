import * as React from 'react'
import { Button, ButtonProps } from '@mui/material'
import {
    GridCsvExportOptions,
    GridCsvGetRowsToExportParams,
    gridPaginatedVisibleSortedGridRowIdsSelector,
    GridToolbarContainer,
    GridToolbarFilterButton,
    useGridApiContext,
} from '@mui/x-data-grid'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const getRowsFromCurrentPage = ({ apiRef }: GridCsvGetRowsToExportParams) =>
    gridPaginatedVisibleSortedGridRowIdsSelector(apiRef)

export const CustomToolbar = () => {
    const apiRef = useGridApiContext()

    const handleExport = (options?: GridCsvExportOptions) => {
        let rowsToExport: any[]
        let exportType: string
        let exportOptions: GridCsvExportOptions = {
            allColumns: true, // This will include all columns, even hidden ones
        }

        if (options?.getRowsToExport === getRowsFromCurrentPage) {
            // Exporting current page
            const currentPageRowIds =
                gridPaginatedVisibleSortedGridRowIdsSelector(apiRef)
            rowsToExport = currentPageRowIds.map((id) =>
                apiRef.current.getRow(id)
            )
            exportType = 'Current_page_rows'
            exportOptions.getRowsToExport = getRowsFromCurrentPage
        } else {
            // Exporting all rows
            rowsToExport = apiRef.current.getSortedRows()
            exportType = 'All_rows'
        }

        console.log(`Exporting ${exportType}:`, rowsToExport)

        // Get all columns, including hidden ones
        const allColumns = apiRef.current.getAllColumns()

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(
            rowsToExport.map((row) => {
                const newRow: { [key: string]: any } = {}
                allColumns.forEach((col) => {
                    newRow[col.headerName || col.field] = row[col.field]
                })
                return newRow
            })
        )

        // Create workbook
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Data')

        // Generate Excel file
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        })

        // Save the file
        saveAs(data, `${exportType}_${new Date().toISOString()}.xlsx`)
    }

    const buttonBaseProps: ButtonProps = {
        color: 'primary',
        size: 'small',
        startIcon: <FileDownloadIcon />,
    }

    return (
        <GridToolbarContainer>
            <Button
                {...buttonBaseProps}
                onClick={() =>
                    handleExport({ getRowsToExport: getRowsFromCurrentPage })
                }
            >
                Current page rows
            </Button>
            <Button {...buttonBaseProps} onClick={() => handleExport()}>
                All rows
            </Button>
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    )
}
