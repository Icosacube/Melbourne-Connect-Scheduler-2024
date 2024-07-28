import {
  Alert,
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import createEvent from "../../../scripts/createEvent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

interface CreateEventModalProps {
  handleClose: () => void;
  open: boolean;
}

// These are here because there were some import errors

type Event = {
  id: string;
  name?: string;
  date?: dayjs.Dayjs;
  venue?: Venue[];
  speakers?: Speaker[];
  description?: string;
  abstract?: string;
  status: EventStatus;
  catering?: Cater;
};

type Speaker = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

type Venue = {
  id: number;
  name: string;
  location: string;
  capacity: number;
};

enum EventStatus {
  Preparation = "Preparation",
  Implementation = "Implementation",
  Ongoing = "Ongoing",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

type Cater = {
  id: number;
  name: string;
};

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  handleClose,
  open,
}) => {
  const [newEvent, setNewEvent] = useState<Event>({
    id: uuidv4(),
    status: EventStatus.Preparation,
    venue: [],
    speakers: [],
  });
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSpeakerChange = (event: SelectChangeEvent<string[]>) => {
    const selectedIds = event.target.value as string[];
    const selectedSpeakers = speakers.filter((speaker) =>
      selectedIds.includes(speaker.id)
    );
    setSelectedSpeakers(selectedIds);
    setNewEvent({ ...newEvent, speakers: selectedSpeakers });
  };

  const handleDate = (e: any) => {
    // datepicker already has it
    setNewEvent({ ...newEvent, date: e });
  };

  const onClose = () => {
    // reset useState variables
    setNewEvent({
      id: uuidv4(),
      status: EventStatus.Preparation,
      venue: [],
      speakers: [],
    });
    setSelectedSpeakers([]);
    // close modal
    handleClose();
  };
  const handleSave = async () => {
    setShowSuccess(false);
    handleClose();
    console.log(newEvent);
    var res = await createEvent(newEvent);
    if (res) {
      // handle success
      // reset useState variables
      setNewEvent({
        id: uuidv4(),
        status: EventStatus.Preparation,
        venue: [],
        speakers: [],
      });
      setSelectedSpeakers([]);

      // display success message
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
  const speakers: Speaker[] = [
    {
      id: "1",
      first_name: "John",
      last_name: "Jones",
      email: "john.jones@example.com",
    },
    {
      id: "2",
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
    },
    {
      id: "3",
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice.johnson@example.com",
    },
    {
      id: "4",
      first_name: "Bob",
      last_name: "Williams",
      email: "bob.williams@example.com",
    },
    {
      id: "5",
      first_name: "Eve",
      last_name: "Brown",
      email: "eve.brown@example.com",
    },
  ];

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-xl w-9/12">
          <Box className="w-full p-7 flex space-x-6">
            <Box className="w-1/2 space-y-4">
              <Box className="flex justify-between space-x-2">
                <Stack className="w-1/2">
                  <Typography variant="h6">Speakers</Typography>
                  <Box className="bg-gray-100 p-4 rounded-xl ">
                    <Select
                      fullWidth
                      value={selectedSpeakers}
                      onChange={handleSpeakerChange}
                      name="speakers"
                      multiple
                    >
                      {speakers.map((speaker) => (
                        <MenuItem value={speaker.id} key={speaker.id}>
                          {speaker.first_name} {speaker.last_name}
                        </MenuItem>
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
                      defaultValue={newEvent.date}
                      value={newEvent.date}
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
                  defaultValue={newEvent.description}
                  onChange={handleInputChange}
                  value={newEvent.description}
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
                  defaultValue={newEvent.abstract}
                  multiline
                  value={newEvent.abstract}
                  onChange={handleInputChange}
                  name="talkAbstract"
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

      {/* Snackbar for success message after event creation */}
      <Snackbar
        open={showSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Event updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};
