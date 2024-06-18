import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface SideBarItemsProps {
  text: string;
}

export const SideBarItems: FC<SideBarItemsProps> = ({ text }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}


