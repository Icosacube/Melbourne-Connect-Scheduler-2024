import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/en-au";
import React, { FC, useState } from "react";
import BottomSuccessSnackbar from "../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar";
import updateEvent from "../../../scripts/updateEvent";
import { MainEvent } from "../../../types/types";

interface EditEventModalProps {
  event: MainEvent;
  handleClose: () => void;
  open: boolean;
  setEvent: (event: any) => void;
}

export const EditEventModal: FC<EditEventModalProps> = ({
  event,
  handleClose,
  open,
  setEvent,
}) => {
  const [editedEvent, setEditedEvent] = useState(event);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    // Otherwise, update the edited event data
    setEditedEvent({ ...editedEvent, [name]: value });
  };
  const handleDate = (e: any) => {
    // datepicker already has it
    setEditedEvent({ ...editedEvent, Date: e });
  };
  const handleSave = () => {
    setEvent(editedEvent);
    updateEvent(editedEvent);
    setShowSuccess(false);
    handleClose();
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 0);
  };
  const speakers = [
    "Frances Haugen",
    "Alice Johnson",
    "Bob Smith",
    "Carol Williams",
    "Dave Brown",
    "Eve Davis",
    "Frank Miller",
    "Grace Wilson",
    "Heidi Moore",
    "Ivan Taylor",
    "Judy Anderson",
    "Kia Tan",
    "Brandon Wii",
    "Brendan Lee",
  ];

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-xl w-9/12">
          <Box className="w-full p-7 flex space-x-6">
            <Box className="w-1/2 space-y-4">
              <Box className="flex justify-between space-x-2">
                <Stack className="w-1/2">
                  <Typography variant="h6">Host</Typography>
                  <Box className="bg-gray-100 p-4 rounded-xl ">
                    <Select
                      fullWidth
                      defaultValue={editedEvent.Speaker}
                      value={editedEvent.Speaker}
                      onChange={handleInputChange}
                      name="speakers"
                      multiple
                    >
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
                      // variant="outlined"
                      defaultValue={editedEvent.Date}
                      value={editedEvent.Date}
                      name="date"
                      onChange={handleDate}
                      // adapterLocale="en-au"
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
                  defaultValue={editedEvent.Venue}
                  value={editedEvent.Venue}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack>
                <Typography variant="h6">Event Description</Typography>
                <TextField
                  className="bg-gray-100 p-4 rounded-xl "
                  variant="outlined"
                  name="description"
                  defaultValue={editedEvent.EventDescription}
                  onChange={handleInputChange}
                  value={editedEvent.EventDescription}
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
                  defaultValue={editedEvent.EventName}
                  value={editedEvent.EventName}
                  onChange={handleInputChange}
                  name="name"
                />
              </Stack>
              <Stack>
                <Typography variant="h6">Talk Abstract</Typography>
                <TextField
                  className="bg-gray-100 p-4 rounded-xl "
                  variant="outlined"
                  defaultValue={editedEvent.EventAbstract}
                  multiline
                  value={editedEvent.EventAbstract}
                  onChange={handleInputChange}
                  name="eventAbstract"
                />
              </Stack>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={handleSave}
            className="bg-primary text-white hover:bg-tertiary "
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* Snackbar for success message */}
      <BottomSuccessSnackbar
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        message="Event updated successfully"
      />
    </>
  );
};

export default EditEventModal;
