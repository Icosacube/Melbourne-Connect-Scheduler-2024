import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";

function AccomodationEdit() {
  return (
    <Paper className="w-full px-6 py-4 rounded-lg">
      <Grid container className="flex space-between items-center">
        <Grid container xs={9}>
          <Grid item xs={9}>
            <Typography variant="h6">Hotel Name</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">BOOKREV</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1">Hotel Location</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">Invoice Number</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Room No.</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Room Type</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Rates $</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Check-in</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Check-out</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Total Cost</Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <img className="max-w-30" src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc="/>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AccomodationEdit;
