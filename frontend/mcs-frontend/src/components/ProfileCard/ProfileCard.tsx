import { Avatar, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import React, { FC } from "react";

interface ProfileCardProps {
  firstname: string;
  lastname: string;
  roletag: string;
}

export const ProfileCard: FC<ProfileCardProps> = ({ firstname, lastname, roletag }) => {
  return (
    <Card sx={{ padding: 1, flexGrow: 1, minWidth: "210px", maxWidth: "270px", height: "128px" }}>
      <CardContent className="flex flex-row space-x-4 space-y-1">
        <Avatar className="size-24">A</Avatar>
        <Stack justifyContent="center" alignItems="flex-start">
          <Typography className="text-2xl">{firstname} {lastname}</Typography>
          <Chip label={roletag} />
        </Stack>
      </CardContent>
    </Card>
  );
}


