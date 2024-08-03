import { Alert, Button, MenuItem, Modal, Paper, Select, SelectChangeEvent, Slide, Snackbar, Grid, InputAdornment, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AccountCircle from '@mui/icons-material/AccountCircle';
import dayjs from 'dayjs';
import {Trip, Speaker, MainEvent} from "../../types/types";
import { getAllMainEvents } from '../../scripts/event/function';
import { getAllSpeakers } from '../../scripts/speaker/functions';
import { createTrip, defaultTrip,} from '../../scripts/trip/function';

interface CreateTripModalProps {
  handleClose: () => void;
  open: boolean;
}


export const CreateTripModal: React.FC<CreateTripModalProps> = ({ handleClose, open }) => {
  const [newTrip, setNewTrip] = useState<Trip>(defaultTrip);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [events, setEvents] = useState<MainEvent[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    if (open) {
      loadEvents();
      loadSpeakers();
    }
  }, [open]);


  const loadEvents = async () => {
    try {
      getAllMainEvents().then(events => {
        setEvents(events);
     })
    } catch (error) {
      console.error("Failed to load events", error);
    }
  };

  const loadSpeakers = async () => {
      try {
        getAllSpeakers().then(speakers => {
          setSpeakers(speakers == null ? [] : speakers);
       })
      } catch (error) {
        console.error("Failed to load speakers", error);
      }
    };


  const handleEventChange = (e: SelectChangeEvent<string[]>) => {
    const selectedIds = e.target.value as string[];
    const selectedEvents = events.filter(e => selectedIds.includes(e.RecordID));
    setSelectedEvents(selectedIds);
    setNewTrip({ ...newTrip, MainEvent: selectedIds });
  };

  const handleSpeakerChange = (e: SelectChangeEvent<string>) => {
    const selectedIds = e.target.value as string;
    const selectedSpeakers = speakers.filter(e => selectedIds.includes(e.RecordID));
    setSelectedSpeakers(selectedIds);
    setNewTrip({ ...newTrip, GuestSpeaker: [selectedIds] });
  };

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    setNewTrip({ ...newTrip, StartDate: date || undefined });
  };
  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    setNewTrip({ ...newTrip, EndDate: date || undefined });
  };


  const onClose = () => {
    setNewTrip(defaultTrip);
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
      setNewTrip(defaultTrip);

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
                      <MenuItem value={event.RecordID} key={event.RecordID}>{event.EventName}</MenuItem>
                    ))}
                  </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Speaker</Typography>
                  <Select
                    fullWidth
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
                      <MenuItem value={speaker.RecordID} key={speaker.RecordID}>{speaker.FirstName} {speaker.LastName}</MenuItem>
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