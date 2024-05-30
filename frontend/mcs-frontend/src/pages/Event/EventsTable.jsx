import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { getStatus } from './function';

export default function EventsTable({ data }) {
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
    { field: 'id', headerName: 'ID', headerClassName: 'event-table', flex: 1, width: 50 },
    {
      field: 'name',
      headerName: 'Event Name',
      headerClassName: 'event-table',
      flex: 1,
      width: 280
    },
    // {
    //   field: 'date',
    //   headerName: 'Date',
    //   headerClassName: 'event-table',
    //   type: 'date',
    //   flex: 1,
    //   width: 130
    // },
    {
      field: 'venue',
      headerClassName: 'event-table',
      headerName: 'Venue',
      flex: 1,
      width: 120
    },
    {
      field: 'speakers',
      headerClassName: 'event-table',
      headerName: 'Speakers',
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
    // {
    //   field: 'eventType',
    //   headerClassName: 'event-table',
    //   headerName: 'Event Type',
    //   flex: 1,
    //   width: 160
    // },
    // {
    //   field: 'catering',
    //   headerClassName: 'event-table',
    //   headerName: 'Catering Reference',
    //   flex: 1,
    //   width: 130
    // },
    {
      field: 'date',
      headerClassName: 'event-table',
      headerName: 'Date',
      flex: 1,
      width: 100
    }
  ];
  const rows = [
    // {
    //   id: 1,
    //   name: 'AI and Machine Learning Symposium',
    //   eventType: 'Symposium',
    //   catering_BookingReference: 'C123',
    //   venue: 'Auditorium A',
    //   speakers: 'Alice Johnson',
    //   organizer: 'Bob Brown',
    //   status: 'Completed',
    //   caterer: 'Whole Foods',
    //   attendees: 100,
    //   date: new Date(2024, 5, 15)
    // },
    // {
    //   id: 2,
    //   name: 'Quantum Computing Workshop',
    //   eventType: 'Workshop',
    //   catering_BookingReference: 'C124',
    //   venue: 'Room 204',
    //   speakers: 'Carol White',
    //   organizer: 'Dave Black',
    //   status: 'Cancelled',
    //   caterer: 'Chipotle',
    //   attendees: 50,
    //   date: new Date(2024, 5, 16)
    // },
    {
      id: 31,
      name: 'Data Science Conference',
      eventType: 'Conference',
      catering_BookingReference: 'C125',
      venue: 'Main Hall',
      speakers: 'Eve Green',
      organizer: 'Frank Blue',
      status: 'Ongoing',
      caterer: 'McDonalds',
      attendees: 200,
      date: new Date(2024, 5, 17)
    },
    {
      id: 41,
      name: 'Cybersecurity Summit',
      eventType: 'Summit',
      catering_BookingReference: 'C126',
      venue: 'Lecture Theatre 1',
      speakers: 'Grace Red',
      organizer: 'Heidi Yellow',
      status: 'Preparation',
      caterer: 'KFC',
      attendees: 150,
      date: new Date(2024, 5, 18)
    },
    {
      id: 51,
      name: 'Machine Learning Bootcamp',
      eventType: 'Bootcamp',
      catering_BookingReference: 'C127',
      venue: 'Conference Room B',
      speakers: 'Ivan Orange',
      organizer: 'Judy Purple',
      status: 'Implementation',
      caterer: 'Subway',
      attendees: 75,
      date: new Date(2024, 5, 19)
    },
    {
      id: 61,
      name: 'Cloud Computing Workshop',
      eventType: 'Workshop',
      catering_BookingReference: 'C128',
      venue: 'Auditorium A',
      speakers: 'Alice Johnson',
      organizer: 'Bob Brown',
      status: 'Completed',
      caterer: 'Starbucks',
      attendees: 80,
      date: new Date(2024, 5, 20)
    },
    {
      id: 71,
      name: 'Blockchain Symposium',
      eventType: 'Symposium',
      catering_BookingReference: 'C129',
      venue: 'Room 204',
      speakers: 'Carol White',
      organizer: 'Dave Black',
      status: 'Cancelled',
      caterer: 'Taco Bell',
      attendees: 90,
      date: new Date(2024, 5, 21)
    },
    {
      id: 81,
      name: 'Software Engineering Conference',
      eventType: 'Conference',
      catering_BookingReference: 'C130',
      venue: 'Main Hall',
      speakers: 'Eve Green',
      organizer: 'Frank Blue',
      status: 'Implementation',
      caterer: 'Wendys',
      attendees: 120,
      date: new Date(2024, 5, 22)
    },
    {
      id: 91,
      name: 'Full Stack Development Workshop',
      eventType: 'Workshop',
      catering_BookingReference: 'C131',
      venue: 'Lecture Theatre 1',
      speakers: 'Grace Red',
      organizer: 'Heidi Yellow',
      status: 'Ongoing',
      caterer: 'Pizza Hut',
      attendees: 70,
      date: new Date(2024, 5, 23)
    },
    {
      id: 101,
      name: 'DevOps Summit',
      eventType: 'Summit',
      catering_BookingReference: 'C132',
      venue: 'Conference Room B',
      speakers: 'Ivan Orange',
      organizer: 'Judy Purple',
      status: 'Cancelled',
      caterer: 'Popeyes',
      attendees: 110,
      date: new Date(2024, 5, 24)
    }
  ];

  const navigate = useNavigate();

  for (let index = 0; index < data.length; index++) {
    data[index].status = 'Preparation';
    console.log(data[index]);
    rows.unshift(data[index]);
  }

  const handleRowClick = (params) => {
    navigate(`/events/${params.row.id}`);
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 }
        },
        columns: {
          columnVisibilityModel: {
            // Hide columns status and traderName, the other columns will remain visible
            id: false
          }
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
