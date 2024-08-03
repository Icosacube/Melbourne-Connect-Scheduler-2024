import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar';
import { FormInputDate } from '../../../components/FormComponents/FormInputDate';
import { FormInputMultiSelect } from '../../../components/FormComponents/FormInputDropdown';
import { FormInputText } from '../../../components/FormComponents/FormInputText';
import {
  createAccommodation,
  defaultAccommodation,
} from '../../../scripts/accommodation/function';
import { Accommodation, Speaker, Trip } from '../../../types/frontendTypes';
import { DropdownOptions } from '../../../components/FormComponents/FormInputProps';
import { getAllTrips } from '../../../scripts/trip/function';
import { getAllSpeakers } from '../../../scripts/speaker/functions';

interface CreateAccommodationModalProps {
  handleClose: () => void;
  open: boolean;
}

const speakers = [
  {
    label: 'Speaker 1',
    value: '1',
  },
  {
    label: 'Speaker 2',
    value: '2',
  },
];

const trips = [
  {
    label: 'Trip 1',
    value: '1',
  },
  {
    label: 'Trip 2',
    value: '2',
  },
];

export const CreateAccommodationModal: React.FC<
  CreateAccommodationModalProps
> = ({ handleClose, open }) => {
  const { handleSubmit, reset, control, setValue } = useForm<Accommodation>({
    defaultValues: defaultAccommodation,
  });
  const [tripOptions, setTripOptions] = useState<DropdownOptions[]>([]);
  const [speakerOptions, setSpeakerOptions] = useState<DropdownOptions[]>([]);

  // Dropdown data fetching
  useEffect(() => {
    if (open) {
      loadTrips();
      loadSpeakers();
    }
  }, [open]);

  const loadTrips = async () => {
    const trips = await getAllTrips();
    console.log(trips);
    const tripOptions = trips.map((trip: Trip) => ({
      label: trip.EndDate.toString(),
      value: trip.EndDate.toString(),
    }));
    setTripOptions(tripOptions);
  };

  const loadSpeakers = async () => {
    const speakers = await getAllSpeakers();
    console.log(speakers);
    const speakerOptions = speakers.map((speaker: Speaker) => ({
      label: speaker.FirstName + ' ' + speaker.LastName,
      value: speaker.RecordID,
    }));
    setSpeakerOptions(speakerOptions);
  };

  // Form functions
  const onSubmit = async (data: Accommodation) => {
    const res = await createAccommodation(data);
    console.log(res);
    setShowSuccess(true);
    reset();
    handleClose();
    console.log(data);
  };
  const onClose = () => {
    handleClose();
    reset();
  };

  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-xl w-9/12'>
          <Typography variant='h5' className='mb-4'>
            Add Accommodation
          </Typography>
          {/* Left */}
          <Box className='flex space-x-10 mb-4'>
            <Box className='space-y-4'>
              <FormInputText
                name='BookingReference'
                control={control}
                label='Booking Reference'
              />
              <FormInputText
                name='HotelName'
                control={control}
                label='Hotel Name'
              />
              <FormInputText name='Address' control={control} label='Address' />
              <FormInputText name='Room' control={control} label='Room' />
              <FormInputMultiSelect
                name='speaker'
                control={control}
                label='Speaker'
                options={speakerOptions}
              />
            </Box>
            {/* Right */}
            <Box className='space-y-4'>
              <Box className='space-x-2'>
                <FormInputDate
                  name='CheckIn'
                  control={control}
                  label='Check In'
                />
                <FormInputDate
                  name='CheckOut'
                  control={control}
                  label='Check Out'
                />
              </Box>
              <FormInputText name='Cost' control={control} label='Cost' />
              <FormInputText name='Notes' control={control} label='Notes' />
              <FormInputText
                name='FundingAccount'
                control={control}
                label='Funding Account'
              />
              <FormInputMultiSelect
                name='Trip'
                control={control}
                label='Trip'
                options={tripOptions}
              />
            </Box>
          </Box>
          <Box className='space-x-4'>
            <Button onClick={handleSubmit(onSubmit)} variant={'contained'}>
              Submit
            </Button>
            <Button onClick={() => reset()} variant={'outlined'}>
              Reset
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar for success message after event creation */}
      <BottomSuccessSnackbar
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        message='Accommodation Added Successfully'
      />
    </>
  );
};
