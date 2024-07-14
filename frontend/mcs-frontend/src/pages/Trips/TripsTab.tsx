
import {Box, Grid } from "@mui/material";
import React, { useState, FC } from "react";
import Accomodation from "./TabPages/Accomodation";
import Costs from "./TabPages/Costs";
import Report from "./TabPages/Report";
import Travel from "./TabPages/Travel";

export const TripsTab:FC =()=> {
  return (
    <Box className="w-full">
        <Grid container className="flex justify-between items-center" spacing={2}>
          <Grid item md={12} lg={6}>
            <Travel />
          </Grid>
          <Grid item md={12} lg={6}>
            <Travel />
          </Grid>
          <Grid item md={12}>
            <Accomodation />
          </Grid>
          <Grid item md={12}>
            <Costs />
          </Grid>
        </Grid>
    </Box>
  );
}
