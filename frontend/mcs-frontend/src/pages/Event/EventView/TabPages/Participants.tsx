import { Avatar, Box, Chip, Typography } from "@mui/material";
import React from "react";
import TitleCard from "./TitleCard";

function Participants() {
  const participants = [
    { firstName: "Alice", lastName: "Smith" },
    { firstName: "Bob", lastName: "Johnson" },
    { firstName: "Carol", lastName: "Williams" },
    { firstName: "David", lastName: "Brown" },
    { firstName: "Eve", lastName: "Davis" },
  ];
  return (
    <Box>
      <TitleCard />
      <Box className="flex space-x-4 mt-4">
        <Chip label="All (65)" className="rounded-none   p-4 bg-primary" />
        <Chip label="Speakers (1)" className="rounded-none p-4 " />
        <Chip label="Guest (6)" className="rounded-none p-4 " />
      </Box>
      <Box className="flex flex-wrap gap-8 w-9/12 p-6 ">
        <Box className="space-y-3 p-5 shadow-md bg-white w-2/12 flex flex-col place-items-center">
          <Avatar className="size-28" />
          <Box className="grid place-items-center">
            <Typography variant="h6">France</Typography>
            <Typography variant="h6">Haugen</Typography>
          </Box>
          <Chip label="Speaker" className="bg-primary" />
        </Box>
        {participants.map((participants, index) => (
          <Box className="space-y-3 p-5 shadow-md bg-white w-2/12 flex flex-col place-items-center">
            <Avatar className="size-28" />
            <Box className="grid place-items-center">
              <Typography variant="h6">{participants.firstName}</Typography>
              <Typography variant="h6">{participants.lastName}</Typography>
            </Box>
            <Chip label="Guest" />
          </Box>
        ))}
        <Box className="space-y-3 p-5 shadow-md bg-white w-2/12 flex flex-col place-items-center">
          <Avatar className="size-28 bg-primary text-black ">
            <Typography variant="h4" className="font-medium">
              +59
            </Typography>
          </Avatar>
          <Box className="grid place-items-center">
            <Typography variant="h6">From</Typography>
            <Typography variant="h6">Eventbrite</Typography>
          </Box>
          <Chip label="Audience" />
        </Box>
      </Box>
    </Box>
  );
}

export default Participants;
