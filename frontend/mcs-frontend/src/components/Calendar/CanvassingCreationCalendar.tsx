import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Grid, Button, Paper, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { CanvassingTemp } from '../../types/frontendTypes'
import { useForm, Controller } from 'react-hook-form'
import { FormInputMultiFreeSolo } from '../FormComponents'
import './index.css'

interface CanvassingCreationCalendarProps {
    MainEvent: string[]
}

interface Person {
    name: string
    email: string
    image?: string
}

const MixedAcademicOptions: Person[] = [
    {
        email: 'john.doe@example.com',
        name: 'John Doe',
        image: '/path/to/john_image.jpg',
    },
    {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        image: '/path/to/jane_image.jpg',
    },
    {
        email: 'michael.johnson@example.com',
        name: 'Michael Johnson',
        image: '/path/to/michael_image.jpg',
    },
]

export const CanvassingCreationCalendar: React.FC<
    CanvassingCreationCalendarProps
> = ({ MainEvent }) => {
    const [canvassingSlots, setCanvassingSlots] = useState<CanvassingTemp[]>([])
    const { control, handleSubmit, setValue } = useForm()
    const eventDate = '2024-09-01'

    useEffect(() => {
        setCanvassingSlots([])
    }, [])

    const handleSlotResize = (info: any) => {
        const { event } = info
        const updatedSlots = canvassingSlots.map((slot) => {
            if (slot.StartTime.isSame(event.start)) {
                return {
                    ...slot,
                    StartTime: dayjs(event.start),
                    EndTime: dayjs(event.end),
                }
            }
            return slot
        })
        setCanvassingSlots(updatedSlots)
    }

    const handleSlotDrag = (info: any) => {
        const { event } = info
        const updatedSlot = {
            StartTime: dayjs(event.start),
            EndTime: dayjs(event.end),
            MainEvent: MainEvent,
            MixedAcademic: [],
            AvailableAcademic: [],
        }

        const updatedSlots = canvassingSlots.map((slot) =>
            slot.StartTime.isSame(updatedSlot.StartTime) ? updatedSlot : slot
        )
        setCanvassingSlots(updatedSlots)
    }

    const handleDateClick = (info: any) => {
        const newCanvassingSlot: CanvassingTemp = {
            StartTime: dayjs(info.date),
            EndTime: dayjs(info.date).add(1, 'hour'),
            MainEvent: MainEvent,
            MixedAcademic: [],
            AvailableAcademic: [],
        }
        setCanvassingSlots([...canvassingSlots, newCanvassingSlot])
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

    const onSubmit = (data: any) => {
        const updatedCanvassingSlots = canvassingSlots.map((slot) => ({
            ...slot,
            MixedAcademic: data.MixedAcademic.map((person: any) => ({
                name: person.label,
                email: person.value,
            })),
        }))

        console.log(updatedCanvassingSlots)
        setCanvassingSlots(updatedCanvassingSlots)
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
                        events={canvassingSlots.map((slot) => ({
                            start: slot.StartTime.toDate(),
                            end: slot.EndTime.toDate(),
                        }))}
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
                            name="MixedAcademic"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <FormInputMultiFreeSolo
                                    name="MixedAcademic"
                                    control={control}
                                    label="Select Academics"
                                    options={MixedAcademicOptions.map(
                                        (person) => ({
                                            value: person.email,
                                            label: person.name,
                                            image: person.image,
                                        })
                                    )}
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
