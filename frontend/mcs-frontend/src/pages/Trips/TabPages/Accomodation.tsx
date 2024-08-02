import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { AddAccommodationModal } from '../Accomodation/AddAccommodationModal';

function Accomodation() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant='contained' onClick={handleOpen}>
        Add Accommodation
      </Button>
      <AddAccommodationModal open={open} handleClose={handleClose} />
    </>
  );
}

export default Accomodation;
