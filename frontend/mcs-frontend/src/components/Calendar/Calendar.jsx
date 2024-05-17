import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import React from 'react';

function Calendar() {
  const events = [
    {
      title: 'The Rise of AI',
      start: '2024-05-16',
      end: '2024-05-18',
      backgroundColor: '#FAAB19'
    },
    {
      title: 'Is ChatGPT Evil',
      start: '2024-05-05',
      end: '2024-05-08',
      backgroundColor: '#734023'
    },
    {
      title: 'Is C++ still Relavent',
      start: '2024-05-01',
      end: '2024-05-03',
      backgroundColor: 'tomato'
    },
    {
      title: 'Will AI take over the world',
      start: '2024-05-10',
      end: '2024-05-12',
      backgroundColor: 'green'
    }
  ];
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      height={550}
    />
  );
}

export default Calendar;
