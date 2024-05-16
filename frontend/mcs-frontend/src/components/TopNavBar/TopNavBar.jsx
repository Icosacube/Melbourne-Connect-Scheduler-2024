import { Avatar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { ReactComponent as Logo } from '../../Hex Logo (Colour).svg';
import { useLocation } from 'react-router-dom';

const pages = [
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

  return (
    <AppBar position="sticky">
      <Toolbar className="bg-primary">
        <Box className="flex">
          <Button key="Dashboard" className="text-white " href="/dashboard">
            <Logo />
          </Button>
        </Box>
        <Box className="flex justify-end grow space-x-10">
          {pages.map((page) => (
            <Button key={page.name} href={page.url}>
              <Typography
                variant="h6"
                className={`text-yellow-700 font-bold text-xl ${curPath.includes(page.url) ? 'underline decoration-4' : ''}`}>
                {page.name}
              </Typography>
            </Button>
          ))}

          <Avatar className="size-14"></Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default TopNavBar;
