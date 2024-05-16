import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function BackButton({ text }) {
  const navigate = useNavigate();
  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => {
        navigate(-1);
      }}>
      {text}
    </Button>
  );
}

export default BackButton;
