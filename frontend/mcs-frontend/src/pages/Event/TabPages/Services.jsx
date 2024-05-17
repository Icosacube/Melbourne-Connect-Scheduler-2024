import { Box, Chip, Typography } from '@mui/material';
import React from 'react';

function Services() {
  return (
    <Box className="space-y-5">
      <Box className="flex space-x-5 ">
        <Typography variant="h5">Venues Booking & services</Typography>
        <Chip label="" className="w-20" />
      </Box>
      <Chip label="Placeholder" className="w-full" />
      <Box>
        <Box className="flex space-x-5">
          <Typography variant="h5">Catering</Typography>
          <Chip label="" className="w-20" />
        </Box>
        <Box className="grid grid-cols-3">
          <Typography variant="h6">Item Name</Typography>
          <Typography variant="h6">Amount</Typography>
          <Typography variant="h6">Cost</Typography>
          {Array.from(Array(3)).map((_, index) => (
            <>
              <Typography variant="body1">Item Name {index}</Typography>
              <Typography variant="body1">{index * 4}</Typography>
              <Typography variant="body1">{index * 10}</Typography>
            </>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Services;
