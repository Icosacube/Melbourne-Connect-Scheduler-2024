import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import {EventsTable} from './EventsTable';
import EventsWidgets from './EventsWidgets';
import { useLoaderData } from 'react-router-dom';
import {CreateEventModal} from './CreateEventModal';

function Events() {
  const events = useLoaderData();
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
        {/* <Button className="bg-secondary text-white hover:bg-primary mb-3 self-end">
          {' '}
          + Add Event
        </Button> */}
        <Box className=" flex flex-col">
          <Button
            variant="contained"
            className=" flex space-x-2 bg-secondary hover:bg-accent hover:text-black mb-3 self-end h-12"
            onClick={handleOpen}>
            <AddCircleOutlineOutlined />
            <Typography>Create Event</Typography>
          </Button>

          <CreateEventModal open={open} handleClose={handleClose} />
        </Box>

        <EventsWidgets />
      </Box>
      <Box className="w-full bg-white shadow-md">
        <EventsTable events={events} />
      </Box>
    </>
  );
}

export default Events;
