import { Alert, Box, Button, MenuItem, Modal, Paper, Select, SelectChangeEvent, Slide, Snackbar, Grid, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

interface CreateTripModalProps {
  handleClose: () => void;
  open: boolean;
}

type Trip = {
  id: string;
  event?: string;
  speaker?: string;
  startDate?: dayjs.Dayjs;
  //add more
}

type Speaker = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

type Event = {
    id: string;
    title: string;
    date: string;
    //add more...
}

export const CreateTripModal: React.FC<CreateTripModalProps> = ({ handleClose, open }) => {
  const [newTrip, setNewTrip] = useState<Trip>({
    id: uuidv4(),
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEventChange = (event: SelectChangeEvent<string>) => {
    const selectedEventId = event.target.value as string;
    setNewTrip({ ...newTrip, event: selectedEventId });
  };

  const handleSpeakerChange = (event: SelectChangeEvent<string>) => {
    const selectedSpeakerId = event.target.value as string;
    setNewTrip({ ...newTrip, speaker: selectedSpeakerId });
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setNewTrip({ ...newTrip, startDate: date || undefined });
  };

  const onClose = () => {
    setNewTrip({
      id: uuidv4(),
      // ADD MORE FIELDS
    });
    handleClose();
  }

  const handleSave = async () => {
    setShowSuccess(false);
    handleClose();
    console.log(newTrip);

    const res = true; // await createTrip(newTrip);

    if (res) {
      // handle success
      // reset useState variables
      setNewTrip({
        id: uuidv4(),
        // ADD MORE FIELDS
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
    }
  };

  const events: Event[] = [
    {
      id: '1',
      title: 'The Rise of AI',
      date: '2024-04-10',
    },
    {
      id: '2',
      title: 'Is ChatGPT Evil',
      date: '2024-04-22',
    },
    {
      id: '3',
      title: 'The Future of Robotics',
      date: '2024-04-30',
    }
  ];

  const speakers: Speaker[] = [
    {
      id: '1',
      first_name: 'John',
      last_name: 'Jones',
      email: 'john.jones@example.com'
    },
    {
      id: '2',
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com'
    },
  ];

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
                    value={newTrip.speaker || ''}
                    onChange={handleEventChange}
                    name="event">
                    {events.map((event) => (
                      <MenuItem value={event.id} key={event.id}>{event.title}</MenuItem>
                    ))}
                  </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Speaker</Typography>
                  <Select
                    fullWidth
                    value={newTrip.speaker || ''}
                    onChange={handleSpeakerChange}
                    name="speaker">
                    {speakers.map((speaker) => (
                      <MenuItem value={speaker.id} key={speaker.id}>{speaker.first_name} {speaker.last_name}</MenuItem>
                    ))}
                  </Select>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">Starting Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={newTrip.startDate}
                    value={newTrip.startDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={handleSave}
            className="bg-primary text-white hover:bg-tertiary ">
            Save
          </Button>
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