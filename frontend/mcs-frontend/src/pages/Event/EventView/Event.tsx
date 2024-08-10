import { Box } from '@mui/material';
import React, { FC, useState } from 'react';
import EventTopNavBar from '../../../components/TopNavBar/EventTopNavBar';
import EditEventModal from './EditEventModal';
import { About } from './TabPages/About';
import Participants from './TabPages/Participants';
import Programme from './TabPages/Programme';
import {Services} from './TabPages/Services';
import { useLoaderData } from 'react-router-dom';
import { MainEvent } from '../../../types/frontendTypes';

export const Event: FC = () => {
  const [tabName, setTabName] = useState('About');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { event, speakers } = useLoaderData() as {
    event: MainEvent;
    speakers: any[];
  };

  console.log(event);
  console.log(speakers);
  const [curEvent, setEvent] = useState(event);

  const renderTabContent = (event: MainEvent) => {
    switch (tabName) {
      case 'About':
        return <About event={event} speakers={speakers} />;
      case 'Participants':
        return <Participants />;
      case 'Programme':
        return <Programme />;
      case 'Services':
        return <Services event={event} />;
      default:
        return <About event={event} speakers={speakers} />;
    }
  };

  return (
    <Box>
      <EventTopNavBar getCurTab={setTabName} openEditModal={handleOpen} />
      {/* <EditEventModal
        event={event}
        speakers={speakers}
        open={open}
        handleClose={handleClose}
        setEvent={setEvent}
      /> */}
      {renderTabContent(curEvent)}
    </Box>
  );
};
