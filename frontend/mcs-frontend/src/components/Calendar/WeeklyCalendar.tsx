import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { MainEvent, SubEvent } from '../../types/frontendTypes'
import dayjs from 'dayjs'

interface WeeklyCalendarProps {
    event: MainEvent
    subEvents: SubEvent[]
    onEventClick: (subEvent: SubEvent) => void
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
    event,
    subEvents,
    onEventClick,
}) => {
    const [allEvents, setAllEvents] = useState<any[]>([])

    const mainEventProp = {
        id: `main-${event.RecordID}`, // identifier of main events
        title: event.EventName,
        start: event.StartDate.toDate(),
        backgroundColor: '#90A4AE',
        borderColor: '#90A4AE',
    }

    const subEventsProp = subEvents.map((subEvent) => ({
        id: `sub-${subEvent.RecordID}`, // identifier of sub-events
        title: subEvent.EventName,
        start: subEvent.StartDate.toDate(),
        end: subEvent.EndDate.toDate(),
        extendedProps: subEvent,
    }))

    useEffect(() => {
        setAllEvents([mainEventProp, ...subEventsProp])
    }, [event, subEvents])

    const handleEventClick = (info: any) => {
        if (info.event.id.startsWith('sub-')) {
            const subEvent = info.event.extendedProps as SubEvent
            onEventClick(subEvent) // Trigger the onEventClick with the selected subEvent
        }
    }

    return (
        <FullCalendar
            eventColor="#FBCB18"
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            height="auto"
            allDaySlot={false}
            events={allEvents}
            initialDate={dayjs(event.StartDate).format('YYYY-MM-DD')}
            headerToolbar={{
                left: 'title',
                center: '',
                right: 'today prev,next timeGridWeek,timeGridDay',
            }}
            titleFormat={{ year: 'numeric', month: 'short' }}
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            locale="en-GB"
            eventClick={handleEventClick}
        />
    )
}

export default WeeklyCalendar
