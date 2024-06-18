import { Avatar, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

interface SpeakerTagProps {
  name: string;
}

export const SpeakerTag: FC<SpeakerTagProps> = ({ name }) => {
  return (
    <Stack direction="row" className="p-8 space-x-4 place-items-center text-black bg-primary">
      <Avatar className="size-20 bg-gray-500">A</Avatar>
      <Typography className="text-2xl">{name}</Typography>
      <Typography className="text-2xl ">XXXX</Typography>
    </Stack>
  );
}
