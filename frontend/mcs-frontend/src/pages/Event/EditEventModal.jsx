import { Box, Button, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

function EditEventModal({ event, handleClose, open, setEvent }) {
  const [editedEvent, setEditedEvent] = useState(event);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Otherwise, update the edited event data
    setEditedEvent({ ...editedEvent, [name]: value });
  };
  function handleSave() {
    // Save the edited event data
    console.log(editedEvent);
    setEvent(editedEvent);
    handleClose();
  }
  return (
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
                    defaultValue={editedEvent.host}
                    value={editedEvent.host}
                    onChange={handleInputChange}
                    name="host">
                    <MenuItem value={'Frances Haugen'}>Frances Haugen</MenuItem>
                    <MenuItem value={'John Steward'}>John Steward</MenuItem>
                    <MenuItem value={'Steven Wong'}>Steven Wong</MenuItem>
                  </Select>
                </Box>
              </Stack>
              <Stack className="w-1/2">
                <Typography variant="h6">Category</Typography>
                <TextField
                  className="bg-gray-100 p-4 rounded-xl "
                  variant="outlined"
                  defaultValue={editedEvent.category}
                  value={editedEvent.category}
                  name="category"
                  onChange={handleInputChange}
                />
              </Stack>
            </Box>
            <Stack>
              <Typography variant="h6">Venue</Typography>
              <TextField
                className="bg-gray-100 p-4 rounded-xl "
                variant="outlined"
                name="venue"
                defaultValue={editedEvent.venue}
                value={editedEvent.venue}
                onChange={handleInputChange}
              />
            </Stack>
            <Stack>
              <Typography variant="h6">Event Description</Typography>
              <TextField
                className="bg-gray-100 p-4 rounded-xl "
                variant="outlined"
                name="eventDescription"
                defaultValue={editedEvent.eventDescription}
                onChange={handleInputChange}
                value={editedEvent.eventDescription}
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
                defaultValue={editedEvent.name}
                value={editedEvent.name}
                onChange={handleInputChange}
                name="name"
              />
            </Stack>
            <Stack>
              <Typography variant="h6">Talk Area</Typography>
              <TextField
                className="bg-gray-100 p-4 rounded-xl "
                variant="outlined"
                defaultValue={editedEvent.talkArea}
                value={editedEvent.talkArea}
                onChange={handleInputChange}
                name="talkArea"
              />
            </Stack>
            <Stack>
              <Typography variant="h6">Talk Abstract</Typography>
              <TextField
                className="bg-gray-100 p-4 rounded-xl "
                variant="outlined"
                defaultValue={editedEvent.talkAbstract}
                multiline
                value={editedEvent.talkAbstract}
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
  );
}

export default EditEventModal;
