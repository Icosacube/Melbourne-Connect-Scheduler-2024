import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Grid, Button } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { TimeSlot } from '../../types/frontendTypes'
import { CanvassingCreationModal } from '../../pages/Canvassing/CanvassingCreationModal'
import './index.css'

// Temporary Type
interface TimeSlotTemp {
    id: string
    StartTime: Dayjs
    EndTime: Dayjs
}

interface CanvassingCreationCalendarProps {
    MainEvent: string
    setTimeSlots: (value: TimeSlot[]) => void
}

// creation, accept event id
export const CanvassingCreationCalendar: React.FC<
    CanvassingCreationCalendarProps
> = ({ MainEvent, setTimeSlots }) => {
    const [allTimeSlotTemps, setAllTimeSlotTemps] = useState<TimeSlotTemp[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [noPeopleTimeSlots, setNoPeopleTimeSlots] = useState<TimeSlot[]>([])

    const eventDate = '2024-09-01'

    // initial empty Timeslot array
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

    // create a timeslot by clicking on the calendar
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

    // Convert time slots to the FullCalendar format
    const timeSlotsFC = allTimeSlotTemps.map((slot) => ({
        id: slot.id,
        start: slot.StartTime.toDate(),
        end: slot.EndTime.toDate(),
    }))

    const handleSubmit = () => {
        const timeSlots: TimeSlot[] = allTimeSlotTemps.map((slot) => ({
            MainEvent: MainEvent,
            StartTime: slot.StartTime,
            EndTime: slot.EndTime,
            AvailablePeople: [],
            People: [],
        }))
        setNoPeopleTimeSlots(timeSlots)
        setOpen(true)
    }

    return (
        <Grid container>
            <Grid item container>
                <Grid item>
                    <Button variant={'contained'} onClick={handleSubmit}>
                        Save
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
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
                    editable={true} // dragging and resizing
                    eventResize={handleSlotResize}
                    eventDrop={handleSlotDrag}
                    dateClick={handleDateClick}
                    eventContent={renderEventContent}
                />
            </Grid>
            <CanvassingCreationModal
                open={open}
                handleClose={() => {
                    setOpen(false)
                }}
                timeSlots={noPeopleTimeSlots}
                setTimeSlots={setTimeSlots}
            />
        </Grid>
    )
}
