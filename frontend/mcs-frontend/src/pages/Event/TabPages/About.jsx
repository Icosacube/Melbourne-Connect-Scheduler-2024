import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react';
import AboutTable from './AboutTable';
import TitleCard from './TitleCard';
// import EventBanner from '../../../assets/event-banner.jpg';

function About({ event }) {
  return (
    <Box className="flex justify-between space-x-8 mt-5">
      <Box className="w-9/12 space-y-5">
        <Box
          className="w-full  h-72 object-cover bg-gray-400 rounded-2xl shadow-lg"
          style={{ objectPosition: '50% 75%' }}
        />

        <TitleCard date={event.date.toString()} name={event.name} />
        <Box className=" bg-white rounded-2xl shadow-lg">
          <AboutTable event={event} />
        </Box>
      </Box>
      <Box className="w-3/12 bg-white rounded-2xl shadow-lg flex flex-col place-items-center pt-14 ">
        <Avatar className="size-40 mb-4 z-10" />

        {event.speakers.map((name) => (
          <Typography variant="h4">{name}</Typography>
        ))}

        <Typography variant="h5" className="text-gray-400 mt-6 pl-14 mb-6">
          Professor, University of Cambridge
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 300,
              height: 500
            }
          }}>
          <Paper elevation={7} className="bg-gray-400" />
        </Box>
      </Box>
    </Box>
  );
}

export default About;
