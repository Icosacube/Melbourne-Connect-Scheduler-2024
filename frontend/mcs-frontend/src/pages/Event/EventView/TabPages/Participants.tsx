import { Box } from "@mui/material";
import React from "react";
import Headline from "./Headline";
import { ParticipantsTable } from "./ParticipantsTable";

function Participants() {
  return (
    <Box>
      <Headline />
      <ParticipantsTable />
    </Box>
  );
}

export default Participants;
