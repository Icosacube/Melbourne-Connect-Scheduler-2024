import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MainEvent } from "../../types/frontendTypes";
import { SubEvent } from "../../types/frontendTypes";

interface WeeklyCalendarProps {
  event: MainEvent,
  subEvents: SubEvent[],
  onEventClick: (subEvent: SubEvent) => void
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  event,
  subEvents,
  onEventClick,
  }) => {
  const [allEvents, setAllEvents] = useState<any[]>([]);

  const mainEventProp = {
    id: `main-${event.RecordID}`, // identifier of main events  
    title: event.EventName,
    start: event.Date.toDate(),
    backgroundColor: '#90A4AE', 
    borderColor: '#90A4AE', 
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

  const handleEventClick = (info: any) => {
    if (info.event.id.startsWith("sub-")) { // Check if the event is a sub-event
      const subEvent = info.event.extendedProps as SubEvent;
      onEventClick(subEvent); 
    } else {

    }
  }

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
