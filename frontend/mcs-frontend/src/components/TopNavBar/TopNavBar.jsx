import { Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

const pages = [
  {
    name: 'Dashboard',
    url: '/dashboard'
  },
  {
    name: 'Events',
    url: '/events'
  },
  {
    name: 'Trips',
    url: '/trips'
  },
  {
    name: 'People',
    url: '/people'
  },
  {
    name: 'Finance',
    url: '/finance'
  },
  {
    name: 'Components',
    url: '/components'
  }
];

function TopNavBar() {
  const curPath = useLocation().pathname;
  const pageName = pages.find((page) => curPath.includes(page.url))?.name;

  return (
    <Toolbar className="bg-white h-24 shadow-md w-full">
      <Typography variant="h4" className="text-black ml-6">
        {pageName}
      </Typography>
    </Toolbar>
  );
}
export default TopNavBar;
