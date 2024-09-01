import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MainEvent } from "../../types/frontendTypes";
import { SubEvent } from "../../types/frontendTypes";

interface WeeklyCalendarProps {
  event: MainEvent;
  subEvents: SubEvent[];
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  event,
  subEvents,
                                                       }) => {
  const [allEvents, setAllEvents] = useState<any[]>([]);

  const mainEventProp = {
    id: `main-${event.RecordID}`, // identifier of main events  
    title: event.EventName,
    start: event.Date.toDate(),
  };

  //changed 'subevent' to 'subEvent'. Functionality untouched
  const subEventsProp = subEvents.map((subEvent) => ({
    id: `sub-${subEvent.RecordID}`, // identifier of sub-events 
    title: subEvent.EventName,
    start: subEvent.StartDate.toDate(),
    end: subEvent.EndDate.toDate(),
    extendedProps: subEvent,
  }));

  useEffect(() => {
    setAllEvents([mainEventProp, ...subEventsProp]);
  }, [event, subEvents]);

  const handleEventClick = (clickInfo: any) => {
    const eventId = clickInfo.event.id;
    if (eventId.startsWith('sub-')) {
      const subEventId = eventId.replace('sub-', '');
      // Handle subevent click (update, delete, etc.)
      console.log('Subevent clicked:', subEventId);
      // Add your logic here to open modal or edit subevent
    } else {
      console.log('Main event clicked, no action allowed');
    }
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      height="auto"
      events={allEvents}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      }}
      slotMinTime="08:00:00"
      slotMaxTime="20:00:00"
      locale="en-GB"
      eventClick={handleEventClick}
    />
  );
};

export default WeeklyCalendar;
