import { Avatar, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import PlaceIcon from '@mui/icons-material/Place';
import React from 'react';
import { yellow } from '@mui/material/colors';
function EventTitle({ eventName, dateTime, venue, guestName, isCompleted = false }) {
  return (
    <Card p={1} sx={{ flexGrow: 1, minWidth: '320px', maxWidth: '480px', height: '136px' }}>
      <CardActionArea>
        <CardContent>
          <Stack direction="row" spacing={0.5}>
            {isCompleted ? (
              <CheckCircleIcon fontSize="medium" color="success" />
            ) : (
              <PendingIcon fontSize="medium" sx={{ color: yellow[700] }} />
            )}
            <Typography className="text-textAccent font-medium" fontSize="large" noWrap>
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
          <Chip className="bg-primary" avatar={<Avatar />} label={guestName} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default EventTitle;
