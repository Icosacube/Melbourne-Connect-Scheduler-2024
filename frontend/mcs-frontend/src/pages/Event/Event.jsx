import React from 'react';
import About from './TabPages/About';
import Participants from './TabPages/Participants';
import Programme from './TabPages/Programme';
import Services from './TabPages/Services';
import EventTopNavBar from '../../components/TopNavBar/EventTopNavBar';
import { Box } from '@mui/material';

function Event() {
  const [tabName, setTabName] = React.useState('About');

  const renderTabContent = () => {
    switch (tabName) {
      case 'About':
        return <About />;
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
      <EventTopNavBar getCurTab={setTabName} />
      {renderTabContent()}
    </Box>
  );
}

export default Event;
