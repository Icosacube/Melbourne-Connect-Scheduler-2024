import { Box, Breadcrumbs, Button, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EventTabs from '../../pages/Event/EventTabs';
import CreateIcon from '@mui/icons-material/Create';
import ShareIcon from '@mui/icons-material/Share';

function EventTopNavBar({ getCurTab }) {
  const [tabName, settabName] = useState('About');

  function getTabName(data) {
    settabName(data);
    getCurTab(data);
  }
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
      Events Overview
    </Link>,
    <Typography key="2" color="text.primary">
      Event
    </Typography>
  ];
  return (
    <>
      <Toolbar className="bg-white h-24 shadow-md w-[90%] fixed top-0 right-0 ">
        <Box className="text-gray-500 flex justify-between pl-4 w-full">
          <Box className="flex place-items-center">
            <ArrowBackIosIcon />
            <Box className="ml-2">
              <Typography variant="h4">{tabName}</Typography>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Box>
          </Box>
          <Box className="flex place-items-center">
            <EventTabs getTabName={getTabName} />
            <Box className="flex h-14 space-x-4 ml-20 mr-20">
              <Button
                variant="contained"
                className="bg-accent hover:bg-secondary hover:text-white text-black">
                <ShareIcon />
                <Typography variant="h7" className="ml-3">
                  Share
                </Typography>
              </Button>
              <Button
                variant="contained"
                className="bg-primary hover:bg-secondary hover:text-white  text-black">
                <CreateIcon />
                <Typography variant="h7" className="ml-3">
                  Edit
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </>
  );
}

export default EventTopNavBar;
