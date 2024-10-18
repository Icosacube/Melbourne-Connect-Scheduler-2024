import { GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'
import { CustomDataGrid } from '../../../components'
import { Speaker, Trip } from '../../../types/frontendTypes'
import dayjs from 'dayjs'

interface SpeakerTableProps {
    speakers: Speaker[]
    trips: Trip[]
}

export const SpeakerTable: FC<SpeakerTableProps> = ({ speakers, trips }) => {
    function getRowId(row: Speaker): string {
        return row.RecordID
    }
    console.log(trips)
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
            renderCell: (params) => {
                // return the date of the trip whose end data is closest to today's date and is upcoming
                const speakerTrips = trips.filter(
                    (trip) => trip.GuestSpeaker[0] === params.row.RecordID
                )
                const today = dayjs()

                // Find the closest future trip start date
                const closestTrip = speakerTrips
                    .filter(
                        (trip) =>
                            trip.EndDate.isAfter(today) ||
                            trip.EndDate.isSame(today, 'day')
                    ) // Filter for future trips
                    .sort((a, b) => {
                        const diffA = a.EndDate.diff(today) // Difference from today
                        const diffB = b.EndDate.diff(today)
                        return diffA - diffB // Sort by difference (ascending)
                    })[0] // Get the first element (closest future trip)

                // Return formatted date or a default message
                return closestTrip
                    ? `${closestTrip.EndDate.format(
                          'DD/MM/YYYY'
                      )} - ${closestTrip.StartDate.format('DD/MM/YYYY')}`
                    : 'No upcoming trips'
            },
        },
    ]

    return (
        <CustomDataGrid
            rows={speakers}
            columns={columns}
            getRowId={getRowId}
            rowNavigationPath={'/speaker'}
        />
    )
}
