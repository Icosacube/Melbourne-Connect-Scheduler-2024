import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { getStatus } from './function';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function StatusInputValue(props) {
  const { item, applyValue, focusElementRef } = props;

  const handleFilterChange = (event) => {
    applyValue({ ...item, value: event.target.value });
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        pl: '20px'
      }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="status-filter-label">Status</InputLabel>
        <Select
          labelId="status-filter-label"
          value={item.value || ''}
          onChange={handleFilterChange}
          ref={focusElementRef}>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
          <MenuItem value="Ongoing">Ongoing</MenuItem>
          <MenuItem value="Preparation">Preparation</MenuItem>
          <MenuItem value="Implementation">Implementation</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

const statusOnlyOperators = [
  {
    label: 'Is',
    value: 'is',
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value || !filterItem.field) {
        return null;
      }
      return (value) => {
        return value === filterItem.value;
      };
    },
    InputComponent: StatusInputValue,
    InputComponentProps: { type: 'string' },
    getValueAsString: (value) => value
  }
];

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
    filterOperators: statusOnlyOperators,
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
  const navigate = useNavigate();
  const handleRowClick = (params) => {
    console.log(params.row.id);
    navigate(`/events/${params.row.id}`);
  };
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
      // checkboxSelection
      sx={{
        '& .event-table': {
          backgroundColor: '#FBE418',
          color: 'black'
        },
        '.MuiDataGrid-columnHeaderTitleContainer': {
          backgroundColor: '#FBE418'
        }
      }}
      onRowClick={handleRowClick}
    />
  );
}

// import * as React from 'react';
// import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import { DataGrid, GridToolbarFilterButton } from '@mui/x-data-grid';

// // Custom filter component for the status column
// function StatusInputValue(props) {
//   const { item, applyValue, focusElementRef } = props;

//   const handleFilterChange = (event) => {
//     applyValue({ ...item, value: event.target.value });
//   };

//   return (
//     <Box
//       sx={{
//         display: 'inline-flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: 48,
//         pl: '20px'
//       }}>
//       <FormControl variant="standard">
//         <InputLabel id="status-filter-label">Status</InputLabel>
//         <Select
//           labelId="status-filter-label"
//           value={item.value || ''}
//           onChange={handleFilterChange}
//           ref={focusElementRef}>
//           <MenuItem value="Completed">Completed</MenuItem>
//           <MenuItem value="Cancelled">Cancelled</MenuItem>
//           <MenuItem value="Pending">Pending</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

// const statusOnlyOperators = [
//   {
//     label: 'Is',
//     value: 'is',
//     getApplyFilterFn: (filterItem) => {
//       if (!filterItem.value || !filterItem.field) {
//         return null;
//       }
//       return (value) => {
//         return value === filterItem.value;
//       };
//     },
//     InputComponent: StatusInputValue,
//     InputComponentProps: { type: 'string' },
//     getValueAsString: (value) => value
//   }
// ];

// const columns = [
//   { field: 'title', headerName: 'Title', width: 200 },
//   { field: 'start', headerName: 'Start Date', width: 150 },
//   { field: 'end', headerName: 'End Date', width: 150 },
//   { field: 'time', headerName: 'Time', width: 100 },
//   { field: 'speakerFirstName', headerName: 'Speaker First Name', width: 150 },
//   { field: 'speakerLastName', headerName: 'Speaker Last Name', width: 150 },
//   { field: 'venue', headerName: 'Venue', width: 200 },
//   {
//     field: 'status',
//     headerName: 'Status',
//     width: 150,
//     filterOperators: statusOnlyOperators
//   }
// ];

// const rows = [
//   {
//     id: 1,
//     title: 'The Rise of AI',
//     start: '2024-04-01',
//     end: '2024-04-03',
//     time: '10:00 AM',
//     speakerFirstName: 'Alice',
//     speakerLastName: 'Smith',
//     venue: 'Hall A',
//     status: 'Completed'
//   },
//   {
//     id: 2,
//     title: 'Is ChatGPT Evil',
//     start: '2024-04-05',
//     end: '2024-04-07',
//     time: '2:00 PM',
//     speakerFirstName: 'Bob',
//     speakerLastName: 'Johnson',
//     venue: 'Hall B',
//     status: 'Pending'
//   },
//   {
//     id: 3,
//     title: 'The Future of Work',
//     start: '2024-04-10',
//     end: '2024-04-12',
//     time: '1:00 PM',
//     speakerFirstName: 'Charlie',
//     speakerLastName: 'Brown',
//     venue: 'Conference Room',
//     status: 'Cancelled'
//   },
//   {
//     id: 4,
//     title: 'Is C++ Still Relevant?',
//     start: '2024-05-01',
//     end: '2024-05-03',
//     time: '9:00 AM',
//     speakerFirstName: 'David',
//     speakerLastName: 'Williams',
//     venue: 'Hall C',
//     status: 'Completed'
//   },
//   {
//     id: 5,
//     title: 'Will AI Take Over the World?',
//     start: '2024-05-10',
//     end: '2024-05-12',
//     time: '11:00 AM',
//     speakerFirstName: 'Emma',
//     speakerLastName: 'Davis',
//     venue: 'Main Auditorium',
//     status: 'Pending'
//   },
//   {
//     id: 6,
//     title: 'Cybersecurity in 2024',
//     start: '2024-05-20',
//     end: '2024-05-22',
//     time: '3:00 PM',
//     speakerFirstName: 'Frank',
//     speakerLastName: 'Miller',
//     venue: 'Room 101',
//     status: 'Cancelled'
//   },
//   {
//     id: 7,
//     title: 'Blockchain Technology',
//     start: '2024-06-02',
//     end: '2024-06-04',
//     time: '4:00 PM',
//     speakerFirstName: 'Grace',
//     speakerLastName: 'Wilson',
//     venue: 'Hall D',
//     status: 'Completed'
//   },
//   {
//     id: 8,
//     title: 'Quantum Computing',
//     start: '2024-06-10',
//     end: '2024-06-12',
//     time: '12:00 PM',
//     speakerFirstName: 'Henry',
//     speakerLastName: 'Taylor',
//     venue: 'Conference Room',
//     status: 'Pending'
//   },
//   {
//     id: 9,
//     title: 'Big Data Analytics',
//     start: '2024-06-15',
//     end: '2024-06-17',
//     time: '10:00 AM',
//     speakerFirstName: 'Ivy',
//     speakerLastName: 'Anderson',
//     venue: 'Hall E',
//     status: 'Cancelled'
//   },
//   {
//     id: 10,
//     title: 'Machine Learning Advances',
//     start: '2024-06-20',
//     end: '2024-06-22',
//     time: '9:00 AM',
//     speakerFirstName: 'Jack',
//     speakerLastName: 'Thomas',
//     venue: 'Room 202',
//     status: 'Completed'
//   }
// ];

// function Toolbar() {
//   return (
//     <div>
//       <GridToolbarFilterButton />
//     </div>
//   );
// }

// function CustomStatusOperator() {
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         slots={{
//           toolbar: Toolbar
//         }}
//         initialState={{
//           filter: {
//             filterModel: {
//               items: [
//                 {
//                   id: 1,
//                   field: 'status',
//                   value: 'Completed',
//                   operator: 'is'
//                 }
//               ]
//             }
//           }
//         }}
//       />
//     </div>
//   );
// }

// export default CustomStatusOperator;
