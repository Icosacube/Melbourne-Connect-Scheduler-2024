import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, Button, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { BackButton } from '../../components';
import { CreateAccommodationModal } from './Accomodation/CreateAccommodationModal';
import { CreateFlightModal } from './Flight/CreateFlightModal';
import TripsTab from './TripsTab';


export const Trip: FC = () => {
  const [openAccom, setOpenAccom] = useState(false);
  const [openFlight, setOpenFlight] = useState(false);

  const handleOpenAccom = () => {
    setOpenAccom(true);
  };
  const handleCloseAccom = () => {
    setOpenAccom(false);
  };
  const handleOpenFlight = () => {
    setOpenFlight(true);
  };
  const handleCloseFlight = () => {
    setOpenFlight(false);
  };
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
        <Button onClick={handleOpenAccom} variant='contained'>
          Add Accommodation
        </Button>
        <Button onClick={handleOpenFlight} variant='contained'>
          Add Flight
        </Button>
      </Box>

      <CreateFlightModal handleClose={handleCloseFlight} open={openFlight} />
      <CreateAccommodationModal handleClose={handleCloseAccom} open={openAccom} />
    </Box>
  );
};
