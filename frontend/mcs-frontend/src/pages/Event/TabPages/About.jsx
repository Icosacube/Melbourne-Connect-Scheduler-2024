import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react';
import AboutTable from './AboutTable';

function About() {
  return (
    <Box className="flex justify-between space-x-8 mt-5">
      <Box className="w-9/12 space-y-5">
        <Box className=" bg-[#AA9494] shadow-lg h-72" />
        <Box>
          <Typography variant="h6" className="text-gray-500">
            05/07/2024 | 15:30 - 12/07/2024 | 18:30
          </Typography>
          <Typography variant="h4">
            Data-Driven Futures: Responsible AI in Climate and Health Policy
          </Typography>
        </Box>
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
