import { Avatar, Card, CardContent, Chip,  Stack, Typography } from "@mui/material";
import React from "react";

function ProfileCard({ firstname, lastname, roletag }) {
  return (
    <Card p={1} sx={{ flexGrow:1, minWidth: "210px", maxWidth: "270px", height: "128px" }}>
      <CardContent className="flex flex-row space-x-4 space-y-1">
        <Avatar className="size-24">A</Avatar>
        <Stack   
        justifyContent="center"
        alignItems="flex-start">
          <Typography className="text-2xl">{firstname} {lastname}</Typography>
          <Chip label={roletag}/>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
