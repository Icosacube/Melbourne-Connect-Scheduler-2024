import { Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Event } from '../../../types/types';

interface AboutTableProps {
  event: Event;
}

export const AboutTable:FC<AboutTableProps>=({ event })=> {
  console.log(event.speakers);
  return (
    <Box className="w-full p-7 flex space-x-6">
      <Box className="w-1/2 space-y-4">
        <Box className="flex justify-between space-x-2">
          <Stack className="w-1/2">
            <Typography variant="h6">Host</Typography>
            <Typography className="bg-gray-100 p-4 rounded-xl ">
              {event.speakers.toString()}
            </Typography>
          </Stack>
          {/* <Stack className="w-1/2">
            <Typography variant="h6">Category</Typography>
            <Typography className="bg-gray-100 p-4 rounded-xl">{event.category}</Typography>
          </Stack> */}
        </Box>
        <Stack>
          <Typography variant="h6">Venue</Typography>
          {/* <Typography className="bg-gray-100 p-4 rounded-xl">{event.venue}</Typography> */}
        </Stack>
        <Stack>
          <Typography variant="h6">Event Description</Typography>
          <Typography variant="body2" className="bg-gray-100 p-4 rounded-xl">
            {event.description}
          </Typography>
        </Stack>
      </Box>
      <Box className="w-1/2 space-y-4">
        <Stack>
          <Typography variant="h6">Talk Abstract</Typography>
          <Typography variant="body2" className="bg-gray-100 p-4 rounded-xl">
            {event.abstract}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default AboutTable;
