import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

function SpeakerTag({ name }) {
  return (
    <Stack
      direction="row"
      className="p-8 space-x-4 place-items-center text-black bg-primary"
    >
      <Avatar className="size-20 bg-gray-500">A</Avatar>
      <Typography className="text-2xl">{name}</Typography>
      <Typography className="text-2xl ">XXXX</Typography>
    </Stack>
  );
}

export default SpeakerTag;
