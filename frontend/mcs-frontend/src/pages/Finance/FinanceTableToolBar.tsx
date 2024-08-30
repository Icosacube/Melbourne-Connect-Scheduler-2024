import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { Button, ButtonProps } from '@mui/material'
import {
    gridPaginatedVisibleSortedGridRowIdsSelector,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridValidRowModel,
    useGridApiContext,
} from '@mui/x-data-grid'
import { saveAs } from 'file-saver'
import * as React from 'react'
import * as XLSX from 'xlsx'

// Define types for our row data
interface GroupRow extends GridValidRowModel {
    isGroup: true
    MainEventName: string
    EventTotalCost: number
}

interface RegularRow extends GridValidRowModel {
    isGroup?: false
    ExpenseDate?: string | Date
    [key: string]: any
}

type FinanceRow = GroupRow | RegularRow

// Helper function to estimate Excel column width
function getExcelColWidth(text: string): number {
    const charWidths: { [key: string]: number } = {
        ' ': 0.7,
        l: 0.5,
        i: 0.5,
        '!': 0.5,
        I: 0.5,
        m: 1.2,
        w: 1.2,
        W: 1.2,
        M: 1.2,
    }
    const defaultCharWidth = 1

    return (
        text.split('').reduce((width, char) => {
            return width + (charWidths[char] || defaultCharWidth)
        }, 0) + 1
    ) // Add 1 for some padding
}

export const CustomToolbarWithGroups: React.FC = () => {
    const apiRef = useGridApiContext()

    const handleExport = (currentPageOnly: boolean = false) => {
        const columns = apiRef.current.getAllColumns()
        let rows: FinanceRow[]

        if (currentPageOnly) {
            const currentPageRows =
                gridPaginatedVisibleSortedGridRowIdsSelector(apiRef)
            rows = currentPageRows.map((id) =>
                apiRef.current.getRow(id)
            ) as FinanceRow[]
        } else {
            rows = apiRef.current.getSortedRows() as FinanceRow[]
        }

        // Prepare data for Excel
        const data: (string | number)[][] = [
            columns.map((col) => col.headerName || col.field),
        ]

        const merges: XLSX.Range[] = []
        let rowIndex = 1 // Start from 1 because 0 is the header row

        rows.forEach((row) => {
            if (row.isGroup) {
                // Group header row
                data.push([
                    row.MainEventName,
                    '',
                    '',
                    '',
                    `Total Cost: ${row.EventTotalCost}`,
                ])

                // Add merge for this row
                merges.push({
                    s: { r: rowIndex, c: 0 },
                    e: { r: rowIndex, c: 3 },
                })
            } else {
                // Regular data row
                data.push(
                    columns.map((col) => {
                        if (col.field === 'ExpenseDate') {
                            return row.ExpenseDate
                                ? new Date(row.ExpenseDate).toLocaleDateString()
                                : ''
                        }
                        return row[col.field] ?? ''
                    })
                )
            }
            rowIndex++
        })

        // Generate worksheet
        const ws = XLSX.utils.aoa_to_sheet(data)

        // Add merges to worksheet
        ws['!merges'] = merges

        // Auto-size columns
        const colWidths: number[] = columns.map(() => 0) // Initialize with 0 width for each column

        // Calculate max width for each column, including headers
        data.forEach((row, rowIndex) => {
            row.forEach((cellValue, colIndex) => {
                // For merged cells, only consider the first column's width
                if (
                    rowIndex === 0 ||
                    !merges.some(
                        (merge) =>
                            merge.s.r === rowIndex &&
                            merge.s.c <= colIndex &&
                            merge.e.c >= colIndex
                    )
                ) {
                    const cellWidth = getExcelColWidth(String(cellValue))
                    if (cellWidth > colWidths[colIndex]) {
                        colWidths[colIndex] = cellWidth
                    }
                }
            })
        })

        // For merged cells, distribute the width
        merges.forEach((merge) => {
            const mergeWidth = colWidths
                .slice(merge.s.c, merge.e.c + 1)
                .reduce((a, b) => a + b, 0)
            const avgWidth = mergeWidth / (merge.e.c - merge.s.c + 1)
            for (let i = merge.s.c; i <= merge.e.c; i++) {
                colWidths[i] = avgWidth
            }
        })

        // Set column widths
        ws['!cols'] = colWidths.map((width) => ({ wch: Math.min(width, 50) })) // Cap width at 50 characters

        // Generate workbook
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Finance Data')

        // Generate Excel file
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const blob = new Blob([wbout], { type: 'application/octet-stream' })

        // Save the file
        saveAs(
            blob,
            `Finance_Data_Grouped_${
                currentPageOnly ? 'CurrentPage' : 'AllPages'
            }_${new Date().toISOString()}.xlsx`
        )
    }

    const buttonBaseProps: ButtonProps = {
        color: 'primary',
        size: 'small',
        startIcon: <FileDownloadIcon />,
    }

    return (
        <GridToolbarContainer>
            <Button {...buttonBaseProps} onClick={() => handleExport(true)}>
                Filtered Rows
            </Button>
            <Button {...buttonBaseProps} onClick={() => handleExport(false)}>
                All Rows
            </Button>
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    )
}
