import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomToolbar } from '../../../components'
import { Speaker } from '../../../types/frontendTypes'

interface SpeakerTableProps {
    data: Speaker[]
}

const columns: GridColDef[] = [
    {
        field: 'Title',
        headerName: 'Title',
        headerClassName: 'speaker-table',
        width: 70,
    },
    {
        field: 'FirstName',
        headerName: 'First Name',
        headerClassName: 'speaker-table',
        width: 100,
    },
    {
        field: 'LastName',
        headerName: 'Last Name',
        headerClassName: 'speaker-table',
        width: 100,
    },
    {
        field: 'PrimaryEmail',
        headerName: 'Email',
        headerClassName: 'speaker-table',
        flex: 1,
        width: 300,
    },
    {
        field: 'Phone',
        headerName: 'Phone',
        headerClassName: 'speaker-table',
        flex: 1,
        width: 300,
    },
    {
        field: 'Organisation',
        headerName: 'Organisation',
        headerClassName: 'speaker-table',
        flex: 1,
        width: 300,
    },
    {
        field: 'Country',
        headerName: 'Country',
        headerClassName: 'speaker-table',
        flex: 1,
        width: 300,
    },
    {
        field: 'Trip',
        headerName: 'Upcoming Trip',
        headerClassName: 'speaker-table',
        flex: 1,
        width: 300,
    },
]

export const SpeakerTable: FC<SpeakerTableProps> = ({ data }) => {
    const navigate = useNavigate()

    const handleRowClick = (params: { row: Speaker }) => {
        navigate(`/speaker/${params.row.RecordID}`)
    }

    function getRowId(row: Speaker): string {
        return row.RecordID
    }

    return (
        <DataGrid
            rows={data}
            columns={columns}
            getRowId={getRowId}
            pageSizeOptions={[5, 10]}
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
            checkboxSelection
            sx={{
                '& .speaker-table': {
                    backgroundColor: '#BF4242',
                    color: '#EBF5EE',
                },
                '.MuiDataGrid-columnHeaderTitleContainer': {
                    backgroundColor: '#BF4242',
                },
            }}
            onRowClick={handleRowClick}
        />
    )
}
