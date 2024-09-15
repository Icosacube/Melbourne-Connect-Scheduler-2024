import React, { useEffect, useState } from 'react'
import { Grid, Paper, Stack, Typography } from '@mui/material'
import { CanvassingResultsCalendar } from '../../../../components'
import { CanvassingResultsFCSidebar } from './CanvassingResultsFCSidebar'
import { Canvassing, MainEvent } from '../../../../types/frontendTypes'
import dayjs from 'dayjs'

const temp: Canvassing[] = [
    {
        RecordID: '1',
        StartTime: dayjs('2024-09-15T09:00:00'),
        EndTime: dayjs('2024-09-15T10:00:00'),
        Academic: ['academic1', 'academic2', 'academic3'],
        Venue: ['venue1'],
        MainEvent: ['event1'],
        AvailableAcademic: ['academic1', 'academic2'],
        EventName: ['event1'],
    },
    {
        RecordID: '2',
        StartTime: dayjs('2024-09-15T11:00:00'),
        EndTime: dayjs('2024-09-15T12:00:00'),
        Academic: ['academic1', 'academic2', 'academic3'],
        Venue: ['venue1'],
        MainEvent: ['event1'],
        AvailableAcademic: ['academic1', 'academic3'],
        EventName: ['event1'],
    },
    {
        RecordID: '3',
        StartTime: dayjs('2024-09-15T13:00:00'),
        EndTime: dayjs('2024-09-15T14:00:00'),
        Academic: ['academic1', 'academic2', 'academic3'],
        Venue: ['venue1'],
        MainEvent: ['event1'],
        AvailableAcademic: ['academic2'],
        EventName: ['event1'],
    },
]

export const CanvassingResultsFC: React.FC = ({}) => {
    const [canvassingSlots, setCanvassingSlots] = useState<Canvassing[]>(temp)
    const [filteredCanvassings, setFilteredCanvassings] = useState<
        Canvassing[]
    >([])
    const [selectedSlot, setSelectedSlot] = useState<Canvassing | null>(null)
    const [academicFilter, setAcademicFilter] = useState('')
    const [minDate, setMinDate] = useState('')
    const [maxDate, setMaxDate] = useState('')
    useEffect(() => {
        const canvassingSlots = temp

        setCanvassingSlots(canvassingSlots)
        setFilteredCanvassings(canvassingSlots)
        setMinDate(canvassingSlots[0].StartTime.startOf('day').toISOString())
        setMaxDate(
            canvassingSlots[canvassingSlots.length - 1].EndTime.endOf(
                'day'
            ).toISOString()
        )
    }, [])

    useEffect(() => {
        if (academicFilter === '') {
            setFilteredCanvassings(canvassingSlots)
        } else {
            setFilteredCanvassings(
                canvassingSlots.filter((slot) =>
                    slot.AvailableAcademic.some((academic) =>
                        academic
                            .toLowerCase()
                            .includes(academicFilter.toLowerCase())
                    )
                )
            )
        }
    }, [academicFilter, canvassingSlots])

    const handleEventClick = (info: any) => {
        const slot = canvassingSlots.find(
            (slot) => slot.RecordID === info.event.id
        )
        setSelectedSlot(slot || null)
    }

    const renderEventContent = (eventInfo: any) => {
        const slot = canvassingSlots.find(
            (slot) => slot.RecordID === eventInfo.event.id
        )

        return (
            <Grid
                container
                sx={{
                    padding: 1,
                    height: '100%',
                    justifyContent: 'space-around',
                }}
            >
                <Grid item xs={5} md={2}>
                    <Stack
                        direction="column"
                        sx={{
                            height: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Typography variant="body2">
                            {eventInfo.timeText.split('-')[0]}
                        </Typography>
                        <Typography variant="body2">
                            {eventInfo.timeText.split('-')[1]}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={6}
                    md={9}
                    container
                    className="flex items-center justify-end"
                >
                    <Typography variant="h6">
                        {slot ? `${slot.AvailableAcademic.length}` : '0'}
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper sx={{ padding: 4 }}>
                    <CanvassingResultsCalendar
                        canvassings={filteredCanvassings}
                        eventDate={dayjs(canvassingSlots[0].StartTime).format(
                            'YYYY-MM-DD'
                        )}
                        dateRange={{ start: minDate, end: maxDate }}
                        handleEventClick={handleEventClick}
                        renderEventContent={renderEventContent}
                        setSelectedSlot={setSelectedSlot}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper sx={{ padding: 4 }}>
                    <CanvassingResultsFCSidebar
                        academicFilter={academicFilter}
                        setAcademicFilter={setAcademicFilter}
                        selectedSlot={selectedSlot}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}
