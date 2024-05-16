import EditCalendar from '@mui/icons-material/EditCalendar';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BackButton } from '../../components';

function Trips() {
  return (
    <Box className=" flex space-x-10">
      <Box className="w-2/3 space-y-4">
        <Box className="flex justify-between">
          <BackButton text="Back" />
          <EditCalendar fontSize="large" />
        </Box>
        <Box className="grid gap-5 p-5 overflow-scroll max-h-[45rem]">
          {Array.from(Array(20)).map((_, index) => (
            <NavLink to={`/trips/${index}`} key={index}>
              <Box className="flex justify-between bg-gray-300 rounded p-5 place-items-center">
                <Box className="flex place-items-center space-x-4">
                  <Avatar className="size-20" />
                  <Stack>
                    <Typography variant="h6">John Stevens</Typography>
                    <Typography variant="h7">Birthday Party</Typography>
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="h6">On-Going</Typography>
                  <Typography variant="h7">05/07/2001</Typography>
                </Box>
              </Box>
            </NavLink>
          ))}
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box className="w-1/3 space-y-5">
        <FilterListIcon fontSize="large" />
        <Typography variant="h6">Event Time</Typography>
        <Typography variant="body1"></Typography>
        <Typography variant="h6">Status</Typography>
      </Box>
    </Box>
  );
}

export default Trips;
