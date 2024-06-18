import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, {FC} from 'react';
import { useNavigate } from 'react-router-dom';
import { getStatus } from './function';
import { Event } from '../../types/types';


interface EventsTableProps {
  events: Event[];
}

export const EventsTable:FC<EventsTableProps> = ({ events })=> {
  function StatusInputValue(props: { item: any; applyValue: any; focusElementRef: any; }) {
    const { item, applyValue, focusElementRef } = props;

    const handleFilterChange = (event: { target: { value: any; }; }) => {
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
      getApplyFilterFn: (filterItem: { value: any; field: any; }) => {
        if (!filterItem.value || !filterItem.field) {
          return null;
        }
        return (value: any) => {
          return value === filterItem.value;
        };
      },
      InputComponent: StatusInputValue,
      InputComponentProps: { type: 'string' },
      getValueAsString: (value: any) => value
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
      renderCell({ row }: { row: Event }) {
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
  ];

  const navigate = useNavigate();

  const handleRowClick = (params: { row: { id: any; }; }) => {
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
