import { Box } from '@mui/material';
import React, { useState } from 'react';
import EventTopNavBar from '../../components/TopNavBar/EventTopNavBar';
import EditEventModal from './EditEventModal';
import About from './TabPages/About';
import Participants from './TabPages/Participants';
import Programme from './TabPages/Programme';
import Services from './TabPages/Services';
import { useLoaderData } from 'react-router-dom';

function Event() {
  const [tabName, setTabName] = useState('About');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const loadedEvent = useLoaderData();
  console.log(loadedEvent)
  const [event, setEvent] = useState(loadedEvent);

  const renderTabContent = (event) => {
    switch (tabName) {
      case 'About':
        return <About event={event} />;
      case 'Participants':
        return <Participants />;
      case 'Programme':
        return <Programme />;
      case 'Services':
        return <Services />;
      default:
        return <About />;
    }
  };

  return (
    <Box>
      <EventTopNavBar getCurTab={setTabName} openEditModal={handleOpen} />
      <EditEventModal event={event} open={open} handleClose={handleClose} setEvent={setEvent} />
      {renderTabContent(event)}
    </Box>
  );
}

export default Event;
