import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs, { Dayjs } from 'dayjs'
import { Grid, Stack, Typography, Paper, TextField } from '@mui/material'
import './index.css'

interface TimeSlot {
    id: string
    StartDate: Dayjs
    EndDate: Dayjs
    availableSpeakers: string[]
}

export const AvailabilityCalendar: React.FC = () => {
    const [allTimeSlots, setAllTimeSlots] = useState<TimeSlot[]>([])
    const [filteredTimeSlots, setFilteredTimeSlots] = useState<TimeSlot[]>([])
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
    const [speakerFilter, setSpeakerFilter] = useState('')

    // Dummy data for the calendar
    const eventDate = '2024-09-01'
    const temp: TimeSlot[] = [
        {
            id: dayjs('2024-09-01T10:00:00').valueOf().toString(),
            StartDate: dayjs('2024-09-01T10:00:00'),
            EndDate: dayjs('2024-09-01T11:00:00'),
            availableSpeakers: ['Speaker 1', 'Speaker 2'],
        },
        {
            id: dayjs('2024-09-02T14:00:00').valueOf().toString(),
            StartDate: dayjs('2024-09-02T14:00:00'),
            EndDate: dayjs('2024-09-02T14:45:00'),
            availableSpeakers: ['Speaker 3'],
        },
        {
            id: dayjs('2024-09-02T16:00:00').valueOf().toString(),
            StartDate: dayjs('2024-09-02T16:00:00'),
            EndDate: dayjs('2024-09-02T16:30:00'),
            availableSpeakers: [],
        },
        {
            id: dayjs('2024-09-03T10:00:00').valueOf().toString(),
            StartDate: dayjs('2024-09-03T10:00:00'),
            EndDate: dayjs('2024-09-03T11:00:00'),
            availableSpeakers: ['Speaker 4', 'Speaker 5', 'Speaker 6'],
        },
    ]

    const minDate = temp[0].StartDate.startOf('day').toISOString()
    const maxDate = temp[temp.length - 1].EndDate.endOf('day').toISOString()

    useEffect(() => {
        setAllTimeSlots(temp)
        setFilteredTimeSlots(temp)
    }, [])

    useEffect(() => {
        if (speakerFilter === '') {
            setFilteredTimeSlots(allTimeSlots)
        } else {
            setFilteredTimeSlots(
                allTimeSlots.filter((slot) =>
                    slot.availableSpeakers.some((speaker) =>
                        speaker
                            .toLowerCase()
                            .includes(speakerFilter.toLowerCase())
                    )
                )
            )
        }
    }, [speakerFilter, allTimeSlots])

    // Handle clicking on an event
    const handleEventClick = (info: any) => {
        const slot = allTimeSlots.find((slot) => slot.id === info.event.id)
        setSelectedSlot(slot || null)
    }

    // Render content inside the calendar events
    const renderEventContent = (eventInfo: any) => {
        const slot = allTimeSlots.find((slot) => slot.id === eventInfo.event.id)

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
                    <Grid item>
                        <Typography variant="h6">
                            {slot ? `${slot.availableSpeakers.length}` : '0'}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    const timeSlotsFC = filteredTimeSlots.map((slot) => ({
        id: slot.id,
        start: slot.StartDate.toDate(),
        end: slot.EndDate.toDate(),
        backgroundColor:
            slot.availableSpeakers.length > 0 ? '#84B36A' : '#CCCCCC',
    }))

    return (
        <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={9} lg={10}>
                    <FullCalendar
                        plugins={[timeGridPlugin, interactionPlugin]}
                        eventColor="#CCCCCC"
                        eventTextColor="black"
                        initialView="timeGridWeek"
                        contentHeight="auto"
                        events={timeSlotsFC}
                        allDaySlot={false}
                        headerToolbar={{
                            left: 'title',
                            center: '',
                            right: 'prev,next',
                        }}
                        initialDate={eventDate}
                        slotMinTime="09:00:00"
                        slotMaxTime="20:00:00"
                        locale="en-GB"
                        editable={false}
                        eventContent={renderEventContent}
                        validRange={{
                            start: minDate,
                            end: maxDate,
                        }}
                        eventClick={handleEventClick}
                        dateClick={() => setSelectedSlot(null)}
                    />
                </Grid>
                <Grid item xs={12} md={3} lg={2}>
                    <TextField
                        label="Filter by Speaker"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={speakerFilter}
                        onChange={(e) => setSpeakerFilter(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    {selectedSlot ? (
                        <Grid container spacing={1}>
                            <Grid
                                item
                                xs={12}
                                container
                                sx={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Grid item xs={10} container>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1">
                                            {selectedSlot.StartDate.format(
                                                'HH:mm'
                                            )}{' '}
                                            -{' '}
                                            {selectedSlot.EndDate.format(
                                                'HH:mm'
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" gutterBottom>
                                            {selectedSlot.StartDate.format(
                                                'ddd, MMM DD'
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">
                                        {selectedSlot.availableSpeakers.length}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {selectedSlot.availableSpeakers.map(
                                    (speaker, index) => (
                                        <Typography>{speaker}</Typography>
                                    )
                                )}
                            </Grid>
                        </Grid>
                    ) : (
                        <Typography variant="body1">
                            Click on a time slot to view details.
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Paper>
    )
}
