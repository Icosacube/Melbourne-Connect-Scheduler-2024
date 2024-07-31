import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

function Travel() {
  return (
    <Box className="space-y-4">
      <Typography variant="h5">Flight Detail</Typography>
      <Box className="flex gap-4">
        <Button variant="contained" className="w-1/2 min-h-52">
          <AddCircleOutlineOutlined className="size-20" />
        </Button>
        <Button variant="contained" className="w-1/2 min-h-52">
          <AddCircleOutlineOutlined className="size-20" />
        </Button>
      </Box>
      <Typography variant="h5">Transports</Typography>
    </Box>
  );
}

export default Travel;
