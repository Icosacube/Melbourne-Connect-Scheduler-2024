import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getSpeakers } from "../../api/axios";
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
  const [speakers, setSpeakers] = useState([]);
  const tags = ["CEO", "Justice", "Dark Knight", "Vigilante", "Billionaire"];

  useEffect(() => {
    getSpeakers()
      .then((data) => {
        setSpeakers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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

      {"Data Retrieved:  " + JSON.stringify(speakers)}
    </Box>
  );
}

export default Components;
