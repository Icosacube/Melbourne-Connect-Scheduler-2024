import { Chip, Grid, Paper, Typography } from "@mui/material";
import React from "react";

function Travel() {
  return (
  <Paper className="w-full px-6 py-4 rounded-lg">
      <Grid container className="flex justify-between items-center">
        <Grid item>
          <Typography variant="body2">Flight No.</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">#BOOKREF</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">#Invoice</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">Qantas</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="h6">NEW YORK</Typography>
          <Typography variant="body2">XX:XX</Typography>
          <Typography variant="body2">XX/XX/XX</Typography>
          <Chip label="Business"/>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">MELBOURNE</Typography>
          <Typography variant="body2">XX:XX</Typography>
          <Typography variant="body2">XX/XX/XX</Typography>
          <Typography variant="body2">1 x 23kg</Typography>
        </Grid>
        <Grid item className="ml-auto">
          <Typography variant="body1">X hr XX min</Typography>
          <Typography variant="body1">$XXX.XX</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Travel;
