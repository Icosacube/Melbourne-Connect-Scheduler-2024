
import { Box, Button, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { BackButton } from '../../components';
import TripsTab from './TripsTab';
import { Trip as TripType, Speaker, MainEvent } from '../../types/frontendTypes';
import { useLoaderData } from 'react-router-dom';
import { defaultMainEvent, getMainEventById } from '../../scripts/event/function';
import { EventCard } from '../../components/EventCard/EventCard';

export const Trip: FC = () => {
  const { trip, speaker } = useLoaderData() as {
    trip: TripType;
    speaker: Speaker;
  };
  const [event, setEvent] = useState<MainEvent>(defaultMainEvent);
  
  useEffect(() => {
    getMainEventById(trip.MainEvent[0]).then((event)=>{
      setEvent(event);
    })
  }, []);
  
  return (
    <Box className='flex space-x-10'>
      <Box className='w-3/4 space-y-6'>
        <BackButton text='Back' />
        <Box>
          <Button variant='contained' className='w-full min-h-60'>
            <Typography>Guest</Typography>
          </Button>
        </Box>
        <TripsTab />
      </Box>
      <Box className='w-1/4 space-y-6'>
        <Typography variant='h6'>Main Event</Typography>
        <EventCard event={event}></EventCard>
      </Box>
    </Box>
  );
};
