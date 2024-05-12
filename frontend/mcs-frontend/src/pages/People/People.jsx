import React from "react";
import Container from "@mui/material/Container";
import { Box, Divider, Typography } from "@mui/material";
import { BackButton, ProfileCard } from "../../components";
import EditCalendar from "@mui/icons-material/EditCalendar";
import FilterListIcon from "@mui/icons-material/FilterList";
import { NavLink } from "react-router-dom";
function People() {
  return (
    <Container className="container flex space-x-10">
      <Box className="w-2/3 space-y-4">
        <Box className="flex justify-between">
          <BackButton text="Back" />
          <EditCalendar fontSize="large" />
        </Box>
        <Box className="grid grid-cols-2 gap-5 p-5 overflow-scroll max-h-[45rem]">
          {Array.from(Array(20)).map((_, index) => (
            <NavLink to={`/people/${index}`} key={index}>
              <ProfileCard firstname="John" lastname="Stevens" roletag="CEO" />
            </NavLink>
          ))}
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box className="w-1/3 space-y-5">
        <FilterListIcon fontSize="large" />
        <Typography variant="h6">Academic Domain</Typography>
        <Typography variant="body1"></Typography>
        <Typography variant="h6">Some other field</Typography>
      </Box>
    </Container>
  );
}

export default People;
