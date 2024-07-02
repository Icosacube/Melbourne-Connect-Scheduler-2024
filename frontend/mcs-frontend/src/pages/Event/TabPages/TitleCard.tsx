import { Box, Chip, Typography } from '@mui/material';
import React, { FC } from 'react';

interface TitleCardProps {
  date?: string ;
  name?: string ;
}

export const TitleCard:FC<TitleCardProps> = ({date, name}) => {
  return (
    <Box>
      <Box className="flex align-middle space-x-4">
        <Typography variant="h6" className="text-gray-500">
          {date}
        </Typography>
        <Chip
          label={'Preparation'}
          sx={{ color: 'orange', borderColor: 'orange' }}
          variant="outlined"
        />
      </Box>
      <Typography variant="h4">
        {name}
      </Typography>
    </Box>
  );
}

export default TitleCard;
