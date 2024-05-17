import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Chip, Menu, MenuItem } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'id', width: 50 },
  { field: 'eventName', headerName: 'Event Name', width: 280 },
  { field: 'date', headerName: 'Date', type: 'date', width: 130 },
  {
    field: 'venue',
    headerName: 'Venue',
    width: 120
  },
  {
    field: 'keyNoteSpeaker',
    headerName: 'Key Note Speaker',
    width: 150
  },
  {
    field: 'status',
    align: 'center',
    headerName: 'Status',
    width: 120,
    renderCell({ row }) {
      return <Chip label={row.status} color="success" />;
    }
  },
  {
    field: 'organizer',
    headerName: 'Organizer',
    width: 160
  }
];
const status = ['completed', 'cancelled', 'ongoing', 'preparation', 'implementation'];
const rows = [
  {
    id: 1,
    eventName: 'AI and Machine Learning Symposium',
    eventType: 'Symposium',
    catering_BookingReference: 'C123',
    venue: 'Auditorium A',
    keyNoteSpeaker: 'Dr. Alice Johnson',
    organizer: 'Dr. Bob Brown',
    status: 'Completed',
    date: new Date(2024, 5, 15)
  },
  {
    id: 2,
    eventName: 'Quantum Computing Workshop',
    eventType: 'Workshop',
    catering_BookingReference: 'C124',
    venue: 'Room 204',
    keyNoteSpeaker: 'Dr. Carol White',
    organizer: 'Dr. Dave Black',
    date: new Date(2024, 5, 16)
  },
  {
    id: 3,
    eventName: 'Data Science Conference',
    eventType: 'Conference',
    catering_BookingReference: 'C125',
    venue: 'Main Hall',
    keyNoteSpeaker: 'Dr. Eve Green',
    organizer: 'Dr. Frank Blue',
    date: new Date(2024, 5, 17)
  },
  {
    id: 4,
    eventName: 'Cybersecurity Summit',
    eventType: 'Summit',
    catering_BookingReference: 'C126',
    venue: 'Lecture Theatre 1',
    keyNoteSpeaker: 'Dr. Grace Red',
    organizer: 'Dr. Heidi Yellow',
    date: new Date(2024, 5, 18)
  },
  {
    id: 5,
    eventName: 'Machine Learning Bootcamp',
    eventType: 'Bootcamp',
    catering_BookingReference: 'C127',
    venue: 'Conference Room B',
    keyNoteSpeaker: 'Dr. Ivan Orange',
    organizer: 'Dr. Judy Purple',
    date: new Date(2024, 5, 19)
  },
  {
    id: 6,
    eventName: 'Cloud Computing Workshop',
    eventType: 'Workshop',
    catering_BookingReference: 'C128',
    venue: 'Auditorium A',
    keyNoteSpeaker: 'Dr. Alice Johnson',
    organizer: 'Dr. Bob Brown',
    date: new Date(2024, 5, 20)
  },
  {
    id: 7,
    eventName: 'Blockchain Symposium',
    eventType: 'Symposium',
    catering_BookingReference: 'C129',
    venue: 'Room 204',
    keyNoteSpeaker: 'Dr. Carol White',
    organizer: 'Dr. Dave Black',
    date: new Date(2024, 5, 21)
  },
  {
    id: 8,
    eventName: 'Software Engineering Conference',
    eventType: 'Conference',
    catering_BookingReference: 'C130',
    venue: 'Main Hall',
    keyNoteSpeaker: 'Dr. Eve Green',
    organizer: 'Dr. Frank Blue',
    date: new Date(2024, 5, 22)
  },
  {
    id: 9,
    eventName: 'Full Stack Development Workshop',
    eventType: 'Workshop',
    catering_BookingReference: 'C131',
    venue: 'Lecture Theatre 1',
    keyNoteSpeaker: 'Dr. Grace Red',
    organizer: 'Dr. Heidi Yellow',
    date: new Date(2024, 5, 23)
  },
  {
    id: 10,
    eventName: 'DevOps Summit',
    eventType: 'Summit',
    catering_BookingReference: 'C132',
    venue: 'Conference Room B',
    keyNoteSpeaker: 'Dr. Ivan Orange',
    organizer: 'Dr. Judy Purple',
    date: new Date(2024, 5, 24)
  }
];
export default function EventsTable() {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 }
        }
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
}
