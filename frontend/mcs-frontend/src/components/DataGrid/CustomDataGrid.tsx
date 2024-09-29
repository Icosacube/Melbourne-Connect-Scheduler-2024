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
    rowNavigationPath: string
}

export const CustomDataGrid: FC<CustomDataGridProps> = ({
    rows,
    columns,
    getRowId,
    rowNavigationPath,
}) => {
    const navigate = useNavigate()

    const handleRowClick = (params: { row: any }) => {
        navigate(`${rowNavigationPath}/${params.row.RecordID}`)
    }

    // Style header
    const modifiedColumns = columns.map((column) => ({
        ...column,
        headerClassName: 'table-header',
    }))

    return (
        <Box className="w-full bg-white shadow-md rounded-lg">
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
                }}
                sx={{
                    '& .table-header': {
                        backgroundColor: 'secondary.main',
                        color: 'black',
                    },
                    '.MuiDataGrid-columnHeaderTitleContainer': {
                        backgroundColor: 'secondary.main',
                    },
                }}
                onRowClick={handleRowClick}
            />
        </Box>
    )
}
