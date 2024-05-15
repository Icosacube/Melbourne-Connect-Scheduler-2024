import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";
import Accomodation from "./TabPages/Accomodation";
import Costs from "./TabPages/Costs";
import Report from "./TabPages/Report";
import Travel from "./TabPages/Travel";
function TripsTab() {
  const [value, setValue] = useState("Travel");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Travel" value="Travel" />
            <Tab label="Accomodation" value="Accomodation" />
            <Tab label="Costs" value="Costs" />
            <Tab label="Report" value="Report" />
          </TabList>
        </Box>
        <TabPanel value="Travel">{<Travel />}</TabPanel>
        <TabPanel value="Accomodation">
          <Accomodation />
        </TabPanel>
        <TabPanel value="Costs">
          <Costs />
        </TabPanel>
        <TabPanel value="Report">
          <Report />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default TripsTab;
