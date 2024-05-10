import { Box, Button, Typography, Chip, Container } from "@mui/material";
import React from "react";

function About() {
  return (
    <Container className="space-y-10">
      <Box className="w-full flex justify-between">
        <Box className="space-x-3 grow w-1/2">
          <Chip label="Placeholder" className="w-1/5" />
          <Chip label="Placeholder" className="w-1/5" />
        </Box>
        <Chip label="Location" className="w-1/3" />
      </Box>
      <Box className="bg-gray-500 p-8 rounded h-4/5">
        <Typography variant="h6">Event Description</Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet.
        </Typography>
      </Box>
    </Container>
  );
}

export default About;
