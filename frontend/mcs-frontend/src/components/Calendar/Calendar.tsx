import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import React, { FC } from 'react';

interface CalendarProps {
  events: any[]; // Define the type of events array as per your application's event structure
}

export const Calendar: FC<CalendarProps> = ({ events }) => {
  return (
    <FullCalendar
      editable={true}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      height={550}
    />
  );
}

