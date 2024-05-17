import { Box, Chip, Typography } from "@mui/material";
import React from "react";
import { ProfileCard } from "../../../components";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

function About() {
  return (
    <Box className="flex justify-between space-x-8">
      <Box className="w-3/6 space-y-8">
        <Box className="w-full flex justify-between ">
          <Box className="space-x-3 grow w-1/2">
            <Chip label="Placeholder" className="w-1/5" />
            <Chip label="Placeholder" className="w-1/5" />
          </Box>
          <Chip label="Location" className="w-1/3" />
        </Box>
        <Box className="bg-gray-500 p-8 rounded h-4/5">
          <Typography variant="h6">Event Description</Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet.
          </Typography>
        </Box>
      </Box>

      <Box className=" w-2/6 space-y-8">
        <Box className="flex justify-between ">
          <Typography variant="h5">Speaker</Typography>
          <EditCalendarIcon fontSize="large" />
        </Box>
        <ProfileCard firstname="Bruce" lastname="Wayne" roletag="CEO" />
      </Box>
    </Box>
  );
}

export default About;
