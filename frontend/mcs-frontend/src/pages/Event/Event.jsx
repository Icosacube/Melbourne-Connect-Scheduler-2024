import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { BackButton } from "../../components";
import EventTabs from "./EventTabs";

function Event() {
  return (
    <Box className="flex flex-col space-y-5">
      <Box className="space-y-5">
        <BackButton text="Back" />
        <Button variant="contained" className="w-full min-h-32 bg-gray-200" />
        <Typography variant="h7">05/07/2001 | 13:50</Typography>
        <Typography variant="h4">Birthday Party</Typography>
      </Box>

      <EventTabs />
    </Box>
  );
}

export default Event;
