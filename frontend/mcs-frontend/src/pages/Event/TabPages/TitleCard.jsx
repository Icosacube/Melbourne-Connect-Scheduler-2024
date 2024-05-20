import { Box, Chip, Typography } from '@mui/material';
import React from 'react';

function TitleCard() {
  return (
    <Box>
      <Box className="flex align-middle space-x-4">
        <Typography variant="h6" className="text-gray-500">
          05/07/2024 | 15:30 - 12/07/2024 | 18:30
        </Typography>
        <Chip
          label={'Preparation'}
          sx={{ color: 'orange', borderColor: 'orange' }}
          variant="outlined"
        />
      </Box>
      <Typography variant="h4">
        Data-Driven Futures: Responsible AI in Climate and Health Policy
      </Typography>
    </Box>
  );
}

export default TitleCard;
