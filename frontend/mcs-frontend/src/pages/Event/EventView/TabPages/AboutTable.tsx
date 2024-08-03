import { Box, Stack, TextField, Typography } from '@mui/material';
import React, { FC } from 'react';
import { MainEvent } from '../../../../types/frontendTypes';

interface AboutTableProps {
  event: MainEvent;
}

interface CustomTextAreaProps {
  title: string;
  text: string;
  minRows?: number;
}

const CustomTextArea: FC<CustomTextAreaProps> = ({ title, text, minRows }) => {
  return (
    <Stack>
      <Typography variant='subtitle1' className='text-gray-400'>
        {title}
      </Typography>
      <TextField
        disabled
        minRows={minRows}
        multiline
        defaultValue={text}
        sx={{
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#000000',
          },
        }}
      />
    </Stack>
  );
};

export const AboutTable: FC<AboutTableProps> = ({ event }) => {
  return (
    <Box className='w-full flex space-x-6'>
      <Box className='w-1/2 space-y-4'>
        <CustomTextArea title='Venue' text={'Melbourne Connect'} minRows={1} />
        <CustomTextArea
          title='Event Description'
          text={event.EventDescription}
          minRows={5}
        />
      </Box>
      <Box className='w-1/2 space-y-4'>
        <CustomTextArea
          title='Talk Abstract'
          text={event.EventAbstract}
          minRows={10}
        />
      </Box>
    </Box>
  );
};

export default AboutTable;
