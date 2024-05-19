import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';

function Programme() {
  const subEvent = [
    {
      date: '05/07/2024',
      time: '15:30',
      title: 'Current Climate',
      location: 'Auditorium A'
    },
    {
      date: '06/07/2024',
      time: '09:30',
      title: 'Future Climate',
      location: 'Auditorium B'
    },
    {
      date: '07/07/2024',
      time: '15:30',
      title: 'Meet and Greets',
      location: 'Auditorium C'
    },
    {
      date: '08/07/2024',
      time: '15:30',
      title: 'Food Service',
      location: 'Auditorium D'
    },
    {
      date: '09/07/2024',
      time: '15:30',
      title: 'AI Application',
      location: 'Auditorium E'
    }
  ];
  return (
    <Box className="space-y-5">
      <Box>
        <Typography variant="h6" className="text-gray-500">
          05/07/2024 | 15:30 - 12/07/2024 | 18:30
        </Typography>
        <Typography variant="h4">
          Data-Driven Futures: Responsible AI in Climate and Health Policy
        </Typography>
      </Box>
      <Box className="w-7/12 bg-white shadow-2xl rounded-md h-[40rem] flex ">
        <Box className="w-8/12 bg-[#AA9494] h-full"></Box>
        <Box className="w-4/12 pl-7 p-4">
          {subEvent.map((event, index) => (
            <Stack>
              <Typography className="text-gray-400 mb-2">
                {event.date} | {event.time}
              </Typography>
              <Typography variant="h6" className="font-bold">
                {event.title}
              </Typography>
              <Typography className="text-gray-400 pl-5">{event.location}</Typography>
              <Divider className="mb-2 mt-2" />
            </Stack>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Programme;
