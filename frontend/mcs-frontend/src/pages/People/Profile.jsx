import { Box, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ProfileHeader } from '../../components';

function Profile() {
  const params = useParams();
  const email = 'evebrown@gmail.com';
  const phone = '1234567890';
  const tags = ['Applied Linguistics', 'Validation', 'Second Language Writing'];
  const role = 'Professor in Language Testing';
  const faculty = 'Languages and Linguistics';
  const firstname = 'Eve';
  const lastname = 'Brown';
  const title = 'Prof';
  const organisation = 'Stockton University';
  const bio =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const divisions = 'Arts';
  return (
    <Box className=" flex space-x-6">
      <Box className="w-9/12  ">
        {/* <BackButton text="Back" /> */}
        <Box className="p-10">
          <ProfileHeader
            title={title}
            firstname={firstname}
            lastname={lastname}
            organisation={organisation}
            role={role}
            faculty={faculty}
            tags={tags}
          />
        </Box>
        <Box className="p-10 bg-white shadow-lg rounded-xl">
          <Typography variant="h6">Bio</Typography>
          <Typography paragraph className="bg-gray-200 rounded-xl p-5 mt-4">
            {bio} {bio} {bio}
          </Typography>
        </Box>
      </Box>
      <Box className="w-3/12 flex space-x-6 h-fit">
        <Box className="bg-white shadow-lg p-7 rounded-xl w-full">
          <Typography variant="h4">Contact</Typography>
          <Box className="flex space-x-4 mt-3">
            <Typography variant="h6">Email: </Typography>
            <Typography variant="h6" className="font-semibold">
              {email}
            </Typography>
          </Box>
          <Box className="flex space-x-4 mt-3">
            <Typography variant="h6">Phone: </Typography>
            <Typography variant="h6" className="font-semibold">
              {phone}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
