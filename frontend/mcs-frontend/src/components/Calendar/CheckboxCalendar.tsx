import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs, { Dayjs } from 'dayjs'
import { Grid, Checkbox, Stack, Typography } from '@mui/material'
import { Check, DoNotDisturb } from '@mui/icons-material'
import './index.css'

// TimeSlot with extra available field
interface TimeSlot {
    id: string
    StartDate: Dayjs
    EndDate: Dayjs
    available: boolean
}

export const CheckboxCalendar: React.FC = () => {
    const [allTimeSlots, setAllTimeSlots] = useState<TimeSlot[]>([])

    const eventDate = '2024-09-01'
    const temp: TimeSlot[] = [
        {
            id: dayjs('2024-09-01T10:00:00').valueOf().toString(),
            StartDate: dayjs('2024-09-01T10:00:00'),
            EndDate: dayjs('2024-09-01T11:00:00'),
            available: false,
        },
        {
            id: dayjs('2024-09-02T14:00:00').valueOf().toString(),
            StartDate: dayjs('2024-09-02T14:00:00'),
            EndDate: dayjs('2024-09-02T14:45:00'),
            available: false,
        },
        {
            id: dayjs('2024-09-02T16:00:00').valueOf().toString(),
            StartDate: dayjs('2024-09-02T16:00:00'),
            EndDate: dayjs('2024-09-02T16:30:00'),
            available: false,
        },
        {
            id: dayjs('2024-09-03T10:00:00').valueOf().toString(),
            StartDate: dayjs('2024-09-03T10:00:00'),
            EndDate: dayjs('2024-09-03T11:00:00'),
            available: false,
        },
    ]

    const minDate = temp[0].StartDate.startOf('day').toISOString()
    const maxDate = temp[temp.length - 1].EndDate.endOf('day').toISOString()

    useEffect(() => {
        setAllTimeSlots(temp)
    }, [])

    const handleCheckboxChange = (slotId: string) => {
        const updatedSlots = allTimeSlots.map((slot) => {
            if (slot.id === slotId) {
                return {
                    ...slot,
                    available: !slot.available,
                }
            }
            return slot
        })
        setAllTimeSlots(updatedSlots)
    }

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
                            justifyContent: 'space-around',
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
                            {' '}
                            {slot!.available ? 'Available' : 'Available?'}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={slot!.available}
                            onChange={() => handleCheckboxChange(slot!.id)}
                            color="success"
                            sx={{ transform: 'scale(1.2)' }}
                            checkedIcon={<Check style={{ color: 'white' }} />}
                        />
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    const timeSlotsFC = allTimeSlots.map((slot) => ({
        id: slot.id,
        start: slot.StartDate.toDate(),
        end: slot.EndDate.toDate(),
        backgroundColor: slot.available ? '#84B36A' : '#CCCCCC',
    }))

    return (
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
        />
    )
}
