import {  Grid, Paper, Typography } from "@mui/material";
import React, { FC } from 'react';
import { Accommodation } from "../../../types/frontendTypes";

interface AccomProps {
  accom: Accommodation;
}

export const AccomCard: FC<AccomProps> = ({ accom }) => {
  return (
    <Paper className='w-full px-6 py-4 rounded-lg'>
      <Grid container className='flex space-between items-center'>
        <Grid container xs={10}>
          <Grid item xs={9}>
            <Typography variant='h6' noWrap>{accom.HotelName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' noWrap>{accom.Address}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant='body1'>Room {accom.Room}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant='body1'>{accom.CheckIn.format("DD MMM YY")}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant='body1'>{accom.CheckOut.format("DD MMM YY")}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant='body2'>{accom.BookingReference}</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='body2'>{accom.FundingAccount[0]}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='body1'>${accom.Cost}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' noWrap>{accom.Notes}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <img
            style = {{width:"100%"}}
            src='https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc='
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AccomCard;
