import * as React from 'react'
import { Button, ButtonProps } from '@mui/material'
import {
    GridCsvExportOptions,
    GridCsvGetRowsToExportParams,
    gridPaginatedVisibleSortedGridRowIdsSelector,
    GridToolbarContainer,
    useGridApiContext,
} from '@mui/x-data-grid'
import { createSvgIcon } from '@mui/material/utils'

const getRowsFromCurrentPage = ({ apiRef }: GridCsvGetRowsToExportParams) =>
    gridPaginatedVisibleSortedGridRowIdsSelector(apiRef)

const ExportIcon = createSvgIcon(
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
    'SaveAlt'
)

export const CustomToolbar = () => {
    const apiRef = useGridApiContext()

    const handleExport = (options?: GridCsvExportOptions) =>
        apiRef.current.exportDataAsCsv(options)

    const buttonBaseProps: ButtonProps = {
        color: 'primary',
        size: 'small',
        startIcon: <ExportIcon />,
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
        </GridToolbarContainer>
    )
}
