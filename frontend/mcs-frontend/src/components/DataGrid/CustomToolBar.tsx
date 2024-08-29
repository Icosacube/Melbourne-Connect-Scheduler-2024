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

const getRowsFromCurrentPage = ({ apiRef }: GridCsvGetRowsToExportParams) =>
    gridPaginatedVisibleSortedGridRowIdsSelector(apiRef)

export const CustomToolbar = () => {
    const apiRef = useGridApiContext()

    const handleExport = (options?: GridCsvExportOptions) =>
        apiRef.current.exportDataAsCsv(options)

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
