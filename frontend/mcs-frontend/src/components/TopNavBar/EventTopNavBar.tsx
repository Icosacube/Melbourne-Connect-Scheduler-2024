import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Button,
  Toolbar,
  Typography
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {EventTabs} from '../../pages/Event/EventView/EventTabs';
import CreateIcon from '@mui/icons-material/Create';
import ShareIcon from '@mui/icons-material/Share';
import EditEventModal from '../../pages/Event/EventView/EditEventModal';

interface EventTopNavBarProps {
  getCurTab: (data: string) => void;
  openEditModal: () => void;
}

const EventTopNavBar: React.FC<EventTopNavBarProps> = ({ getCurTab, openEditModal }) => {
  const [tabName, setTabName] = useState('About');
  const navigate = useNavigate();

  const handleTabChange = (data: string) => {
    setTabName(data);
    getCurTab(data);
  };

  const breadcrumbs = [
    <Link
      key="1"
      // underline="hover"
      to={'/events'}
      color="inherit"
    >
      Events Overview
    </Link>,
    <Typography key="2" color="text.primary">
      Event
    </Typography>,
  ];

  return (
    <>
      <Toolbar className="bg-white h-24 shadow-md w-[90%] fixed top-0 right-0 z-20">
        <Box className="text-gray-500 flex justify-between pl-4 w-full">
          <Box className="flex place-items-center">
            <Button
              startIcon={<ArrowBackIosIcon />}
              className="text-gray-600"
              onClick={() => {
                navigate(-1);
              }}
            />
            <Box className="ml-2">
              <Typography variant="h2">{tabName}</Typography>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Box>
          </Box>
          <Box className="flex place-items-center">
            <EventTabs getTabName={handleTabChange} />
            <Box className="flex h-14 space-x-4 ml-20 mr-20">
              <Button
                variant="contained"
                className="bg-accent2 hover:bg-secondary hover:text-white text-white"
              >
                <ShareIcon />
                <Typography variant="h6" className="ml-3">
                  Share
                </Typography>
              </Button>
              <Button
                variant="contained"
                onClick={openEditModal}
                className="bg-primary hover:bg-secondary hover:text-white text-black"
              >
                <CreateIcon />
                <Typography variant="h6" className="ml-3">
                  Edit
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Toolbar>

      
    </>
  );
};

export default EventTopNavBar;
