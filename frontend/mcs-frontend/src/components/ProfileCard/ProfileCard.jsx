import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

function ProfileCard({ firstname, lastname, roletag }) {
  return (
    <Card>
      <CardContent className="text-black bg-primary flex flex-row space-x-4">
        <Avatar className="size-20"></Avatar>
        <Stack>
          <Box className="flex flex-wrap space-x-2">
            <Typography className="text-4xl">{firstname}</Typography>
            <Typography className="text-4xl ">{lastname}</Typography>
          </Box>
          <Typography className="text-xl text-gray-600 ">{roletag}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
