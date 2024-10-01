import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import type { GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'
import { CustomDataGrid } from '../../../components/DataGrid/CustomDataGrid'
import { MainEvent, Speaker } from '../../../types/frontendTypes'
import { Dayjs } from 'dayjs'

interface EventsTableProps {
    events: MainEvent[]
    speakers: Speaker[]
}

export const EventsTable: FC<EventsTableProps> = ({ events, speakers }) => {
    function getRowId(event: MainEvent) {
        return event.RecordID
    }

    const columns: GridColDef<MainEvent>[] = [
        {
            field: 'StartDate',
            headerName: 'Start Date',
            minWidth: 160,
            maxWidth: 200,
            type: 'date',
            valueGetter: (value: Dayjs) => {
                return value.toDate()
            },
        },
        {
            field: 'EventName',
            headerName: 'Event Name',
            flex: 2,
            minWidth: 200,
            maxWidth: 1200,
        },
        {
            field: 'Speaker',
            headerName: 'Speaker',
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
            rows={events}
            getRowId={getRowId}
            rowNavigationPath="/event"
        />
    )
}
