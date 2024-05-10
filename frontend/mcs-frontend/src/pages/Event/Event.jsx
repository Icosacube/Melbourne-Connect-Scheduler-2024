import Container from "@mui/material/Container";
import React, { useState } from "react";
import { BackButton, EventTitle } from "../../components";
import EventTabs from "./EventTabs";

function Event() {
  return (
    <Container className="container flex flex-col ">
      <BackButton text="Back" />

      <EventTitle
        eventName="Birthday Party"
        dateTime="30/04/2024 16:20"
        guestName="Bruce Wayne"
      />

      {/* tabs */}
      <EventTabs />
    </Container>
  );
}

export default Event;
