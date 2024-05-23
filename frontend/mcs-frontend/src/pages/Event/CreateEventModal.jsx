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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/en-au';

function CreateEventModal({ handleClose, open }) {
  const [newEvent, setNewEvent] = useState({
    speakers: [],
    venue: '',
    name: '',
    talkAbstract: '',
    eventDescription: '',
    date: dayjs()
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Otherwise, update the edited event data
    setNewEvent({ ...newEvent, [name]: value });
  };
  const handleDate = (e) => {
    // datepicker already has it
    setNewEvent({ ...newEvent, date: e });
  }
  const handleSave = () => {
    setShowSuccess(false);
    handleClose();
    console.log(newEvent);
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
    'Kia Tan',
    'Brandon Wii',
    'Brendan Lee'
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
                  <Typography variant="h6">Speakers</Typography>
                  <Box className="bg-gray-100 p-4 rounded-xl ">
                    <Select
                      fullWidth
                      defaultValue={newEvent.speakers}
                      value={newEvent.speakers}
                      onChange={handleInputChange}
                      name="speakers"
                      multiple>
                      {speakers.map((speaker) => (
                        <MenuItem value={speaker}>{speaker}</MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Stack>
                <Stack className="w-1/2">
                  <Typography variant="h6">Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="bg-gray-100 p-4 rounded-xl "
                      variant="outlined"
                      defaultValue={newEvent.date}
                      value={newEvent.date}
                      name="date"
                      onChange={handleDate}
                      adapterLocale="en-au"
                    />
                  </LocalizationProvider>
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
