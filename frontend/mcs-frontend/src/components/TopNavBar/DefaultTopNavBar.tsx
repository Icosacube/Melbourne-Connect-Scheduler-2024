import { Typography } from '@mui/material';
import React from 'react';

function DefaultTopNavBar({ pageName }) {
  return (
    <Typography variant="h4" className="text-black ml-6">
      {pageName}
    </Typography>
  );
}

export default DefaultTopNavBar;
