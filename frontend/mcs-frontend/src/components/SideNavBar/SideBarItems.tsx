import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function SideBarItems({ text }) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

export default SideBarItems;
