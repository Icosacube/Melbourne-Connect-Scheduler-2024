import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

function EventsWidgets() {
  return (
    <Box className="flex space-x-3 w-full">
      <Card className="w-1/4 p-3 rounded-2xl">
        <CardContent>
          <Typography variant="h6" className="font-medium text-gray-500 ">
            New Events
          </Typography>
          <Box className="flex justify-between mt-4">
            <Typography variant="h4" className="font-medium ">
              22
            </Typography>
            <Typography variant="h4">🎊</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card className="w-1/4 p-3 rounded-2xl">
        <CardContent>
          <Typography variant="h6" className="font-medium text-gray-500 ">
            Events Completed
          </Typography>
          <Box className="flex justify-between mt-4">
            <Typography variant="h4" className="font-medium ">
              12
            </Typography>
            <Typography variant="h4">✅</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card className="w-1/4 p-3 rounded-2xl">
        <CardContent>
          <Typography variant="h6" className="font-medium text-gray-500 ">
            Events Happening Soon
          </Typography>
          <Box className="flex justify-between mt-4">
            <Typography variant="h4" className="font-medium ">
              7
            </Typography>
            <Typography variant="h4">⚠️</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card className="w-1/4 p-3 rounded-2xl">
        <CardContent>
          <Typography variant="h6" className="font-medium text-gray-500 ">
            Upcoming Spend
          </Typography>
          <Box className="flex justify-between mt-4">
            <Typography variant="h4" className="font-medium ">
              $468.40
            </Typography>
            <Typography variant="h4">💵</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EventsWidgets;
