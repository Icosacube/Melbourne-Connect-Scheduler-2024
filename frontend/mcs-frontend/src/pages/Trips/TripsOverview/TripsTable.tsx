import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import type { GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'
import { CustomDataGrid } from '../../../components'
import { MainEvent, Speaker, Trip } from '../../../types/frontendTypes'

interface TripTableProps {
    events: MainEvent[]
    speakers: Speaker[]
    trips: Trip[]
}

export const TripTable: FC<TripTableProps> = ({ events, speakers, trips }) => {
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
        <CustomDataGrid
            columns={columns}
            rows={trips}
            getRowId={getRowId}
            rowNavigationPath="/trips"
        />
    )
}
