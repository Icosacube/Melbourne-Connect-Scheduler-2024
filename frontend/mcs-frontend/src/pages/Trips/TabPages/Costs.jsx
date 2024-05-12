import { Box, Button, Typography } from "@mui/material";
import React from "react";

function Costs() {
  return (
    <Box className="bg-gray-300 p-8 space-y-5">
      <Typography variant="h5">Total: $250.00</Typography>
      <Button variant="contained" className="w-full min-h-12 bg-gray-200" />
      <Button variant="contained" className="w-full min-h-12 bg-gray-200" />
      <Button variant="contained" className="w-full min-h-12 bg-gray-200" />
      <Button variant="contained">New</Button>
    </Box>
  );
}

export default Costs;
