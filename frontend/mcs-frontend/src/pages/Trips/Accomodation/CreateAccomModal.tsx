import { Button, Grid, Modal, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar';
import { FormInputText } from '../../../components/FormComponents/FormInputText';
import { FormInputDate } from '../../../components/FormComponents/FormInputDate';
import { createAccommodation, defaultAccommodation } from '../../../scripts/accommodation/function';
import { Accommodation } from '../../../types/frontendTypes';

interface CreateAccomModalProps {
  handleClose: () => void;
  open: boolean;
}

export const CreateAccomModal: React.FC<CreateAccomModalProps> = ({
  handleClose,
  open,
}) => {
  const { handleSubmit, reset, control } = useForm<Accommodation>({
    defaultValues: defaultAccommodation,
  });

  const tripID = "recuUrK43y0D3b0ua"; // placeholder
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      // Any logic to run when modal opens
    }
  }, [open]);

  const onClose = () => {
    reset();
    handleClose();
  };

  const onSubmit = async (data: Accommodation) => {
    try {
      data.Trip = [tripID];
      // Placeholder funding account
      data.FundingAccount = ["recTAtMeRLOFmJAJ8"];
      console.log(data);
      const res = await createAccommodation(data);
      if (res) {
        setShowSuccess(true);
      } else {
        console.log('Failed to create accommodation');
      }
    } catch (error) {
      console.error(error);
    } finally {
      reset();
      onClose();
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 w-9/12">
          <Grid container spacing={3} className="w-full p-7 flex space-between justify-items">
            <Grid item xs={12}>
              <FormInputText name="HotelName" control={control} label="Hotel Name" />
            </Grid>
            <Grid item xs={12}>
              <FormInputText name="Address" control={control} label="Address" />
            </Grid>

            <Grid item xs={12} md={8} lg={4}>
              <FormInputText name="BookingReference" control={control} label="Booking Reference" />
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <FormInputText name="Room" control={control} label="Room" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormInputDate name="CheckIn" control={control} label="Check-In Date" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <FormInputDate name="CheckOut" control={control} label="Check-Out Date" />
            </Grid>
            <Grid item xs={12} md={9}>
              <FormInputText name="FundingAccount" control={control} label="Funding Account" />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormInputText name="Cost" control={control} label="Cost ($)" />
            </Grid>
            <Grid item xs={12}>
              <FormInputText name="Notes" control={control} label="Notes" />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                className="bg-primary text-white hover:bg-tertiary"
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
        message="Accommodation Created Successfully"
      />
    </>
  );
};
