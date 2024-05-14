import FilterList from "@mui/icons-material/FilterList";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { BackButton, EventTitle } from "../../components";
import EditCalendar from "@mui/icons-material/EditCalendar";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { NavLink } from "react-router-dom";

function Events() {
  return (
    <Container className="container flex space-x-10">
      <Box className="w-2/3 space-y-6">
        <Box className="flex justify-between ">
          <BackButton text={"Back"} />
          <EditCalendar fontSize="large" />
        </Box>
        <Box className=" flex justify-center">
          <Button
            variant="contained"
            className="w-11/12 min-h-28 flex space-x-2 bg-secondary hover:bg-accent hover:text-black"
          >
            <AddCircleOutlineOutlined className="size-20" />
            <Typography variant="h5">Create Event</Typography>
          </Button>
        </Box>
        <Box className="grid grid-cols-2 gap-5 p-5 overflow-scroll max-w-screen-lg">
          {Array.from(Array(20)).map((_, index) => (
            <NavLink to={`/events/${index}`} key={index} >
              <EventTitle
                eventName="Birthday Party"
                dateTime="30/04/2024 16:20"
                guestName="Bruce Wayne"
              />
            </NavLink>
          ))}
        </Box>
      </Box>
      <Box className="w-1/3 space-y-4">
        <FilterList />
        <Typography variant="h5">Event Time</Typography>
        <Typography variant="h5">Status</Typography>
      </Box>
    </Container>
  );
}

export default Events;
