import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {MainEvent} from "../../types/frontendTypes";
import {SubEvent} from "../../types/frontendTypes";

interface WeeklyCalendarProps {
    event: MainEvent,
    subEvents: SubEvent[],
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ event, subEvents}) => {
    const mainEventProp = {
        title: event.EventName,
        start: event.Date.toDate(),
        // allDay: true,
    };
    const subEventsProp= subEvents.map(subevent => ({
        title: subevent.EventName,
        start: subevent.Date.toDate(),
    }));

    const allEvents = [mainEventProp, ...subEventsProp];

    return (
        <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            height="auto"
            events={allEvents}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
            }}
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            locale="en-GB"
        />
    );
};

export default WeeklyCalendar;