import { Box, Grid, Stack, Typography } from '@mui/material/';
import * as React from 'react';
import { AddButton, Calendar, EventTitle } from '../../components';

// eslint-disable-next-line no-lone-blocks
{
  /* PlaceHolders */
}
const eventData = [
  {
    name: 'Birthday Party',
    dateTime: '30/04/2024 13:20',
    venue: 'M01, Level M',
    guestName: 'Bruce Wayne',
    isCompleted: false
  },
  {
    name: 'Gotham City Charity Fund Event',
    dateTime: '01/05/2024 12:40',
    venue: 'M01, Level M',
    guestName: 'Bruce Wayne',
    isCompleted: true
  },
  {
    name: 'Birthday Party',
    dateTime: '20/05/2024 12:00',
    venue: 'M01, Level M',
    guestName: 'Bruce Wayne'
  }
];

export default function Dashboard() {
  return (
    <Box m={2} sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="start"
        alignItems="start"
        rowSpacing={4}
        columnSpacing={10}>
        {/* left top calendar */}
        <Grid item xs={12} md={8} lg={9}>
          <Calendar />
        </Grid>
        {/* right top */}
        <Grid
          item
          container
          direction={'column'}
          xs={12}
          md={4}
          lg={2}
          spacing={2}
          className="space-y-5">
          {/* "add" buttons */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <AddButton type={'Profile'}></AddButton>
            <AddButton type={'Event'}></AddButton>
          </Stack>

          {/* list of upcoming events */}
          <Stack direction="column" spacing={1}>
            <Typography className="text-2xl">Upcoming Events</Typography>
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
        </Grid>
        {/* bottom scrollable row */}
        <Grid item xs={12} spacing={4}>
          <Typography className="text-2xl font-bold text-textAccent">
            Recently Edited Pages
          </Typography>
          <Stack direction="row" spacing={3}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
