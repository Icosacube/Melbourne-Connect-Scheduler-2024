import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import React from 'react';

function Calendar({ events }) {
  // const events = [
  //   {
  //     title: 'The Rise of AI',
  //     start: '2024-05-16',
  //     end: '2024-05-18',
  //     backgroundColor: '#FAAB19'
  //   },
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

export default Calendar;
