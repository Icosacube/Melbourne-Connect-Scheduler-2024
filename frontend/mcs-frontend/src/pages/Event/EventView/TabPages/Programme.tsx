import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import Headline from "./Headline";
import WeeklyCalendar from "../../../../components/WeeklyCalendar/WeeklyCalendar";
import { MainEvent } from "../../../../types/frontendTypes";

interface ProgrammeProps {
    event: MainEvent,
}

export const Programme : FC<ProgrammeProps> = ({ event}) => {
  return (
    <Box className="space-y-5">
      <Headline />
      <WeeklyCalendar event={event} />
    </Box>
  );
}

export default Programme;
