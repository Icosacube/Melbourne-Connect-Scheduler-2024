import EditCalendar from '@mui/icons-material/EditCalendar';
import AddCircleOutlineOutlined from '@mui/icons-material/FilterList';
import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { BackButton } from '../../components';
import { CreateTripModal } from './CreateTripModal';
import { useLoaderData } from 'react-router-dom';
import { Trip } from '../../types/frontendTypes';

export const Trips: FC = () => {
  const trips = useLoaderData() as Trip[];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box className=' flex space-x-10'>
      <Box className='w-2/3 space-y-4'>
        <Box className='flex justify-between'>
          <BackButton text='Back' />
          <EditCalendar fontSize='large' />
        </Box>
        <Box className='grid gap-5 p-5 overflow-scroll max-h-[45rem]'>
          {Array.from(Array(20)).map((_, index) => (
            <NavLink to={`/trips/${index}`} key={index}>
              <Box className='flex justify-between bg-gray-300 rounded p-5 place-items-center'>
                <Box className='flex place-items-center space-x-4'>
                  <Avatar className='size-20' />
                  <Stack>
                    <Typography variant='h6'>John Stevens</Typography>
                    <Typography variant='h6'>Birthday Party</Typography>
                  </Stack>
                </Box>
                <Box>
                  <Typography variant='h6'>On-Going</Typography>
                  <Typography variant='h6'>05/07/2001</Typography>
                </Box>
              </Box>
            </NavLink>
          ))}
        </Box>
      </Box>
      <Divider orientation='vertical' flexItem />
      <Box className='w-1/3 space-y-5'>
        <Button
          variant='contained'
          className=' flex space-x-2 bg-secondary hover:bg-accent hover:text-black mb-3 self-end h-12'
          onClick={handleOpen}
        >
          <AddCircleOutlineOutlined />
          <Typography>Create Trip</Typography>
        </Button>

        <CreateTripModal open={open} handleClose={handleClose} />
      </Box>
    </Box>
  );
};
