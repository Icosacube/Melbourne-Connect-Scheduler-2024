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
      field: 'speakerName',
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
    {
      field: 'eventType',
      headerClassName: 'event-table',
      headerName: 'Event Type',
      flex: 1,
      width: 160
    },
    {
      field: 'cateringReference',
      headerClassName: 'event-table',
      headerName: 'Catering Reference',
      flex: 1,
      width: 130
    },
    {
      field: 'duration',
      headerClassName: 'event-table',
      headerName: 'Duration',
      flex: 1,
      width: 100
    }
  ];
  const rows = [
    {
      id: 2,
      eventName: 'Quantum Computing Workshop',
      eventType: 'Workshop',
      cateringReference: 'C124',
      venue: 'Room 204',
      speakerName: 'Dr. Carol White',
      status: 'Cancelled',
      duration: '1 day',
      date: new Date(2024, 5, 16)
    },
    {
      id: 3,
      eventName: 'Data Science Conference',
      eventType: 'Conference',
      cateringReference: 'C125',
      venue: 'Main Hall',
      speakerName: 'Dr. Eve Green',
      status: 'Ongoing',
      duration: '3 days',
      date: new Date(2024, 5, 17)
    },
    {
      id: 4,
      eventName: 'Cybersecurity Summit',
      eventType: 'Summit',
      cateringReference: 'C126',
      venue: 'Lecture Theatre 1',
      speakerName: 'Dr. Grace Red',
      status: 'Preparation',
      duration: '2 days',
      date: new Date(2024, 5, 18)
    },
    {
      id: 5,
      eventName: 'Machine Learning Bootcamp',
      eventType: 'Bootcamp',
      cateringReference: 'C127',
      venue: 'Conference Room B',
      speakerName: 'Dr. Ivan Orange',
      status: 'Implementation',
      duration: '5 days',
      date: new Date(2024, 5, 19)
    },
    {
      id: 6,
      eventName: 'Cloud Computing Workshop',
      eventType: 'Workshop',
      cateringReference: 'C128',
      venue: 'Auditorium A',
      speakerName: 'Dr. Alice Johnson',
      status: 'Completed',
      duration: '1 day',
      date: new Date(2024, 5, 20)
    },
    {
      id: 7,
      eventName: 'Blockchain Symposium',
      eventType: 'Symposium',
      cateringReference: 'C129',
      venue: 'Room 204',
      speakerName: 'Dr. Carol White',
      status: 'Cancelled',
      duration: '2 days',
      date: new Date(2024, 5, 21)
    },
    {
      id: 8,
      eventName: 'Software Engineering Conference',
      eventType: 'Conference',
      cateringReference: 'C130',
      venue: 'Main Hall',
      speakerName: 'Dr. Eve Green',
      status: 'Implementation',
      duration: '3 days',
      date: new Date(2024, 5, 22)
    },
    {
      id: 9,
      eventName: 'Full Stack Development Workshop',
      eventType: 'Workshop',
      cateringReference: 'C131',
      venue: 'Lecture Theatre 1',
      speakerName: 'Dr. Grace Red',
      status: 'Ongoing',
      duration: '1 day',
      date: new Date(2024, 5, 23)
    },
    {
      id: 10,
      eventName: 'DevOps Summit',
      eventType: 'Summit',
      cateringReference: 'C132',
      venue: 'Conference Room B',
      speakerName: 'Dr. Ivan Orange',
      status: 'Cancelled',
      duration: '2 days',
      date: new Date(2024, 5, 24)
    },
    {
      id: 11,
      eventName: 'AI and Machine Learning Symposium',
      eventType: 'Symposium',
      cateringReference: 'C123',
      venue: 'Auditorium A',
      speakerName: 'Dr. Alice Johnson',
      status: 'Completed',
      duration: '2 days',
      date: new Date(2024, 5, 15)
    }
  ];
  const navigate = useNavigate();
  data[0].speakerName = 'Dr. Alice Johnson';
  data[0].status = 'Completed';
  rows.unshift(data[0]);
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
