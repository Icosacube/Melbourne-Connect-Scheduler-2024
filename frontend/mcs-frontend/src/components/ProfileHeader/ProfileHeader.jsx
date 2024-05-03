import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

function ProfileHeader({ title, firstname, lastname, organisation, tags }) {
  return (
    <Card>
      <CardContent className="space-x-28 bg-blue-400 min-w-96 text-white flex flex-row ">
        <Stack direction="row" spacing={2} className="place-items-center">
          <Avatar className="size-20">A</Avatar>
          <Stack>
            <Typography className="text-2xl">{title}</Typography>
            <Typography className="text-4xl ">
              {firstname} {lastname}
            </Typography>
            <Typography className="text-lg ">{organisation}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" className="flex flex-wrap max-w-40 ">
          {tags.map((tag, i) => {
            return <Chip label={tag} className="text-white" />;
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProfileHeader;
