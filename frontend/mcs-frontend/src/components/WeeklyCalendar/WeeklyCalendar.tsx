import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {MainEvent} from "../../types/frontendTypes";

interface WeeklyCalendarProps {
    event: MainEvent,
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ event }) => {
    console.log(event);
    const eventProp = {
        title: event.EventName,
        start: event.Date.toDate(),
        // allDay: true,
    };
    return (
        <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            height="auto"
            events={[eventProp]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek'
            }}
        />
    );
};

export default WeeklyCalendar;