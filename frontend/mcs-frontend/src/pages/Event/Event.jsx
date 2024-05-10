import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";
import { BackButton, EventTitle } from "../../components";
import EventTabs from "./EventTabs";

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

      <EventTabs />
    </Container>
  );
}

export default Event;
