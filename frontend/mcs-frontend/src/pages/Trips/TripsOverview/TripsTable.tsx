import { DataGrid } from '@mui/x-data-grid'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import type { GridColDef } from '@mui/x-data-grid'
import { MainEvent, Speaker, Trip } from '../../../types/frontendTypes'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import { CustomToolbar } from '../../../components'

interface TripTableProps {
    events: MainEvent[]
    speakers: Speaker[]
    trips: Trip[]
}

export const TripTable: FC<TripTableProps> = ({ events, speakers, trips }) => {
    const navigate = useNavigate()

    const handleRowClick = (params: { row: Trip }) => {
        navigate(`/trips/${params.row.RecordID}`)
    }

    function getRowId(trip: Trip) {
        return trip.RecordID
    }

    const columns: GridColDef<Trip>[] = [
        {
            field: 'StartDate',
            headerName: 'Start Date',
            headerClassName: 'trip-table',
            width: 120,
            renderCell: (params) => params.value.format('DD/MM/YYYY'),
        },
        {
            field: 'GuestSpeaker',
            headerName: 'Guest Speaker',
            headerClassName: 'trip-table',
            flex: 1,
            minWidth: 120,
            maxWidth: 240,
            renderCell: (params) => {
                const speakerIds = params.row.GuestSpeaker
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
            field: 'MainEvent',
            headerName: 'Main Event',
            headerClassName: 'trip-table',
            flex: 1,
            minWidth: 280,
            renderCell: (params) => {
                const eventIds = params.row.MainEvent
                const eventNames = eventIds
                    .map((id) => {
                        const event = events.find(
                            (event) => event.RecordID === id
                        )
                        return event ? event.EventName : null
                    })
                    .filter((name) => name !== null)

                return eventNames.join(', ')
            },
        },
        {
            field: 'Completed',
            headerName: 'Status',
            headerClassName: 'trip-table',
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
            rows={trips}
            columns={columns}
            getRowId={getRowId}
            pageSizeOptions={[5, 10, 15]}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 15 },
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
                '& .trip-table': {
                    backgroundColor: 'secondary.main',
                    color: 'black',
                },
                '.MuiDataGrid-columnHeaderTitleContainer': {
                    backgroundColor: 'secondary.main',
                },
            }}
            onRowClick={handleRowClick}
        />
    )
}
