import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { MainEvent, Speaker } from "../../../../types/frontendTypes";
import AboutTable from "./AboutTable";
import Banner from "./Banner";
import Headline from "./Headline";

interface AboutProps {
  event: MainEvent;
  speakers: Speaker[];
}

interface NameCardProps {
  firstName: string;
  lastName: string;
  position: string;
}

const NameCard: FC<NameCardProps> = ({ firstName, lastName, position }) => {
  return (
    <Box className="pl-4 pr-4 flex space-x-6 bg-white mt-4 pt-4 pb-2 shadow-lg rounded-md">
      <Avatar className="size-24 mb-4 " />
      <Stack>
        <Typography variant="h5">{firstName}</Typography>
        <Typography variant="h5">{lastName}</Typography>
        <Typography variant="h6" className="text-gray-400">
          {position}
        </Typography>
      </Stack>
    </Box>
  );
};

export const About: FC<AboutProps> = ({ event, speakers }) => {
  const firstSpeaker = speakers[0];
  const theRestOfSpeakers = speakers.slice(1);
  return (
    <Box className="flex justify-between space-x-8 mt-5">
      {/* Left side */}
      <Box className="w-9/12 space-y-5 bg-white">
        <Banner image={"ADD ACTUAL IMAGE INFO"} />
        <Box className="pl-8 pr-8">
          {/* Date and Status */}
          <Headline date={event?.Date.toString()} name={event?.EventName} />

          {/* Info Table */}
          <AboutTable event={event} />
        </Box>
      </Box>

      {/* Right side */}
      <Box className="w-3/12">
        <Box className=" bg-white rounded-2xl shadow-lg pt-8 pb-8 h-max">
          <Box className="pl-8 pr-4 flex space-x-6 ">
            <Avatar className="size-24 mb-4 " />
            <Stack>
              <Typography variant="h5">{firstSpeaker.FirstName}</Typography>
              <Typography variant="h5">{firstSpeaker.LastName}</Typography>
              <Typography variant="h6" className="text-gray-400">
                {firstSpeaker.Organisation}
              </Typography>
            </Stack>
          </Box>
          {/* Bio */}
          <Typography
            variant="body1"
            className="pl-8 pr-4 overflow-hidden"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 9,
            }}
          >
            {firstSpeaker.Bio}
          </Typography>
        </Box>

        {/* Attendees */}
        <Box className="flex pl-6 mt-4 space-x-4">
          <Typography variant="h5">Attendees</Typography>
          <Chip label="64" />
        </Box>
        {theRestOfSpeakers.map((speaker) => (
          <NameCard
            firstName={speaker.FirstName}
            lastName={speaker.LastName}
            position={speaker.Organisation}
          />
        ))}
      </Box>
    </Box>
  );
};
