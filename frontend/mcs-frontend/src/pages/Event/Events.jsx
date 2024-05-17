import EditCalendar from '@mui/icons-material/EditCalendar';
import { Box } from '@mui/material';
import React from 'react';
import { BackButton } from '../../components';
import EventsTable from './EventsTable';

function Events() {
  return (
    <Box className="w-full bg-white shadow-md">
      <EventsTable />
    </Box>
  );
}

export default Events;
