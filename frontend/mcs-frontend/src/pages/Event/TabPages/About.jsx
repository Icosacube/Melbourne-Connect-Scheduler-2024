import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react';
import AboutTable from './AboutTable';
import TitleCard from './TitleCard';

function About() {
  return (
    <Box className="flex justify-between space-x-8 mt-5">
      <Box className="w-9/12 space-y-5">
        <Box className=" bg-[#AA9494] shadow-lg h-72" />
        <TitleCard />
        <Box className=" bg-white rounded-2xl shadow-lg">
          <AboutTable />
        </Box>
      </Box>
      <Box className="w-3/12 bg-white rounded-2xl shadow-lg flex flex-col place-items-center pt-14 ">
        <Avatar className="size-40 mb-4 z-10" />

        <Typography variant="h4">John</Typography>
        <Typography variant="h4">Steward</Typography>

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
