import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";
import About from "./TabPages/About";
import Participants from "./TabPages/Participants";
import Programme from "./TabPages/Programme";
import Services from "./TabPages/Services";

export default function EventTabs() {
  const [value, setValue] = useState("About");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="ABout" value="About" />
            <Tab label="Participants" value="Participants" />
            <Tab label="Programme" value="Programme" />
            <Tab label="Services" value="Services" />
          </TabList>
        </Box>
        <TabPanel value="About">{<About />}</TabPanel>
        <TabPanel value="Participants">
          <Participants />
        </TabPanel>
        <TabPanel value="Programme">
          <Programme />
        </TabPanel>
        <TabPanel value="Services">
          <Services />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
