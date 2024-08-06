
        /*
        <Box className='grid gap-5 p-5 overflow-scroll max-h-[45rem]'>
          {Array.from(Array(1)).map((_, index) => (
            <NavLink to={`/trips/${index}`} key={index}>
              <Box className='flex justify-between bg-gray-300 rounded p-5 place-items-center'>
                <Box className='flex place-items-center space-x-4'>
                  <Avatar className='size-20' />
                  <Stack>
                    <Typography variant='h6'>John Stevens</Typography>
                    <Typography variant='h6'>Birthday Party</Typography>
                  </Stack>
                </Box>
                <Box>
                  <Typography variant='h6'>On-Going</Typography>
                  <Typography variant='h6'>05/07/2001</Typography>
                </Box>
              </Box>
            </NavLink>
          ))}
        </Box>
      */

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

