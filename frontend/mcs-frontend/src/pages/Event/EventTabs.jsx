import { Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';

export default function EventTabs({ getTabName }) {
  const [value, setValue] = useState('About');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getTabName(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="event tabs"
        sx={{
          '& .MuiTab-root.Mui-selected': {
            color: '#FBB533' // Text color when selected
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#FBB533'
            // Change the indicator color
          },
          '& .MuiTab-root': {
            fontWeight: 'bold',
            fontSize: '1.25rem'
          }
        }}>
        <Tab label="About" value="About" />
        <Tab label="Participants" value="Participants" />
        <Tab label="Programme" value="Programme" />
        <Tab label="Services" value="Services" />
      </Tabs>
    </Box>
  );
}
