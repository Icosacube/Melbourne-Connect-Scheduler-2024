import { Grid, Typography, Box, Divider, Stack, Chip } from "@mui/material";
import React from "react";
import { ProfileCard } from "../../../components";

function Participants() {
  return (
    <Box className="flex space-x-6">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        className="w-4/5"
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <ProfileCard firstname="Bruce" lastname="Wayne" roletag="CEO" />
          </Grid>
        ))}
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Stack className="w-1/6 space-y-3">
        <Box className="flex justify-between">
          <Typography variant="h6" noWrap>
            Role Group 1
          </Typography>
          <Chip label="5" className="w-1/4" />
        </Box>
        <Box className="flex justify-between">
          <Typography variant="h6" noWrap>
            Role Group 2
          </Typography>
          <Chip label="5" className="w-1/4" />
        </Box>
      </Stack>
    </Box>
  );
}

export default Participants;
