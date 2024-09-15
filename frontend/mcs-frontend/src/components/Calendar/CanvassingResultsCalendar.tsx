import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Canvassing } from '../../types/frontendTypes'

interface CanvassingResultsCalendarProps {
    canvassings: Canvassing[]
    dateRange:{start:string, end:string}
    eventDate: string
    handleEventClick: (info: any) => void
    renderEventContent: (eventInfo: any) => React.ReactNode
    setSelectedSlot: (slot: Canvassing | null) => void
}

export const CanvassingResultsCalendar: React.FC<
    CanvassingResultsCalendarProps
> = ({
    canvassings,
    dateRange,
    eventDate,
    handleEventClick,
    renderEventContent,
    setSelectedSlot,
}) => {
    const timeSlotsFC = canvassings.map((slot) => ({
        id: slot.RecordID,
        start: slot.StartTime.toDate(),
        end: slot.EndTime.toDate(),
        backgroundColor:
            slot.AvailableAcademic.length > 0 ? '#FBCB18' : '#CCCCCC',
    }))

    return (
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
            
            titleFormat={{ year: 'numeric', month: 'short' }}
            dayHeaderFormat={{ weekday: 'short', day: 'numeric' }}
            initialDate={eventDate}
            slotMinTime="09:00:00"
            slotMaxTime="20:00:00"
            locale="en-GB"
            editable={false}
            eventContent={renderEventContent}
            validRange={dateRange}
            eventClick={handleEventClick}
            dateClick={() => setSelectedSlot(null)}
        />
    )
}
