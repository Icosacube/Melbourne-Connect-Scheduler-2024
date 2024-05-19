import { Avatar, Box, Chip, Typography } from '@mui/material';
import React from 'react';

function Participants() {
  return (
    <Box>
      <Box>
        <Typography variant="h6" className="text-gray-500">
          05/07/2024 | 15:30 - 12/07/2024 | 18:30
        </Typography>
        <Typography variant="h4">
          Data-Driven Futures: Responsible AI in Climate and Health Policy
        </Typography>
      </Box>
      <Box className="flex space-x-4 mt-4">
        <Chip label="All (65)" className="rounded-none   p-4 bg-primary" />
        <Chip label="Speakers (1)" className="rounded-none p-4 " />
        <Chip label="Guest (6)" className="rounded-none p-4 " />
      </Box>
      <Box className="flex flex-wrap gap-8 w-9/12 p-6 ">
        <Box className="space-y-3 p-5 shadow-md bg-white w-2/12 flex flex-col place-items-center">
          <Avatar className="size-28" />
          <Box className="grid place-items-center">
            <Typography variant="h6">John</Typography>
            <Typography variant="h6">Steward</Typography>
          </Box>
          <Chip label="Speaker" className="bg-primary" />
        </Box>
        {Array.from(Array(6)).map((_, index) => (
          <Box className="space-y-3 p-5 shadow-md bg-white w-2/12 flex flex-col place-items-center">
            <Avatar className="size-28" />
            <Box className="grid place-items-center">
              <Typography variant="h6">John</Typography>
              <Typography variant="h6">Steward</Typography>
            </Box>
            <Chip label="Guest" />
          </Box>
        ))}
        <Box className="space-y-3 p-5 shadow-md bg-white w-2/12 flex flex-col place-items-center">
          <Avatar className="size-28 bg-primary text-black ">
            <Typography variant="h4" className="font-medium">
              +59
            </Typography>
          </Avatar>
          <Box className="grid place-items-center">
            <Typography variant="h6">From</Typography>
            <Typography variant="h6">Eventbrite</Typography>
          </Box>
          <Chip label="Audience" />
        </Box>
      </Box>
      {/* <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        className="w-4/5"
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <ProfileCard firstname="Bruce" lastname="Wayne" roletag="CEO" />
          </Grid>
        ))}
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Stack className="w-1/6 space-y-3">
        <Box className="flex justify-between">
          <Typography variant="h6" noWrap>
            Role Group 1
          </Typography>
          <Chip label="5" className="w-1/4" />
        </Box>
        <Box className="flex justify-between">
          <Typography variant="h6" noWrap>
            Role Group 2
          </Typography>
          <Chip label="5" className="w-1/4" />
        </Box>
      </Stack> */}
    </Box>
  );
}

export default Participants;
