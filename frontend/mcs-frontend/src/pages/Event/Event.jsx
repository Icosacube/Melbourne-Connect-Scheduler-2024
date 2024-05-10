import Container from "@mui/material/Container";
import React from "react";
import { BackButton, EventTitle, ProfileCard } from "../../components";
import EventTabs from "./EventTabs";
import { Box } from "@mui/material";

function Event() {
  return (
    <Container className="container flex flex-col space-y-10">
      <Box>
        <BackButton text="Back" />
        <EventTitle
          eventName="Birthday Party"
          dateTime="30/04/2024 16:20"
          guestName="Bruce Wayne"
        />
      </Box>

      <Box className="flex space-x-10">
        <Box className=" w-3/5">
          <EventTabs />
        </Box>
        <Box className=" w-2/5">
          <ProfileCard firstname="Bruce" lastname="Wayne" roletag="CEO" />
        </Box>
      </Box>
    </Container>
  );
}

export default Event;
