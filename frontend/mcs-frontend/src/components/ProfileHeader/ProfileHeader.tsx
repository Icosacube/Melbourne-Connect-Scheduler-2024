import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

interface ProfileHeaderProps {
  title: string;
  firstName: string;
  lastName: string;
  organisation: string;
  role: string;
  faculty: string;
  pronouns: string;
  tags: string[];
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({
  title,
  firstName,
  lastName,
  organisation,
  role,
  faculty,
  pronouns,
  tags,
}) => {
  return (
    <Box className='flex justify-between text-accent place-items-center'>
      <Box className='w-5/12 flex space-x-4'>
        <Avatar className='size-40'></Avatar>
        <Stack className='justify-center space-y-3'>
          <Typography className='text-2xl'>{title}</Typography>
          <Typography className='text-4xl '>
            {firstName} {lastName}
          </Typography>
          <Typography className='text-lg '>{organisation}</Typography>
          <Typography className='text-lg'>{pronouns}</Typography>
        </Stack>
      </Box>

      <Box className='flex flex-wrap gap-3 w-5/12 font-semibold text-black'>
        <Box className='rounded-full shadow-lg p-3 bg-gray-200'>
          Language Assessment for Academic and Professional Purposes
        </Box>
        {tags.map((tag, index) => (
          <Box key={index} className='rounded-full shadow-lg p-3 bg-gray-200'>
            {tag}
          </Box>
        ))}

        <Box className='rounded-full shadow-lg p-3 bg-primary'>
          Language Assessment
        </Box>

        <Box className='rounded-full shadow-lg p-3 bg-tertiary'>
          Policy Evaluation
        </Box>
      </Box>
    </Box>
  );
};
