import { Button, Grid, Modal, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar';
import { FormInputTime } from '../../../components/FormComponents/FormInputTime';
import { FormInputText } from '../../../components/FormComponents/FormInputText';
import { DropdownOptions } from '../../../components/FormComponents/FormInputProps';
import { createFlight, defaultFlight } from '../../../scripts/flight/function';
import { Flight } from '../../../types/frontendTypes';


interface CreateFlightModalProps {
  handleClose: () => void;
  open: boolean;
}

export const CreateFlightModal: React.FC<CreateFlightModalProps> = ({
  handleClose,
  open,
}) => {
  const { handleSubmit, reset, control, setValue } = useForm<Flight>({
    defaultValues: defaultFlight,
  });

  const tripID = "recuUrK43y0D3b0ua"; // placeholder
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (open) {
    }
  }, [open]);

  const onClose = () => {
    reset();
    handleClose();
  };

  const onSubmit = async (data: Flight) => {
    try {
      data.Trip = [tripID];
      //placeholder
      data.FundingAccount = ["recTAtMeRLOFmJAJ8"];
      console.log(data);
      const res = await createFlight(data);
      if (res) {
        setShowSuccess(true);
      } else {
        console.log('Failed to create flight');
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
          <Grid
            container
            spacing={3}
            className="w-full p-7 flex space-between justify-items"
          >
            <Grid item xs={12} md={6} lg={3}>
              <FormInputText name="Airline" control={control} label="Airline" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormInputText name="FlightNumber" control={control} label="Flight Number" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <FormInputText name="FundingAccount" control={control} label="Funding Account" />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <FormInputText name="Cost" control={control} label="Price" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormInputText name="DepartureFrom" control={control} label="Departure City" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormInputTime
                name="DepartDate"
                control={control}
                label="Departure Time"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormInputText name="ArrivedTo" control={control} label="Arrival City" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormInputTime
                name="ArriveDate"
                control={control}
                label="Arrival Time"
              />
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
        message="Flight Created Successfully"
      />
    </>
  );
};
