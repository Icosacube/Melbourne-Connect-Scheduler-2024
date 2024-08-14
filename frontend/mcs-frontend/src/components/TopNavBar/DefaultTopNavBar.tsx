import { Typography } from '@mui/material';
import React from 'react';

interface DefaultTopNavBarProps {
  pageName: string | undefined;
}

const DefaultTopNavBar: React.FC<DefaultTopNavBarProps> = ({ pageName }) => {
  return (
    <Typography variant="h2" className="ml-6">
      {pageName}
    </Typography>
  );
}

export default DefaultTopNavBar;
