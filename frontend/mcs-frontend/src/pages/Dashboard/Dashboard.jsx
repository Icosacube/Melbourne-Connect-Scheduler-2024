import AddLocationIcon from '@mui/icons-material/AddLocation';
import ConnectingAirports from '@mui/icons-material/ConnectingAirports';
import Event from '@mui/icons-material/Event';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Divider, Stack, Typography } from '@mui/material/';
import * as React from 'react';
import { AddButton, Calendar, EventTitle } from '../../components';

// eslint-disable-next-line no-lone-blocks
{
  /* PlaceHolders */
}
const eventData = [
  {
    name: 'AI Workshop',
    dateTime: '30/04/2024 13:20',
    venue: 'M01, Level M',
    guestName: 'Wade Johnson',
    isCompleted: false
  },
  {
    name: 'ML Workshop',
    dateTime: '01/05/2024 12:40',
    venue: 'M01, Level M',
    guestName: 'Mac Wayne',
    isCompleted: true
  },
  {
    name: 'ChatGPT Event',
    dateTime: '20/05/2024 12:00',
    venue: 'M01, Level M',
    guestName: 'Bruce Mannor'
  },
  {
    name: 'Tech Startup Event',
    dateTime: '20/05/2024 12:00',
    venue: 'M01, Level M',
    guestName: 'Josh Keilor'
  }
];

export default function Dashboard() {
  return (
    <Box className="flex space-x-10">
      <Box className="w-3/12">
        <Stack direction="column" spacing={3}>
          <Typography variant="h5">Recently Edited Pages</Typography>
          {eventData.map((event) => (
            <EventTitle
              eventName={event.name}
              dateTime={event.dateTime}
              venue={event.venue}
              guestName={event.guestName}
              isCompleted={event.isCompleted}
            />
          ))}
        </Stack>
      </Box>
      <Box className="w-9/12 space-y-5">
        <Box className="space-y-2">
          <Typography variant="h5">Quick Actions</Typography>
          <Stack direction="row" spacing={3}>
            <AddButton type="Speaker">
              <PersonAddIcon fontSize="large" sx={{ color: 'white' }} />
            </AddButton>
            <AddButton type="Event">
              <Event fontSize="large" sx={{ color: 'white' }} />
            </AddButton>
            <AddButton type="Trip">
              <ConnectingAirports fontSize="large" sx={{ color: 'white' }} />
            </AddButton>
            <AddButton type="Booking">
              <AddLocationIcon fontSize="large" sx={{ color: 'white' }} />
            </AddButton>
          </Stack>
        </Box>
        <Box className="bg-white rounded-lg p-8 flex space-x-3 justify-between shadow-sm">
          <Box className="w-8/12">
            <Calendar />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box className="flex flex-col w-4/12">
            <Typography variant="h5" className="mb-2">
              Upcoming Events
            </Typography>
            <Divider className="mb-2" />
            {eventData.map((event) => (
              <>
                <Typography className="text-s text-gray-400">{event.dateTime}</Typography>
                <Typography className="text-lg font-semibold">{event.name}</Typography>
                <Typography className="text-s text-gray-400">{event.venue}</Typography>
                <Divider className="mb-2" />
              </>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
