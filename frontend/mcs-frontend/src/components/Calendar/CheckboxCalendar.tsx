import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs, { Dayjs } from 'dayjs'
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

    // WIP change to dynamic data
    const eventDate = '2024-09-01'
    const temp: TimeSlot[] = [
        {
            id: dayjs('2024-09-01T10:00:00').valueOf().toString(),
            StartDate: dayjs('2024-09-01T10:00:00'),
            EndDate: dayjs('2024-09-01T11:00:00'),
            available: false,
        },
        {
            id: dayjs('2024-09-01T12:00:00').valueOf().toString(),
            StartDate: dayjs('2024-09-01T12:00:00'),
            EndDate: dayjs('2024-09-01T13:00:00'),
            available: false,
        },
        {
            id: dayjs('2024-09-02T14:00:00').valueOf().toString(),
            StartDate: dayjs('2024-09-02T14:00:00'),
            EndDate: dayjs('2024-09-02T15:00:00'),
            available: false,
        },
    ]

    // Limit the previous next navigation to valid timerange
    const minDate = temp[0].StartDate.startOf('day').toISOString()
    const maxDate = temp[temp.length - 1].EndDate.endOf('day').toISOString()

    useEffect(() => {
        setAllTimeSlots(temp)
    }, [])

    // Toggle availability on slot click
    const handleEventClick = (info: any) => {
        const { event } = info
        const updatedSlots = allTimeSlots.map((slot) => {
            if (slot.id === event.id) {
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
            <div
                style={{
                    padding: '2px',
                    textAlign: 'center',
                    fontFamily: 'Futura, sans-serif',
                    color: '#ffffff',
                }}
            >
                {eventInfo.timeText && <div>{eventInfo.timeText}</div>}
            </div>
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
            initialView="timeGridWeek"
            height="auto"
            events={timeSlotsFC}
            allDaySlot={false}
            headerToolbar={{
                left: '',
                center: 'title',
                right: 'prev,next',
            }}
            initialDate={eventDate}
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            locale="en-GB"
            editable={false}
            eventClick={handleEventClick} // Toggle availability
            eventContent={renderEventContent}
            validRange={{
                start: minDate,
                end: maxDate,
            }}
        />
    )
}
