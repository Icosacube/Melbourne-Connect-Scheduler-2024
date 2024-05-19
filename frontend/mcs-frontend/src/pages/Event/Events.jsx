import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import EventsTable from './EventsTable';

function Events() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Box className="  mb-4 flex flex-col">
        <Button className="bg-secondary text-white hover:bg-primary mb-3 self-end">
          {' '}
          + Add Event
        </Button>
        <Box className="flex space-x-3 w-full">
          <Card className="w-1/4 p-3 rounded-2xl">
            <CardContent>
              <Typography variant="h7" className="font-medium text-gray-500 ">
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
              <Typography variant="h7" className="font-medium text-gray-500 ">
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
              <Typography variant="h7" className="font-medium text-gray-500 ">
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
              <Typography variant="h7" className="font-medium text-gray-500 ">
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
      </Box>
      <Box className="w-full bg-white shadow-md">
        <EventsTable />
      </Box>
    </>
  );
}

export default Events;
