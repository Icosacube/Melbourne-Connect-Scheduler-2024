import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

function ProfileCard({ firstname, lastname, roletag }) {
  return (
    <Card>
      <CardContent className="text-white bg-blue-400 flex flex-row space-x-4">
        <Avatar className="size-20">A</Avatar>
        <Stack>
          <Typography className="text-2xl">{firstname}</Typography>
          <Typography className="text-2xl ">{lastname}</Typography>
          <Typography className="text-m text-gray-500 ">{roletag}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
