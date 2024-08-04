import {  Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { FC } from 'react';
import { Flight } from "../../../types/frontendTypes";
import EditIcon from '@mui/icons-material/Edit'; 
interface FlightProps {
  flight: Flight;
}

export const TravelView: FC<FlightProps> = ({ flight }) => {
  return (
  <Paper className="px-5 pb-4 pt-2 rounded-lg">
      <Grid container className="w-full flex justify-between items-center space-y-0.5">
        <Grid item xs={3}>
          <Typography variant="body2">{flight.Airline}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2">{flight.FlightNumber}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2">Funding Account</Typography>
        </Grid>
        <Grid item xs={1}>
              <IconButton>
                 <EditIcon sx={{ fontSize: 18, alignItems: "right", m: 0, p:0}}/>
              </IconButton>
            </Grid>
        <Grid item xs={5}>
          <Typography variant="h6">{flight.DepartureFrom}</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h6">{flight.ArrivedTo}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2">XX:XX</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="body2">XX:XX</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2">{flight.DepartDate.format('DD MMM YY')}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">{flight.ArriveDate.format('DD MMM YY')}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1" align="right">${flight.Cost}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}


export default TravelView;
