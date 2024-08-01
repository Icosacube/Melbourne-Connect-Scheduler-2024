import { Box, Chip, Typography } from "@mui/material";
import React, { FC } from "react";

interface HeadlineProps {
  date?: string;
  name?: string;
  status?: string;
}

export const Headline: FC<HeadlineProps> = ({ date, name, status }) => {
  return (
    <Box className="mb-14">
      {/* Date */}
      <Box className="flex align-middle space-x-4 mt-4">
        <Typography variant="h6" className="text-gray-500">
          DD/MM/YYYY | XX:XX - DD/MM/YYYY | XX:XX
        </Typography>
        {/* Status */}
        <Chip
          label={"Preparation"}
          sx={{ color: "orange", borderColor: "orange" }}
          variant="outlined"
        />
      </Box>
      <Typography variant="h4">
        {name} Data-Driven Futures: Responsible AI in Climate and Health Policy{" "}
      </Typography>
    </Box>
  );
};

export default Headline;
