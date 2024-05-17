import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
}));

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        {/* left top calendar */}
        <Grid item xs={7}>
          <Item>calendar</Item>
        </Grid>
        {/* right top */}
        <Grid container direction="column" xs={5} spacing={2}>
          {/* "add" buttons */}
          <Item>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Item>Button1</Item>
              <Item>Button2</Item>
            </Stack>
          </Item>
           {/* list of recent pages */}
          <Item>
            Recent pages
            <Stack direction="column" spacing={1}>
              <Item>Item 1</Item>
              <Item>Item 2</Item>
              <Item>Item 3</Item>
            </Stack>
          </Item>
        </Grid>
        {/* bottom scrollable row */}
        <Grid item xs={12}>
          Upcoming Events
          <Stack direction="row" spacing={1}>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
