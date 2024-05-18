import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import EditCalendar from '@mui/icons-material/EditCalendar';
import FilterList from '@mui/icons-material/FilterList';
import { Box, Button, Typography, Modal } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BackButton, EventTitle } from '../../components';
import createEvent from '../../scripts/createEvent';

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
    <Box className="flex space-x-10">
      <Box className="w-2/3 space-y-6">
        <Box className="flex justify-between ">
          <BackButton text={'Back'} />
          <EditCalendar fontSize="large" />
        </Box>
        <Box className=" flex justify-center">
          <Button
            variant="contained"
            className="w-11/12 min-h-28 flex space-x-2 bg-secondary hover:bg-accent hover:text-black"
            onClick={handleOpen}>
            <AddCircleOutlineOutlined className="size-20" />
            <Typography variant="h5">Create Event</Typography>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </Box>
        <Box className="grid grid-cols-1 md:max-w-screen-2xl md:grid-cols-2 p-5 overflow-scroll max-w-screen-xl">
          {Array.from(Array(20)).map((_, index) => (
            <NavLink to={`/events/${index}`} key={index}>
              <EventTitle
                className="md:flex"
                eventName="Birthday Party"
                dateTime="30/04/2024 16:20"
                guestName="Bruce Wayne"
              />
            </NavLink>
          ))}
        </Box>
      </Box>
      <Box className="w-1/3 space-y-4">
        <FilterList />
        <Typography variant="h5">Event Time</Typography>
        <Typography variant="h5">Status</Typography>
      </Box>
    </Box>
  );
}

export default Events;
