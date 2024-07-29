import { Alert, Button, MenuItem, Modal, Paper, Select, SelectChangeEvent, Slide, Snackbar, Grid, InputAdornment, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import createTrip from '../../scripts/createTrip';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AccountCircle from '@mui/icons-material/AccountCircle';
import dayjs from 'dayjs';
import {Trip, Event} from "../../types/types";

interface CreateTripModalProps {
  handleClose: () => void;
  open: boolean;
}

// placeholder
type Speaker = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const CreateTripModal: React.FC<CreateTripModalProps> = ({ handleClose, open }) => {
  const [newTrip, setNewTrip] = useState<Trip>({
    MainEvent: [],
    GuestSpeaker: []
    // ADD MORE FIELDS
  });
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    if (open) {
      loadEvents();
    }
  }, [open]);

  // temporary solution
  const loadEvents = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/events'); 
      const events = res.data;
      setEvents(events);
      setSpeakers(events.speakers == null ? [] : events.speakers);
      console.log(events);
    } catch (error) {
      console.error("Failed to load events", error);
    }
  };


  const handleEventChange = (event: SelectChangeEvent<string[]>) => {
    const selectedIds = event.target.value as string[];
    const selectedEvents = events.filter(e => selectedIds.includes(e.id));
    setSelectedEvents(selectedIds);
    setNewTrip({ ...newTrip, MainEvent: selectedIds });
  };

  const handleSpeakerChange = (event: SelectChangeEvent<string[]>) => {
    const selectedIds = event.target.value as string[];
    const selectedSpeakers = speakers.filter(speaker => selectedIds.includes(speaker.id));
    setSelectedSpeakers(selectedIds);
    setNewTrip({ ...newTrip, GuestSpeaker: selectedIds });
  };

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    setNewTrip({ ...newTrip, StartDate: date || undefined });
  };
  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    setNewTrip({ ...newTrip, EndDate: date || undefined });
  };

  const onClose = () => {
    setNewTrip({
      MainEvent: [],
      GuestSpeaker: [],
      // ADD MORE FIELDS
    });
    handleClose();
  }

  const handleSave = async () => {
    setShowSuccess(false);
    handleClose();
    console.log(newTrip);

    const res = await createTrip(newTrip);

    if (res) {
      // handle success
      console.log(res);
      // reset useState variables
      setNewTrip({
        MainEvent: [],
        GuestSpeaker: []
      });

      // display success message
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      }, 0);

    } else {
      // handle failure
      console.log("error");
    }
  };

  /*const events: Event[] = 
  [
    {
      id: 'recjrkkDyd9iLafZi',
      title: 'Uncovering Truths and Threats: Social Media and AI Safety with Meta Whistleblower Frances Haugen',
      date: '2024-04-10',
    },
  ];

  const speakers: Speaker[] = [
    {
      id: 'rec84tlMiSb0NPfgQ',
      first_name: 'Belinda',
      last_name: 'Chen',
      email: 'belinda@email.com'
    },
    {
      id: 'reclU2YPWmZwKE8Hd',
      first_name: 'Bernard',
      last_name: 'asper',
      email: 'bernard@email.com'
    },
  ];
  */

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 w-9/12">
          <Grid container spacing={3} className="w-full p-7 flex space-between justify-items">
              <Grid item xs={12}>
                <Typography variant="h6">Event</Typography>
                <Select
                    fullWidth
                    multiple
                    value={selectedEvents}
                    onChange={handleEventChange}
                    name="event">
                    {events.map((event) => (
                      <MenuItem value={event.id} key={event.id}>{event.name}</MenuItem>
                    ))}
                  </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Speaker</Typography>
                  <Select
                    fullWidth
                    multiple
                    value={selectedSpeakers}
                    onChange={handleSpeakerChange}
                    name="speaker"
                    startAdornment = {
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                      }
                    >
                    {speakers.map((speaker) => (
                      <MenuItem value={speaker.id} key={speaker.id}>{speaker.first_name} {speaker.last_name}</MenuItem>
                    ))}
                  </Select>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">Starting Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    defaultValue={newTrip.StartDate}
                    value={newTrip.StartDate}
                    onChange={handleStartDateChange}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">End Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    defaultValue={newTrip.EndDate}
                    value={newTrip.EndDate}
                    onChange={handleEndDateChange}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  className="bg-primary text-white hover:bg-tertiary ">
                  Save
                </Button>
              </Grid>
          </Grid>
          
        </Paper>
      </Modal>
      <Snackbar
        open={showSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}>
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Trip created successfully!
        </Alert>
      </Snackbar>
    </>
  );
}