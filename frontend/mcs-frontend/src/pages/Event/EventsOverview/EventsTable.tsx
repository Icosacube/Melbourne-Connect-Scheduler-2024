import { DataGrid } from '@mui/x-data-grid'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import type { GridColDef } from '@mui/x-data-grid'
import { MainEvent, Speaker } from '../../../types/frontendTypes'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import { CustomToolbar } from '../../../components'

interface EventsTableProps {
    events: MainEvent[]
    speakers: Speaker[]
}

export const EventsTable: FC<EventsTableProps> = ({ events, speakers }) => {
    const navigate = useNavigate()
    const handleRowClick = (params: { row: MainEvent }) => {
        navigate(`/event/${params.row.RecordID}`)
    }

    function getRowId(event: MainEvent) {
        return event.RecordID
    }

    const columns: GridColDef<MainEvent>[] = [
        {
            field: 'Date',
            headerName: 'Date',
            headerClassName: 'event-table',
            minWidth: 160,
            maxWidth: 200,
            renderCell: (params) => params.value.format('DD/MM/YYYY, HH:MM'),
        },
        {
            field: 'EventName',
            headerName: 'Event Name',
            headerClassName: 'event-table',
            flex: 2,
            minWidth: 200,
            maxWidth: 1200,
        },
        {
            field: 'Speaker',
            headerName: 'Speaker',
            headerClassName: 'event-table',
            flex: 1,
            minWidth: 200,
            maxWidth: 600,
            renderCell: (params) => {
                const speakerIds = params.row.Speaker
                const speakerNames = speakerIds
                    .map((id) => {
                        const speaker = speakers.find(
                            (speaker) => speaker.RecordID === id
                        )
                        return speaker
                            ? `${speaker.FirstName} ${speaker.LastName}`
                            : null
                    })
                    .filter((name) => name !== null)

                return speakerNames.join(', ')
            },
        },
        {
            field: 'Completed',
            headerName: 'Status',
            headerClassName: 'event-table',
            width: 72,
            align: 'center',
            renderCell: (params) => {
                return params.value ? (
                    <CheckCircleIcon
                        fontSize="medium"
                        sx={{ color: 'success.main' }}
                    />
                ) : (
                    <PendingIcon
                        fontSize="medium"
                        sx={{ color: 'primary.main' }}
                    />
                )
            },
        },
    ]

    return (
        <DataGrid
            rows={events}
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
                '& .event-table': {
                    backgroundColor: '#FBE418',
                    color: 'black',
                },
                '.MuiDataGrid-columnHeaderTitleContainer': {
                    backgroundColor: '#FBE418',
                },
            }}
            onRowClick={handleRowClick}
        />
    )
}
