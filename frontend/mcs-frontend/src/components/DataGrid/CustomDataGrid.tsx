import { Box } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomToolbar } from './CustomToolBar'

interface CustomDataGridProps {
    rows: any
    columns: GridColDef<any>[]
    getRowId: (item: any) => string
    rowNavigationPath?: string
}

export const CustomDataGrid: FC<CustomDataGridProps> = ({
    rows,
    columns,
    getRowId,
    rowNavigationPath = '',
}) => {
    // Navigation on click
    const navigate = useNavigate()

    const handleRowClick = (params: { row: any }) => {
        if (!rowNavigationPath) return
        navigate(`${rowNavigationPath}/${params.row.RecordID}`)
    }

    // Style header
    const modifiedColumns = columns.map((column) => ({
        ...column,
        headerClassName: 'table-header',
    }))

    return (
        <Box
            className="w-full shadow-md rounded-lg"
            sx={{ backgroundColor: 'background.paper' }}
        >
            <DataGrid
                rows={rows}
                columns={modifiedColumns}
                getRowId={getRowId}
                pageSizeOptions={[5, 10, 15]}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
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
                    baseButton: {
                        sx: {
                            color: 'text.primary',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        },
                    },
                }}
                sx={{
                    '& .table-header': {
                        backgroundColor: 'secondary.main',
                        color: 'black',
                    },
                    '.MuiDataGrid-columnHeaderTitleContainer': {
                        backgroundColor: 'secondary.main',
                    },
                    '& .MuiDataGrid-row': {
                        transition: 'transform 0.2s ease-in-out',
                        paddingLeft: '0.5rem',
                        paddingRight: '0.5rem', // Smooth transition for the grow effect
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        cursor: 'pointer',
                        transform: 'scale(1.02)', // This makes the row grow by 2% on hover
                        zIndex: 1, // This ensures the growing row appears above other rows
                    },
                }}
                onRowClick={handleRowClick}
            />
        </Box>
    )
}
