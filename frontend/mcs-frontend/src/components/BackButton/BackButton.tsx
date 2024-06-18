import React, { FC } from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { yellow } from '@mui/material/colors';
import { Typography } from '@mui/material';

interface BackButtonProps {
  text: string;
}

export const BackButton: FC<BackButtonProps> = ({ text }) => {
  const navigate = useNavigate();
  return (
    <Button
      startIcon={<ArrowBackIcon sx={{ color: yellow[900] }} />}
      onClick={() => {
        navigate(-1);
      }}>
      <Typography sx={{ color: yellow[900] }}>{text}</Typography>
    </Button>
  );
}

