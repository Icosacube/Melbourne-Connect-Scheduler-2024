import React from 'react';
import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import PlaceIcon from '@mui/icons-material/Place';
import { yellow } from '@mui/material/colors';
import { MainEvent } from '../../types/frontendTypes';


interface EventCardProps {
  event: MainEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card  >
      <CardActionArea sx={{ flexGrow: 1, width:"100%", height: '100px' }}>
        <CardContent>
          <Stack direction="row" spacing={0.5}>
            {event.Completed ? (
              <CheckCircleIcon fontSize="medium" sx={{ color: 'success.main' }} />
            ) : (
              <PendingIcon fontSize="medium" sx={{ color: yellow[700] }} />
            )}
            <Typography className="text-textAccent font-medium" fontSize="large" noWrap>
              {event.EventName}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <CalendarMonthIcon fontSize="small" />
            <Typography color="text.secondary">
              {event.Date != undefined ? event.Date.format("DD MMM YY") : "unknown"}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <PlaceIcon fontSize="small" />
            <Typography noWrap color="text.secondary">
              {event.Venue}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;