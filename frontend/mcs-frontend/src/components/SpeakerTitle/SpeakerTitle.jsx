import PersonIcon from "@mui/icons-material/Person";
import { Card, CardContent, Stack, Typography, Box } from "@mui/material";
import React from "react";

function SpeakerTitle({ firstname, lastname, organisation, children }) {
  return (
    <Card>
      <CardContent className="space-y-4 bg-primary min-w-96 text-black">
        <Stack direction="row" spacing={2} className="place-items-center">
          <PersonIcon fontSize="large" />
          <Typography className="text-4xl">
            {firstname} {lastname}
          </Typography>
        </Stack>

        <Typography className="text-lg ">{organisation}</Typography>
        <Box className="text-gray-600">{children}</Box>
      </CardContent>
    </Card>
  );
}

export default SpeakerTitle;
