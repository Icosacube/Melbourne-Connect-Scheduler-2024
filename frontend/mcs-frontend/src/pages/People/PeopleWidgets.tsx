import { Box, Card, CardContent, Typography } from '@mui/material';
import React, {FC} from 'react';

export const PeopleWidgets:FC=()=> {
  return (
    <Box className="flex space-x-3 w-full">
      <Card className="w-1/4 p-3 rounded-2xl">
        <CardContent>
          <Typography variant="h6" className="font-medium text-gray-500 ">
            Previously Invited
          </Typography>
          <Box className="flex justify-between mt-4">
            <Typography variant="h4" className="font-medium ">
              12
            </Typography>
            <Typography variant="h4">📅</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card className="w-1/4 p-3 rounded-2xl">
        <CardContent>
          <Typography variant="h6" className="font-medium text-gray-500 ">
            Confirmed
          </Typography>
          <Box className="flex justify-between mt-4">
            <Typography variant="h4" className="font-medium ">
              6
            </Typography>
            <Typography variant="h4">✅</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card className="w-1/4 p-3 rounded-2xl">
        <CardContent>
          <Typography variant="h6" className="font-medium text-gray-500 ">
            Pending
          </Typography>
          <Box className="flex justify-between mt-4">
            <Typography variant="h4" className="font-medium ">
              16
            </Typography>
            <Typography variant="h4">⚠️</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card className="w-1/4 p-3 rounded-2xl">
        <CardContent>
          <Typography variant="h6" className="font-medium text-gray-500 ">
            Coming Soon
          </Typography>
          <Box className="flex justify-between mt-4">
            <Typography variant="h4" className="font-medium ">
              3
            </Typography>
            <Typography variant="h4">🔜</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}