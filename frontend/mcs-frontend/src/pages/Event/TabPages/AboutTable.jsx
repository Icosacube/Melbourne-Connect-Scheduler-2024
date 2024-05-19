import { Box, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

function AboutTable() {
  return (
    <Box className="w-full p-7 flex space-x-6">
      <Box className="w-1/2 space-y-4">
        <Box className="flex justify-between">
          <Stack>
            <Typography variant="h6">Host</Typography>
            <TextField variant="filled" />
          </Stack>
          <Stack>
            <Typography variant="h6">Category</Typography>
            <TextField variant="filled" />
          </Stack>
        </Box>
        <Stack>
          <Typography variant="h6">Venue</Typography>
          <TextField variant="filled" />
        </Stack>
        <Stack>
          <Typography variant="h6">Event Description</Typography>
          <TextField fullWidth multiline rows={10} variant="filled" />
        </Stack>
      </Box>
      <Box className="w-1/2 space-y-4">
        <Stack>
          <Typography variant="h6">Talk Area</Typography>
          <TextField variant="filled" />
        </Stack>
        <Stack>
          <Typography variant="h6">Talk Abstract</Typography>
          <TextField fullWidth multiline rows={15} variant="filled" />
        </Stack>
      </Box>
    </Box>
  );
}

export default AboutTable;
