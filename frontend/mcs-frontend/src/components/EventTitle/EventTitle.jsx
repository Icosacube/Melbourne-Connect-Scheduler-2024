import { Avatar, Card, CardActionArea, CardContent, Chip, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import PlaceIcon from "@mui/icons-material/Place";
import React from "react";
function EventTitle({ eventName, dateTime, venue, guestName, isCompleted=false }) {
  return (
    <Card p={1} sx={{ width: "320px", height: "136px" }}>
      <CardActionArea>
        <CardContent>
          <Stack direction="row" spacing={0.5}>
            {isCompleted ? (
              <CheckCircleIcon fontSize="medium" />
            ) : (
              <PendingIcon fontSize="medium" />
            )}
            <Typography fontSize="large" noWrap>
              {eventName}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <CalendarMonthIcon fontSize="small" />
            <Typography color="text.secondary">{dateTime}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <PlaceIcon fontSize="small" />
            <Typography Nowrap color="text.secondary">
              {venue}
            </Typography>
          </Stack>
          {/* change avatar to headshot: <Avatar alt="guestName" src="/static/images/avatar.jpg" />} */}
          <Chip avatar={<Avatar>B</Avatar>} label={guestName} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default EventTitle;
