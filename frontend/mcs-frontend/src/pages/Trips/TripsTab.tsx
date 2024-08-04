
import {Box, Grid, Typography } from "@mui/material";
import React, { useState, FC } from "react";
import Accomodation from "./TabPages/Accomodation";
import Costs from "./TabPages/Costs";
import TravelView from "./TabPages/TravelView";
import { Flight } from "../../types/frontendTypes";
import dayjs from "dayjs";


export const TripsTab:FC =()=> {
  const exampleFlight: Flight = {
    RecordID: '1',
    FlightReference: 'ABC123',
    Airline: 'Qantas',
    FlightNumber: 'EA1234',
    DepartureFrom: 'City A',
    ArrivedTo: 'City B',
    DepartDate: dayjs('2024-08-01T10:00:00'),
    ArriveDate: dayjs('2024-08-01T12:00:00'),
    Cost: 500,
    Trip: ['001', '002'],
    FundingAccount: ['a12', 'b34'],
    ReturnFlight: ['c341', 'd4576'],
  };
  
  return (
    <Box className="w-full">
        <Grid container className="flex justify-between items-center" spacing={2}>
          <Grid item xs={12}>
            <Typography>Flight Tickets</Typography>
          </Grid>
          <Grid item md={12} lg={6}>
          <TravelView flight={exampleFlight}/>
          </Grid>
          <Grid item md={12} lg={6}>
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

export default TripsTab;