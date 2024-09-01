import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs, { Dayjs } from 'dayjs'
import { Grid, Checkbox, Stack, Typography } from '@mui/material'
import { Check, DoNotDisturb } from '@mui/icons-material'
import { TimeSlot } from '../../types/frontendTypes'
import './index.css'

// TimeSlotTemp with extra isAvailable field
interface TimeSlotTemp {
    id: string
    StartTime: Dayjs
    EndTime: Dayjs
    isAvailable: boolean
}

interface CheckboxCalendarProps {
    timeSlots: TimeSlot[]
}

export const CheckboxCalendar: React.FC<CheckboxCalendarProps> = ({
    timeSlots,
}) => {
    const [allTimeSlots, setAllTimeSlots] = useState<TimeSlot[]>(timeSlots)
    const [allTimeSlotTemps, setAllTimeSlotTemps] = useState<TimeSlotTemp[]>([])

    const eventDate = '2024-09-01'
    const temp: TimeSlotTemp[] = [
        {
            id: dayjs('2024-09-01T10:00:00').valueOf().toString(),
            StartTime: dayjs('2024-09-01T10:00:00'),
            EndTime: dayjs('2024-09-01T11:00:00'),
            isAvailable: false,
        },
        {
            id: dayjs('2024-09-02T14:00:00').valueOf().toString(),
            StartTime: dayjs('2024-09-02T14:00:00'),
            EndTime: dayjs('2024-09-02T14:45:00'),
            isAvailable: false,
        },
        {
            id: dayjs('2024-09-02T16:00:00').valueOf().toString(),
            StartTime: dayjs('2024-09-02T16:00:00'),
            EndTime: dayjs('2024-09-02T16:30:00'),
            isAvailable: false,
        },
        {
            id: dayjs('2024-09-03T10:00:00').valueOf().toString(),
            StartTime: dayjs('2024-09-03T10:00:00'),
            EndTime: dayjs('2024-09-03T11:00:00'),
            isAvailable: false,
        },
    ]

    const minDate = temp[0].StartTime.startOf('day').toISOString()
    const maxDate = temp[temp.length - 1].EndTime.endOf('day').toISOString()

    useEffect(() => {
        // Convert TimeSlot[] to TimeSlotTemp[]
        const initialTimeSlotsTemp: TimeSlotTemp[] = timeSlots.map((slot) => ({
            id: dayjs(slot.StartTime).valueOf().toString(),
            StartTime: slot.StartTime,
            EndTime: slot.EndTime,
            isAvailable: false,
        }))
        setAllTimeSlotTemps(initialTimeSlotsTemp)
    }, [timeSlots])

    const handleCheckboxChange = (slotId: string) => {
        const updatedSlots = allTimeSlotTemps.map((slot) => {
            if (slot.id === slotId) {
                return {
                    ...slot,
                    isAvailable: !slot.isAvailable,
                }
            }
            return slot
        })
        setAllTimeSlotTemps(updatedSlots)
    }

    const renderEventContent = (eventInfo: any) => {
        const slot = allTimeSlotTemps.find(
            (slot) => slot.id === eventInfo.event.id
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
                            {slot!.isAvailable ? 'Available' : 'Available?'}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={slot!.isAvailable}
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

    const timeSlotsFC = allTimeSlotTemps.map((slot) => ({
        id: slot.id,
        start: slot.StartTime.toDate(),
        end: slot.EndTime.toDate(),
        backgroundColor: slot.isAvailable ? '#84B36A' : '#CCCCCC',
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
