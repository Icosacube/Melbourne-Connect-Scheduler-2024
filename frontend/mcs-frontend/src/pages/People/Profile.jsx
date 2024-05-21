import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProfileHeader } from '../../components';

function Profile() {
  const params = useParams();
  const email = 'evebrown@gmail.com';
  const phone = '1234567890';
  const tags = ['Applied Linguistics', 'Validation', 'Second Language Writing'];
  const role = 'Professor in Language Testing';
  const faculty = 'Languages and Linguistics';
  const firstname = 'Frances';
  const lastname = 'Haugen';
  const title = 'Prof';
  const organisation = 'Stockton University';
  const bio = `Frances Haugen holds a degree in Electrical and Computer Engineering from Olin College and an MBA from Harvard University. With expertise in algorithmic product management, she has contributed to ranking algorithms at Google. Pinterest, Yelp, and Facebook. At Facebook, she served as the lead Product Manager on the Civic Misinformation team. addressing democracy and misinformation issues, and later expanded her focus to counter-espionage. 
  During her tenure at Facebook, Frances became increasingly concemed about the company's prioritisation of profits over public safety, endangering lives. Taking a significant personal risk, Frances bravely blew the whistle on Facebook, which led to "The Facebook Files', exposé by the Wall Street Joumal. 
  Since her revelations. Frances has testified before 10+ legislatures around the world. including the US Congress, UK and EU Parliaments, the French Senate and National Assembly, and has engaged with lawmakers worldwide to address the adverse impacts of social media platforms. 
  `;
  const divisions = 'Arts';
  function handleMailing() {
    window.location.href = `mailto"${email}"`;
  }
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
            {bio}
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
          <Link
            to="#"
            onClick={(e) => {
              window.location.href = 'mailto:examplemail@example.com?body=this is the body';
              e.preventDefault();
            }}>
            send canvassing, send invitation
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
