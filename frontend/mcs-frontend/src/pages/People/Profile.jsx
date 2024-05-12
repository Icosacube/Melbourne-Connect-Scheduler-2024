import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { BackButton, ProfileHeader } from "../../components";
import { useParams } from "react-router-dom";

function Profile() {
  const params = useParams();
  const tags = [
    "CEO",
    "Founder",
    "Speaker",
    "Mentor",
    "Investor",
    "Speaker " + params.id,
  ];
  return (
    <Container className="container flex space-x-6">
      <Box className="w-2/3  bg-gray-200">
        <BackButton text="Back" />
        <Box className="p-10">
          <ProfileHeader
            title="Mr"
            firstname="John"
            lastname="Steven"
            organisation="Stockton University"
            tags={tags}
          />
        </Box>
        <Box className="p-10">
          <Typography variant="h6">Bio</Typography>
          <Typography paragraph className="bg-gray-300 rounded p-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Box>
        <Box className="p-10">
          <Typography variant="h6">Personal Details</Typography>
          <Typography paragraph className="bg-gray-300 rounded p-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad
          </Typography>
        </Box>
      </Box>
      <Box className="w-1/3 flex space-x-6">
        <Divider orientation="vertical" flexItem />
        <Stack className="space-y-3">
          <Typography variant="h4">Bio</Typography>
          <Typography variant="h6">Personal Details</Typography>
          <Typography variant="h6">Organisation</Typography>
          <Typography variant="h6">Preferences</Typography>
          <Typography variant="h6">Traveler Info</Typography>
        </Stack>
      </Box>
    </Container>
  );
}

export default Profile;
