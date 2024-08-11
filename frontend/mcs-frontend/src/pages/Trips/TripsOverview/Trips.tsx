import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { TripTable } from './TripsTable';
import { useLoaderData } from 'react-router-dom';
import { CreateTripModal } from '../CreateTripModal'; // Assuming CreateTripModal is in the same directory
import { MainEvent, Trip, Speaker } from '../../../types/frontendTypes';

export function Trips() {
  const { events, speakers, trips } = useLoaderData() as {
    events: MainEvent[];
    speakers: Speaker[];
    trips: Trip[];
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box className='mb-4 flex flex-col'>
        <Box className='flex flex-col'>
          <Button
            variant='contained'
            className='flex space-x-2 bg-secondary hover:bg-accent hover:text-black mb-3 self-end h-12'
            onClick={handleOpen}
          >
            <AddCircleOutlineOutlined />
            <Typography>Create Trip</Typography>
          </Button>

          <CreateTripModal open={open} handleClose={handleClose} events={events} speakers={speakers}/>
        </Box>

      </Box>
      <Box className='w-full bg-white shadow-md'>
        <TripTable events={events} speakers={speakers} trips={trips} />
      </Box>
    </>
  );
}

