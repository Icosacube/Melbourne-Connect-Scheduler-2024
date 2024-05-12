import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";

function ProfileHeader({ title, firstname, lastname, organisation, tags }) {
  return (
    <Box className="flex justify-between">
      <Box className="w-1/2 flex space-x-4">
        <Avatar className="size-40"></Avatar>
        <Stack className="justify-center space-y-3">
          <Typography className="text-2xl">{title}</Typography>
          <Typography className="text-4xl ">
            {firstname} {lastname}
          </Typography>
          <Typography className="text-lg ">{organisation}</Typography>
        </Stack>
      </Box>
      <Box className="w-1/3 flex space-x-4 flex-wrap justify-center place-items-center">
        {tags.map((tag, i) => {
          return <Chip label={tag} className="p-5" />;
        })}
      </Box>
    </Box>
  );
}

export default ProfileHeader;
