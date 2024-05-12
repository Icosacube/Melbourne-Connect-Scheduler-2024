import { Box, Typography, Stack } from "@mui/material";
import React from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

function Programme() {
  return (
    <Box className="flex space-x-10">
      <Box className="w-1/2 ">
        <Typography variant="h5">Availabilities</Typography>
        <Box className="flex">
          <Box className="min-h-80 bg-gray-300 w-4/5 flex flex-col items-center justify-center">
            <AddCircleOutlineOutlinedIcon fontSize="large" />
            <Typography variant="h6">Request Availabilities</Typography>
          </Box>
          <Stack className="bg-gray-400 w-1/5 p-3">
            <Typography>People</Typography>
            <Typography>Name 1</Typography>
            <Typography>Name 2</Typography>
          </Stack>
        </Box>
      </Box>
      <Box className="w-1/2 ">
        <Typography variant="h5">Schedule</Typography>
        <Box className="min-h-80 bg-gray-300 flex flex-col items-center justify-center">
          <AddCircleOutlineOutlinedIcon fontSize="large" />
          <Typography variant="h6">Add Events</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Programme;
