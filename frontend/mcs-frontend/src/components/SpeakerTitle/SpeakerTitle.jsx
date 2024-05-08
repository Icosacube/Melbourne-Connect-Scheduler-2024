import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

function SpeakerTitle({ firstname, lastname, organisation, children }) {
  return (
    <Card>
    <Card p={1} sx={{ flexGrow:1, minWidth: "320px", maxWidth: "480px", height: "128px" }}>
      <CardContent className="flex flex-row space-x-4 space-y-1">
        <Avatar className="size-24">A</Avatar>
        <Stack>
          <Typography className="text-2xl">{firstname} {lastname}</Typography>
          <Typography color="text.secondary">{organisation}</Typography>
          <Stack direction={"row"} flexWrap={1} spacing={1}>
            {children.map((child) => (
            <Chip label={child}/>
          ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
    </Card>
  );
}

export default SpeakerTitle;
