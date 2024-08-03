import { Chip, Grid, Paper, TextField } from "@mui/material";
import React from "react";

function TravelEdit() {
  return (
    <Paper className="px-6 py-4 rounded-lg">
      <Grid container className="w-full flex justify-between items-center" columnSpacing={1}>
        <Grid item xs={3}>
          <TextField
            variant="standard"
            placeholder="Flight Number"
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="standard"
            placeholder="Booking Reference"
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="standard"
            placeholder="Invoice Number"
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="standard"
            placeholder="Flight Company"
            inputProps={{ style: { fontSize: 12, textAlign: 'right' } }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant="standard"
            placeholder="Departure"
            inputProps={{ style: { fontSize: 20 } }}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            variant="standard"
            placeholder="Arrival"
            inputProps={{ style: { fontSize: 20 } }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant="standard"
            placeholder="XX:XX"
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            variant="standard"
            placeholder="XX:XX"
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant="standard"
            placeholder="XX/XX/XX"
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="standard"
            placeholder="XX/XX/XX"
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="standard"
            placeholder="X hr XX min"
            inputProps={{ style: { fontSize: 12, textAlign: 'right' } }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="standard"
            placeholder="Flight Class"
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant="standard"
            placeholder="Notes"
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="standard"
            placeholder="$XXX.XX"
            inputProps={{ style: { fontSize: 14, textAlign: 'right' } }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TravelEdit;
