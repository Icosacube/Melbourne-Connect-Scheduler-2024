import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

function AboutTable({ event }) {
  return (
    <Box className="w-full p-7 flex space-x-6">
      <Box className="w-1/2 space-y-4">
        <Box className="flex justify-between space-x-2">
          <Stack className="w-1/2">
            <Typography variant="h6">Host</Typography>
            <Typography className="bg-gray-100 p-4 rounded-xl ">{event.host}</Typography>
          </Stack>
          <Stack className="w-1/2">
            <Typography variant="h6">Category</Typography>
            <Typography className="bg-gray-100 p-4 rounded-xl">{event.category}</Typography>
          </Stack>
        </Box>
        <Stack>
          <Typography variant="h6">Venue</Typography>
          <Typography className="bg-gray-100 p-4 rounded-xl">{event.venue}</Typography>
        </Stack>
        <Stack>
          <Typography variant="h6">Event Description</Typography>
          <Typography variant="body2" className="bg-gray-100 p-4 rounded-xl">
            {event.eventDescription}
          </Typography>
        </Stack>
      </Box>
      <Box className="w-1/2 space-y-4">
        <Stack>
          <Typography variant="h6">Talk Area</Typography>
          <Typography className="bg-gray-100 p-4 rounded-xl">{event.talkArea}</Typography>
        </Stack>
        <Stack>
          <Typography variant="h6">Talk Abstract</Typography>
          <Typography variant="body2" className="bg-gray-100 p-4 rounded-xl">
            {event.talkAbstract}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default AboutTable;
