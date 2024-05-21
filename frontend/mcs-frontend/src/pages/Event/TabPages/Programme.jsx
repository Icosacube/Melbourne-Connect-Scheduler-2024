import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import TitleCard from './TitleCard';

function Programme() {
  const programme = [
    {
      date: '05/07/2024',
      time: '09:00 - 09:15',
      title: 'Introduction and Welcome',
      location: 'Main Auditorium'
    },
    {
      date: '05/07/2024',
      time: '09:15 - 10:00',
      title: 'Keynote: Social Media and AI Safety',
      speaker: 'Frances Haugen, Meta Whistleblower',
      location: 'Main Auditorium'
    },
    {
      date: '05/07/2024',
      time: '10:00 - 11:00',
      title: 'Discussion: Transparency in Tech Companies',
      speakers: 'Industry Experts and Academics',
      location: 'Conference Hall A'
    },
    {
      date: '05/07/2024',
      time: '11:00 - 11:15',
      title: 'Networking Session',
      location: 'Foyer'
    },
    {
      date: '05/07/2024',
      time: '11:15 - 12:00',
      title: 'Interactive Workshop',
      location: 'Conference Hall B'
    }
  ];

  return (
    <Box className="space-y-5">
      <TitleCard />
      <Box className="w-7/12 bg-white shadow-2xl rounded-md h-[40rem] flex ">
        <Box className="w-8/12 bg-[#AA9494] h-full"></Box>
        <Box className="w-4/12 pl-7 p-4 overflow-scroll">
          {programme.map((event, index) => (
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
