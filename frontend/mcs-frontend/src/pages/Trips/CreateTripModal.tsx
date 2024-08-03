import { Button, Grid, Modal, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BottomSuccessSnackbar from '../../components/BottomSuccessSnackbar/BottomSuccessSnackbar';
import { FormInputDate } from '../../components/FormComponents/FormInputDate';
import { FormInputMultiSelect } from '../../components/FormComponents/FormInputDropdown';
import { DropdownOptions } from '../../components/FormComponents/FormInputProps';
import { getAllMainEvents } from '../../scripts/event/function';
import { getAllSpeakers } from '../../scripts/speaker/functions';
import { createTrip, defaultTrip } from '../../scripts/trip/function';
import { MainEvent, Speaker, Trip } from '../../types/frontendTypes';

interface CreateTripModalProps {
  handleClose: () => void;
  open: boolean;
}

export const CreateTripModal: React.FC<CreateTripModalProps> = ({
  handleClose,
  open,
}) => {
  const { handleSubmit, reset, control, setValue } = useForm<Trip>({
    defaultValues: defaultTrip,
  });

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
      getAllMainEvents().then((events) => {
        setEvents(events);
      });
    } catch (error) {
      console.error('Failed to load events', error);
    }
  };

  const loadSpeakers = async () => {
    try {
      getAllSpeakers().then((speakers) => {
        setSpeakers(speakers == null ? [] : speakers);
      });
    } catch (error) {
      console.error('Failed to load speakers', error);
    }
  };

  const onClose = () => {
    reset();
    handleClose();
  };

  const onSubmit = async (data: Trip) => {
    try {
      const res = await createTrip(data);
      if (res) {
        setShowSuccess(true);
      } else {
        console.log('Failed to create trip');
      }
    } catch (error) {
      console.error(error);
    } finally {
      reset();
      onClose();
    }
  };

  const reformatEventForDropdown = (events: MainEvent[]): DropdownOptions[] => {
    return events.map((event) => ({
      label: event.EventName,
      value: event.RecordID,
    }));
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Paper className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 w-9/12'>
          <Grid
            container
            spacing={3}
            className='w-full p-7 flex space-between justify-items'
          >
            <Grid item xs={12}>
              <Typography variant='h6'>Event</Typography>
              <FormInputMultiSelect
                name='MainEvent'
                control={control}
                label='Event'
                options={reformatEventForDropdown(events)}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6'>Speaker</Typography>
              <FormInputMultiSelect
                name='GuestSpeaker'
                control={control}
                label='Speaker'
                options={speakers.map((speaker) => ({
                  label: `${speaker.FirstName} ${speaker.LastName}`,
                  value: speaker.RecordID,
                }))}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6'>Starting Date</Typography>
              <FormInputDate
                name='StartDate'
                control={control}
                label='Start Date'
              />
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6'>End Date</Typography>
              <FormInputDate
                name='EndDate'
                control={control}
                label='End Date'
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                onClick={handleSubmit(onSubmit)}
                className='bg-primary text-white hover:bg-tertiary '
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <BottomSuccessSnackbar
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        message='Trip Created Successfully'
      />
    </>
  );
};
