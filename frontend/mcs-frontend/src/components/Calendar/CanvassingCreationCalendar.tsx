import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Grid, Button, Paper, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { TimeSlot } from '../../types/frontendTypes'
import { useForm, Controller } from 'react-hook-form'
import { FormInputMultiFreeSolo } from '../FormComponents'
import './index.css'

interface TimeSlotTemp {
    id: string
    StartTime: Dayjs
    EndTime: Dayjs
}

interface CanvassingCreationCalendarProps {
    MainEvent: string // change to MainEventObject
    setTimeSlots: (value: TimeSlot[]) => void
}

// academic temp
interface Person {
    id: string
    name: string
    image?: string
}

// Sample academics
const peopleOptions: Person[] = [
    { id: '1', name: 'John Doe', image: '/path/to/john_image.jpg' },
    { id: '2', name: 'Jane Smith', image: '/path/to/jane_image.jpg' },
    { id: '3', name: 'Michael Johnson', image: '/path/to/michael_image.jpg' },
]

export const CanvassingCreationCalendar: React.FC<
    CanvassingCreationCalendarProps
> = ({ MainEvent, setTimeSlots }) => {
    const [allTimeSlotTemps, setAllTimeSlotTemps] = useState<TimeSlotTemp[]>([])
    const { control, handleSubmit, setValue } = useForm()
    const eventDate = '2024-09-01'

    useEffect(() => {
        setAllTimeSlotTemps([])
    }, [])

    const handleSlotResize = (info: any) => {
        const { event } = info
        const updatedSlots = allTimeSlotTemps.map((slot) => {
            if (slot.id === event.id) {
                return {
                    ...slot,
                    StartTime: dayjs(event.start),
                    EndTime: dayjs(event.end),
                }
            }
            return slot
        })
        setAllTimeSlotTemps(updatedSlots)
    }

    const handleSlotDrag = (info: any) => {
        const { event } = info
        const updatedSlot: TimeSlotTemp = {
            id: event.id,
            StartTime: dayjs(event.start),
            EndTime: dayjs(event.end),
        }

        const updatedSlots = allTimeSlotTemps.map((slot) => {
            if (slot.id === updatedSlot.id) {
                return updatedSlot
            }
            return slot
        })
        setAllTimeSlotTemps(updatedSlots)
    }

    const handleDateClick = (info: any) => {
        const newTimeSlotTemp: TimeSlotTemp = {
            id: dayjs(info.date).valueOf().toString(),
            StartTime: dayjs(info.date),
            EndTime: dayjs(info.date).add(1, 'hour'),
        }
        setAllTimeSlotTemps([...allTimeSlotTemps, newTimeSlotTemp])
    }

    const renderEventContent = (eventInfo: any) => {
        return (
            <div
                style={{
                    padding: '2px',
                    textAlign: 'center',
                    fontFamily: 'Futura, sans-serif',
                }}
            >
                {eventInfo.timeText && <div>{eventInfo.timeText}</div>}
            </div>
        )
    }

    const timeSlotsFC = allTimeSlotTemps.map((slot) => ({
        id: slot.id,
        start: slot.StartTime.toDate(),
        end: slot.EndTime.toDate(),
    }))

    const onSubmit = (data: any) => {
        const timeSlots: TimeSlot[] = allTimeSlotTemps.map((slot) => ({
            MainEvent: MainEvent,
            StartTime: slot.StartTime,
            EndTime: slot.EndTime,
            AvailablePeople: [], // change this
            People: [],
        }))
        setTimeSlots(timeSlots) 
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} alignItems={'flex-start'}>
                <Grid item lg={10} md={9} sm={12}>
                    <FullCalendar
                        eventColor="#000000"
                        eventTextColor="#ffffff"
                        allDaySlot={false}
                        plugins={[timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        height="auto"
                        events={timeSlotsFC}
                        headerToolbar={{
                            left: 'title',
                            center: '',
                            right: 'today prev,next',
                        }}
                        initialDate={eventDate}
                        slotMinTime="09:00:00"
                        slotMaxTime="20:00:00"
                        locale="en-GB"
                        editable={true}
                        eventResize={handleSlotResize}
                        eventDrop={handleSlotDrag}
                        dateClick={handleDateClick}
                        eventContent={renderEventContent}
                    />
                </Grid>
                <Grid item sm={12} md={3} lg={2} container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Options</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="availablePeople"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <FormInputMultiFreeSolo
                                    name="availablePeople"
                                    control={control}
                                    label="Select Academics"
                                    options={peopleOptions.map((person) => ({
                                        value: person.id,
                                        label: person.name,
                                        image: person.image,
                                    }))}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item container justifyContent={'flex-end'}>
                        <Grid item>
                            <Button type="submit" variant={'contained'}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
