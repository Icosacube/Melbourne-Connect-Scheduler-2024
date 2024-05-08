import { Box, Typography } from "@mui/material";
import React from "react";
import {
  AddButton,
  BackButton,
  EventTitle,
  ProfileCard,
  ProfileHeader,
  SpeakerTag,
  SpeakerTitle,
} from "../../components";

function Components() {
  const tags = ["CEO", "Justice", "Dark Knight", "Vigilante", "Billionaire"];
  return (
    <Box className="flex flex-wrap justify-center items-center h-screen space-x-6">
      <BackButton text="Back" />
      <EventTitle
        eventName="Birthday Party"
        dateTime="30/04/2024 16:20"
        venue="M01, Level M"
        guestName="Bruce Wayne"
      />

      <SpeakerTitle firstname="Bruce" lastname="Wayne" organisation="CEO of Wayne Enterprises">
        <Typography>Hammer of Justice</Typography>
        <Typography>Dark Knight</Typography>
      </SpeakerTitle>

      <AddButton type="Event"></AddButton>

      <ProfileHeader
        title="Mr"
        firstname="Bruce"
        lastname="Wayne"
        organisation="Wayne Enterprise"
        tags={tags}
      />

      <ProfileCard firstname="Bruce" lastname="Wayne" roletag="CEO" />
      <SpeakerTag name="Bruce" />
    </Box>
  );
}

export default Components;
