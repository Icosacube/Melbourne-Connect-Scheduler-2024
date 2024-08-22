import { Avatar, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import React, { FC } from "react";

// change variable names to camelCase
interface ProfileCardProps {
  firstName: string;
  lastName: string;
  roleTag: string;
}

export const ProfileCard: FC<ProfileCardProps> = ({ firstName, lastName, roleTag }) => {
  return (
    <Card sx={{ padding: 1, flexGrow: 1, minWidth: "210px", maxWidth: "270px", height: "128px" }}>
      <CardContent className="flex flex-row space-x-4 space-y-1">
        <Avatar className="size-24">A</Avatar>
        <Stack justifyContent="center" alignItems="flex-start">
          <Typography className="text-2xl">{firstName} {lastName}</Typography>
          <Chip label={roleTag} />
        </Stack>
      </CardContent>
    </Card>
  );
}


