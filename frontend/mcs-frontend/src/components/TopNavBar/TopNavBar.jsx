import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import EventTopNavBar from './EventTopNavBar';
import DefaultTopNavBar from './DefaultTopNavBar';

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
  },
  { name: 'Event', url: '/events/:id' }
];

function TopNavBar() {
  const curPath = useLocation().pathname;
  const eventDetailRegex = /^\/events\/[^/]+$/;
  const isEventDetailPage = eventDetailRegex.test(curPath);
  const pageName = pages.find((page) => curPath.includes(page.url))?.name;

  return (
    <Toolbar className="bg-white h-24 shadow-md w-full">
      {isEventDetailPage ? (
        <EventTopNavBar pageName={pageName} />
      ) : (
        <DefaultTopNavBar pageName={pageName} />
      )}
    </Toolbar>
  );
}
export default TopNavBar;
