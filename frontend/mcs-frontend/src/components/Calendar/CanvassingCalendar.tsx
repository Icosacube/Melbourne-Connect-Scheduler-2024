import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs, { Dayjs } from 'dayjs'
import './index.css'

// Temporary Type
interface TimeSlot {
    id: string
    StartDate: Dayjs
    EndDate: Dayjs
}

export const CanvassingCalendar: React.FC = () => {
    const [allTimeSlots, setAllTimeSlots] = useState<TimeSlot[]>([])

    // WIP change to dynamic
    const eventDate = '2024-09-01'
    const temp: TimeSlot = {
        id: dayjs('2024-09-01T10:00:00').valueOf().toString(),
        StartDate: dayjs('2024-09-01T10:00:00'),
        EndDate: dayjs('2024-09-01T12:00:00'),
    }

    useEffect(() => {
        setAllTimeSlots([temp])
    }, [])

    const handleSlotResize = (info: any) => {
        const { event } = info
        const updatedSlots = allTimeSlots.map((slot) => {
            if (slot.id === event.id) {
                return {
                    ...slot,
                    StartDate: dayjs(event.start),
                    EndDate: dayjs(event.end),
                }
            }
            return slot
        })
        setAllTimeSlots(updatedSlots)
    }

    const handleSlotDrag = (info: any) => {
        const { event } = info
        const updatedSlot: TimeSlot = {
            id: event.id,
            StartDate: dayjs(event.start),
            EndDate: dayjs(event.end),
        }

        const updatedSlots = allTimeSlots.map((slot) => {
            if (slot.id === updatedSlot.id) {
                return updatedSlot
            }
            return slot
        })
        setAllTimeSlots(updatedSlots)
    }

    // create a timeslot by clicking on the calendar
    const handleDateClick = (info: any) => {
        const newTimeSlot: TimeSlot = {
            id: dayjs(info.date).valueOf().toString(),
            StartDate: dayjs(info.date),
            EndDate: dayjs(info.date).add(1, 'hour'),
        }
        setAllTimeSlots([...allTimeSlots, newTimeSlot])
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
    const timeSlotsFC = allTimeSlots.map((slot) => ({
        id: slot.id,
        start: slot.StartDate.toDate(),
        end: slot.EndDate.toDate(),
    }))

    return (
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
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            locale="en-GB"
            editable={true} // dragging and resizing
            eventResize={handleSlotResize}
            eventDrop={handleSlotDrag}
            dateClick={handleDateClick}
            eventContent={renderEventContent}
        />
    )
}

export default CanvassingCalendar
