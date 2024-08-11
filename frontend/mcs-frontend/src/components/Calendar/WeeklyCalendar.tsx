import React from "react";
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
  // const calculateEndTime = (start: Date, durationStr: string): Date => {
  //     const durationInSeconds = parseInt(durationStr, 10); // Convert string to number
  //     const durationInMinutes = durationInSeconds / 60; // Convert seconds to minutes
  //     const endTime = new Date(start);
  //     endTime.setMinutes(endTime.getMinutes() + durationInMinutes);
  //     return endTime;
  // };

  const mainEventProp = {
    title: event.EventName,
    start: event.Date.toDate(),
    // end: event.EndDate.toDate(),
  };

  const subEventsProp = subEvents.map((subevent) => ({
    title: subevent.EventName,
    start: subevent.StartDate.toDate(),
    end: subevent.EndDate.toDate(),
  }));

  const allEvents = [mainEventProp, ...subEventsProp];

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
    />
  );
};

export default WeeklyCalendar;
