import { Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import React, { FC, useState } from 'react';

interface EventTabsProps {
  getTabName: (tabName: string) => void;
}

export const EventTabs:FC<EventTabsProps> = ({ getTabName }) => {
  const [value, setValue] = useState('About');

  const handleChange = (_event: any, newValue: string) => {
    setValue(newValue);
    getTabName(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="event tabs">
        <Tab label="About" value="About" />
        <Tab label="Participants" value="Participants" />
        <Tab label="Programme" value="Programme" />
        <Tab label="Services" value="Services" />
      </Tabs>
    </Box>
  );
}
