import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, Button, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { BackButton } from '../../components';
import TripsTab from './TripsTab';


export const Trip: FC = () => {

  return (
    <Box className=' flex space-x-10'>
      <Box className='w-2/3 space-y-10'>
        <BackButton text='Back' />
        <Box>
          <Button variant='contained' className='w-full min-h-60'>
            <Typography>Add Guest</Typography>
          </Button>
        </Box>
        <TripsTab />
      </Box>
      <Box className='w-1/3 space-y-4'>
        <Typography variant='h6'>Main Event</Typography>
        <Button variant='contained' className='w-full min-h-60' />
      </Box>
    </Box>
  );
};
