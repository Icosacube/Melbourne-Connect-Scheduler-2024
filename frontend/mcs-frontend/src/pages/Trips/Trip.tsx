import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { BackButton } from "../../components";
import TripsTab from "./TripsTab";

function Trip() {
  return (
    <Box className=" flex  space-x-10">
      <Box className="w-2/3 space-y-10">
        <BackButton text="Back" />
        <Box>
          <Button variant="contained" className="w-full min-h-60">
            <AddCircleOutlineOutlined className="size-20" />
            <Typography>Add Guest</Typography>
          </Button>
        </Box>
        <TripsTab />
      </Box>
      <Box className="w-1/3 space-y-4">
        <Typography variant="h6">Main Event</Typography>
        <Button variant="contained" className="w-full min-h-60" />
        <Typography variant="h6">Schedule</Typography>
        <Button variant="contained" className="w-10/12 min-h-80 " />
      </Box>
    </Box>
  );
}

export default Trip;
