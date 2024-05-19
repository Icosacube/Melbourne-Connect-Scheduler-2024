import { Box, Button } from '@mui/material';
import React from 'react';
import EventsTable from './EventsTable';
import EventsWidgets from './EventsWidgets';

function Events() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  return (
    <>
      <Box className="  mb-4 flex flex-col">
        <Button className="bg-secondary text-white hover:bg-primary mb-3 self-end">
          {' '}
          + Add Event
        </Button>
        <EventsWidgets />
      </Box>
      <Box className="w-full bg-white shadow-md">
        <EventsTable />
      </Box>
    </>
  );
}

export default Events;
