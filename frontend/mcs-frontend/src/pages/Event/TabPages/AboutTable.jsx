import { Box, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

function AboutTable() {
  return (
    <Box className="w-full p-7 flex space-x-6">
      <Box className="w-1/2 space-y-4">
        <Box className="flex justify-between space-x-2">
          <Stack className="w-1/2">
            <Typography variant="h6">Host</Typography>
            <Typography className="bg-gray-100 p-4 rounded-xl ">Frances Haugen</Typography>
          </Stack>
          <Stack className="w-1/2">
            <Typography variant="h6">Category</Typography>
            <Typography className="bg-gray-100 p-4 rounded-xl">Symposium</Typography>
          </Stack>
        </Box>
        <Stack>
          <Typography variant="h6">Venue</Typography>
          <Typography className="bg-gray-100 p-4 rounded-xl">
            Melbourne Connect, TheForum (Level M)
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h6">Event Description</Typography>
          <Typography variant="body2" className="bg-gray-100 p-4 rounded-xl">
            Countries worldwide are responding to the issues underlying Meta's historic lawsuit by
            introducing legislation. Learn how principles from the EU's Digital Services Act, the UK
            Online Safety Bill, and the new Canadian Online Harms Bill can bolster social media
            resilience against AI threats while preserving freedom of speech, and the ways Australia
            can contribute to this movement, shaping novel technologies in alignment with public
            interests. This event is a part of the AI at Melbourne Colloquium series and is
            presented in partnership with The University of Melbourne’s School of Computing and
            Information (CIS), Centre for Artificial Intelligence and Digital Ethics (CAIDE),
            Melbourne Connect and the Australian Information Security Association (AISA). Frances
            Haugen will deliver a keynote at AISA's Australian Cybersecurity Conference from 25–27
            March in Canberra, where she will engage with key government policymakers.
          </Typography>
        </Stack>
      </Box>
      <Box className="w-1/2 space-y-4">
        <Stack>
          <Typography variant="h6">Talk Area</Typography>
          <Typography className="bg-gray-100 p-4 rounded-xl">
            AI Safety, Social Media, Ethics in Technology, Whistleblowing, Tech Accountability,
            Public Safety
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h6">Talk Abstract</Typography>
          <Typography variant="body2" className="bg-gray-100 p-4 rounded-xl">
            In 2024, global AI threats have become a major concern, altering the technology
            landscape. With nearly half the world gearing up for elections, the rise of persuasive
            AI avatars on ill-prepared social platforms has transformed how at what scale
            information warfare is waged. At this AI at Melbourne Colloquium, join Frances Haugen,
            known for her whistleblowing actions against Meta (formerly Facebook), as she unpacks
            recently revealed documents from Meta obtained through legal actions by 44 US states and
            territories. She will connect how the company’s lack of transparency concerning AI
            safety issues on its platforms around children can also shine a light on what we may
            face as elections unfold this year, and what solutions are available. In this talk,
            discover the implications of corporate opacity in today's emerging intangible economy.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default AboutTable;
