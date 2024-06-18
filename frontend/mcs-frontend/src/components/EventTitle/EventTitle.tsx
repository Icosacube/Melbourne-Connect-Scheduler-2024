import React from 'react';
import { Avatar, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import PlaceIcon from '@mui/icons-material/Place';
import { yellow } from '@mui/material/colors';

interface Event {
  title: string;
  date: string; // Assuming date is a string for simplicity
  time: string; // Assuming time is a string for simplicity
  venue: string;
  isCompleted: boolean;
  speakerFirstName: string;
  speakerLastName: string;
}

interface EventTitleProps {
  event: Event;
}

export const EventTitle: React.FC<EventTitleProps> = ({ event }) => {
  return (
    <Card  sx={{  padding: 1, flexGrow: 1, minWidth: '320px', maxWidth: '480px', height: '136px' }}>
      <CardActionArea>
        <CardContent>
          <Stack direction="row" spacing={0.5}>
            {event.isCompleted ? (
              <CheckCircleIcon fontSize="medium" sx={{ color: 'success.main' }} />
            ) : (
              <PendingIcon fontSize="medium" sx={{ color: yellow[700] }} />
            )}
            <Typography className="text-textAccent font-medium" fontSize="large" noWrap>
              {event.title}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <CalendarMonthIcon fontSize="small" />
            <Typography color="text.secondary">
              {event.date} {event.time}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <PlaceIcon fontSize="small" />
            <Typography noWrap color="text.secondary">
              {event.venue}
            </Typography>
          </Stack>
          {/* Change avatar to headshot: <Avatar alt="guestName" src="/static/images/avatar.jpg" />} */}
          <Chip
            className="bg-primary"
            avatar={<Avatar />}
            label={`${event.speakerFirstName} ${event.speakerLastName}`}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
