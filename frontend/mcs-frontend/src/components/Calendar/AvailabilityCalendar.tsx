import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs, {Dayjs} from 'dayjs'
import { Button, Grid, Stack, Typography, Paper, TextField } from '@mui/material'
import { TimeSlot } from '../../types/frontendTypes'

import './index.css'

interface TimeSlotTemp {
    id: string
    StartTime: Dayjs
    EndTime: Dayjs
    AvailableAcademic: string[]
}

// TimeSlotTemp Display
interface AvailabilityCalendarProps {
    timeSlots: TimeSlot[]
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ timeSlots }) =>  {
    const [allTimeSlotTemps, setAllTimeSlotTemps] = useState<TimeSlotTemp[]>([])
    const [filteredTimeSlotTemps, setFilteredTimeSlotTemps] = useState<TimeSlotTemp[]>([])
    const [selectedSlot, setSelectedSlot] = useState<TimeSlotTemp | null>(null)
    const [speakerFilter, setSpeakerFilter] = useState('')
    const [minDate, setMinDate] = useState('')
    const [maxDate, setMaxDate] = useState('')

    // Dummy data for the calendar
    const eventDate = '2024-09-01'


    useEffect(() => {
        // Convert TimeSlot[] to TimeSlotTemp[] for calendar
        const temp = timeSlots.map((slot) => ({
            id: dayjs(slot.StartTime).valueOf().toString(),
            StartTime: slot.StartTime,
            EndTime: slot.EndTime,
            AvailableAcademic: slot.AvailableAcademic,
        }))
        setAllTimeSlotTemps(temp)
        setFilteredTimeSlotTemps(temp)
        setMinDate(temp[0].StartTime.startOf('day').toISOString())
        setMaxDate(temp[temp.length - 1].EndTime.endOf('day').toISOString())
    }, [timeSlots])

    useEffect(() => {
        if (speakerFilter === '') {
            setFilteredTimeSlotTemps(allTimeSlotTemps)
        } else {
            setFilteredTimeSlotTemps(
                allTimeSlotTemps.filter((slot) =>
                    slot.AvailableAcademic.some((speaker) =>
                        speaker
                            .toLowerCase()
                            .includes(speakerFilter.toLowerCase())
                    )
                )
            )
        }
    }, [speakerFilter, allTimeSlotTemps])

    // Handle clicking on an event
    const handleEventClick = (info: any) => {
        const slot = allTimeSlotTemps.find((slot) => slot.id === info.event.id)
        setSelectedSlot(slot || null)
    }

    // Render content inside the calendar events
    const renderEventContent = (eventInfo: any) => {
        const slot = allTimeSlotTemps.find((slot) => slot.id === eventInfo.event.id)

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
                            {slot ? `${slot.AvailableAcademic.length}` : '0'}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    const timeSlotsFC = filteredTimeSlotTemps.map((slot) => ({
        id: slot.id,
        start: slot.StartTime.toDate(),
        end: slot.EndTime.toDate(),
        backgroundColor:
            slot.AvailableAcademic.length > 0 ? '#FBCB18' : '#CCCCCC',
    }))

    return (
        <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}> 
                    <Button>

                    </Button>
                </Grid>
                <Grid item xs={12} md={9} lg={10}>
                    <FullCalendar
                        plugins={[timeGridPlugin, interactionPlugin]}
                        eventColor="white"
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
                                            {selectedSlot.StartTime.format(
                                                'HH:mm'
                                            )}{' '}
                                            -{' '}
                                            {selectedSlot.EndTime.format(
                                                'HH:mm'
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" gutterBottom>
                                            {selectedSlot.StartTime.format(
                                                'ddd, MMM DD'
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">
                                        {selectedSlot.AvailableAcademic.length}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {selectedSlot.AvailableAcademic.map(
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
