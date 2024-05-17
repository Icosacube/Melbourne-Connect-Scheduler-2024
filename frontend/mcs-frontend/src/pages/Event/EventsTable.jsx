import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { getStatus } from './function';

const columns = [
  { field: 'id', headerName: 'id', headerClassName: 'event-table', flex: 1, width: 50 },
  {
    field: 'eventName',
    headerName: 'Event Name',
    headerClassName: 'event-table',
    flex: 1,
    width: 280
  },
  {
    field: 'date',
    headerName: 'Date',
    headerClassName: 'event-table',
    type: 'date',
    flex: 1,
    flex: 1,
    width: 130
  },
  {
    field: 'venue',
    headerClassName: 'event-table',
    headerName: 'Venue',
    flex: 1,
    width: 120
  },
  {
    field: 'keyNoteSpeaker',
    headerClassName: 'event-table',
    headerName: 'Key Note Speaker',
    flex: 1,
    width: 150
  },
  {
    field: 'status',
    headerClassName: 'event-table',
    headerName: 'Status',
    flex: 1,
    width: 150,
    renderCell({ row }) {
      return getStatus(row.status);
    }
  },
  {
    field: 'organizer',
    headerClassName: 'event-table',
    headerName: 'Organizer',
    flex: 1,
    width: 160
  },
  {
    field: 'caterer',
    headerClassName: 'event-table',
    headerName: 'Caterer',
    flex: 1,
    width: 130
  },
  {
    field: 'attendees',
    headerClassName: 'event-table',
    headerName: 'Attendees',
    flex: 1,
    width: 100
  }
];
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
    caterer: 'Whole Foods',
    attendees: 100,
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
    status: 'Cancelled',
    caterer: 'Chipotle',
    attendees: 50,
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
    status: 'Ongoing',
    caterer: 'McDonalds',
    attendees: 200,
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
    status: 'Preparation',
    caterer: 'KFC',
    attendees: 150,
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
    status: 'Implementation',
    caterer: 'Subway',
    attendees: 75,
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
    status: 'Completed',
    caterer: 'Starbucks',
    attendees: 80,
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
    status: 'Cancelled',
    caterer: 'Taco Bell',
    attendees: 90,
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
    status: 'Implementation',
    caterer: 'Wendys',
    attendees: 120,
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
    status: 'Ongoing',
    caterer: 'Pizza Hut',
    attendees: 70,
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
    status: 'Cancelled',
    caterer: 'Popeyes',
    attendees: 110,
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
      sx={{
        '& .event-table': {
          backgroundColor: '#FBE418',
          color: 'black'
        },
        '.MuiDataGrid-columnHeaderTitleContainer': {
          backgroundColor: '#FBE418'
        }
      }}
    />
  );
}
