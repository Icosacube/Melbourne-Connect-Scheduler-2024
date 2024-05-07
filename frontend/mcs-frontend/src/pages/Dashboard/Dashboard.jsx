import * as React from "react";
import { styled } from "@mui/material/styles";
import { EventTitle } from "../../components";
import {Box, Grid, Paper, Stack} from "@mui/material/"

 {/* PlaceHolders */}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
}));

const eventData = [
  {name:"Birthday Party", dateTime: "30/04/2024 13:20", venue: "M01, Level M", guestName: "Bruce Wayne", isCompleted: false},
  {name:"Gotham City Charity Fund Event", dateTime: "01/05/2024 12:40", venue: "M01, Level M", guestName: "Bruce Wayne", isCompleted: true},
  {name:"Birthday Party", dateTime: "20/05/2024 12:00", venue: "M01, Level M", guestName: "Bruce Wayne"}
]


export default function Dashboard() {
  return (
    <Box m={2} sx={{ flexGrow: 1}} >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        {/* left top calendar */}
        <Grid item xs={12} md={8} lg={9}>
          <Item>calendar</Item>
        </Grid>
        {/* right top */}
        <Grid container direction="column" xs={12} md={4} lg={3} spacing={2}>
          {/* "add" buttons */}
          <Item>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Item>Button1</Item>
              <Item>Button2</Item>
            </Stack>
          </Item>
           {/* list of recent pages */}
          <Item>
            Recent pages
            <Stack direction="column" spacing={1}>
              <Item>Item 1</Item>
              <Item>Item 2</Item>
              <Item>Item 3</Item>
            </Stack>
          </Item>
        </Grid>
        {/* bottom scrollable row */}
        <Grid item xs={12}>
          Upcoming Events
          <Stack direction="row" spacing={1}>
          {eventData.map((event) => (
            <EventTitle
            eventName= {event.name}
            dateTime= {event.dateTime}
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