import { Chip, Grid, Paper, Typography } from "@mui/material";
import React from "react";

function TravelView() {
  return (
  <Paper className="px-6 py-4 rounded-lg">
      <Grid container className="w-full flex justify-between items-center space-y-0.5">
        <Grid item xs={3}>
          <Typography variant="body2">Flight No.</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2">#BOOKREF</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2">#Invoice</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" align="right">Qantas</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6">NEW YORK</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h6">MELBOURNE</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2">XX:XX</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="body2">XX:XX</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2">XX/XX/XX</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">XX/XX/XX</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" align="right">X hr XX min</Typography>
        </Grid>
        <Grid item xs={4}>
          <Chip label="Business" />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2">1 x 23kg</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1" align="right">$XXX.XX</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TravelView;
