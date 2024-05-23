import {
  Alert,
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import createEvent from '../../scripts/createEvent';

function CreateEventModal({ handleClose, open }) {
  const [newEvent, setNewEvent] = useState({
    host: '',
    venue: '',
    name: '',
    talkAbstract: '',
    eventDescription: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Otherwise, update the edited event data
    setNewEvent({ ...newEvent, [name]: value });
  };
  const handleSave = () => {
    setShowSuccess(false);
    handleClose();
    var res = createEvent(newEvent);
    if (res) {
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      }, 0);
    } else {
      // handle failure
    }
  };
  const speakers = [
    'Frances Haugen',
    'Alice Johnson',
    'Bob Smith',
    'Carol Williams',
    'Dave Brown',
    'Eve Davis',
    'Frank Miller',
    'Grace Wilson',
    'Heidi Moore',
    'Ivan Taylor',
    'Judy Anderson',
    'Judy Anderson'
  ];

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-xl w-9/12">
          <Box className="w-full p-7 flex space-x-6">
            <Box className="w-1/2 space-y-4">
              <Box className="flex justify-between space-x-2">
                <Stack className="w-1/2">
                  <Typography variant="h6">Host</Typography>
                  <Box className="bg-gray-100 p-4 rounded-xl ">
                    <Select
                      fullWidth
                      defaultValue={newEvent.host}
                      value={newEvent.host}
                      onChange={handleInputChange}
                      name="host">
                      {speakers.map((speaker) => (
                        <MenuItem value={speaker}>{speaker}</MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Stack>
              </Box>
              <Stack>
                <Typography variant="h6">Venue</Typography>
                <TextField
                  className="bg-gray-100 p-4 rounded-xl "
                  variant="outlined"
                  name="venue"
                  defaultValue={newEvent.venue}
                  value={newEvent.venue}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack>
                <Typography variant="h6">Event Description</Typography>
                <TextField
                  className="bg-gray-100 p-4 rounded-xl "
                  variant="outlined"
                  name="eventDescription"
                  defaultValue={newEvent.eventDescription}
                  onChange={handleInputChange}
                  value={newEvent.eventDescription}
                  multiline
                />
              </Stack>
            </Box>
            <Box className="w-1/2 space-y-4">
              <Stack>
                <Typography variant="h6">Event Name</Typography>
                <TextField
                  className="bg-gray-100 p-4 rounded-xl "
                  variant="outlined"
                  defaultValue={newEvent.name}
                  value={newEvent.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </Stack>
              <Stack>
                <Typography variant="h6">Talk Abstract</Typography>
                <TextField
                  className="bg-gray-100 p-4 rounded-xl "
                  variant="outlined"
                  defaultValue={newEvent.talkAbstract}
                  multiline
                  value={newEvent.talkAbstract}
                  onChange={handleInputChange}
                  name="talkAbstract"
                />
              </Stack>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={handleSave}
            className="bg-primary text-white hover:bg-tertiary ">
            Save
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={showSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}>
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Event updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default CreateEventModal;
