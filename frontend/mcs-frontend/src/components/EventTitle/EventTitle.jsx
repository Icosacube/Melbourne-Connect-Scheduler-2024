import { Card, CardContent, Stack, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React from "react";

function EventTitle({ eventName, dateTime, guestName }) {
  return (
    <Card>
      <CardContent className="space-y-4 bg-primary min-w-96 text-stone-800">
        <Stack direction="row" spacing={1} className="place-items-center">
          <CalendarMonthIcon fontSize="large" />
          <Typography className="text-4xl">{eventName}</Typography>
        </Stack>

        <Typography className="text-lg ">{dateTime}</Typography>

        <Stack direction="row" spacing={1} className="place-items-center">
          <PersonIcon fontSize="medium" />
          <Typography className="text-2xl ">{guestName}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default EventTitle;
