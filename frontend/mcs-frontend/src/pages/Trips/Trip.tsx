
import { Box, Button, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { BackButton } from '../../components';
import TripsTab from './TripsTab';
import { Trip as TripType, Speaker } from '../../types/frontendTypes';
import { useLoaderData } from 'react-router-dom';

export const Trip: FC = () => {
  const { trip, speaker } = useLoaderData() as {
    trip: TripType;
    speaker: Speaker;
  };
  
  return (
    <Box className=' flex space-x-10'>
      <Box className='w-3/4 space-y-10'>
        <BackButton text='Back' />
        <Box>
          <Button variant='contained' className='w-full min-h-60'>
            <Typography>Guest</Typography>
          </Button>
        </Box>
        <TripsTab />
      </Box>
      <Box className='w-1/4 space-y-4'>
        <Typography variant='h6'>Main Event</Typography>
        <Button variant='contained' className='w-full min-h-60' />
      </Box>
    </Box>
  );
};
