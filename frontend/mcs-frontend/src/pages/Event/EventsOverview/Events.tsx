import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, Button, Typography } from '@mui/material';
import React, { FC } from 'react';
import { EventsTable } from './EventsTable';
import EventsWidgets from './EventsWidgets';
import { useLoaderData } from 'react-router-dom';
import { CreateEventModal } from './CreateEventModal';
import { MainEvent } from '../../../types/frontendTypes';

export const Events: FC = () => {
  const { events, speakers } = useLoaderData() as {
    events: MainEvent[]
    speakers: any[];
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box className='  mb-4 flex flex-col'>
        <Box className=' flex flex-col'>
          <Button
            variant='contained'
            className=' flex space-x-2 bg-secondary hover:bg-accent hover:text-black mb-3 self-end h-12'
            onClick={handleOpen}
          >
            <AddCircleOutlineOutlined />
            <Typography>Create Event</Typography>
          </Button>

          <CreateEventModal open={open} handleClose={handleClose} />
        </Box>

        <EventsWidgets />
      </Box>
      <Box className='w-full bg-white shadow-md'>
        <EventsTable events={events} speakers={speakers} />
      </Box>
    </>
  );
}
