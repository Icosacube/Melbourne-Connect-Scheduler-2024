import { Box, Button, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { ProfileHeader } from '../../components';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { Speaker } from '../../types/frontendTypes';

export const Profile: FC = () => {
  const speaker = useLoaderData() as Speaker;
  console.log(speaker);
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

  // email variables and stuff
  const professorName = 'Ellen Xhaka';
  const recipientName = 'Frances Haugen';
  const topic = 'Discussing AI Safety';
  const availableTimes = [
    'Monday, June 6th, 10:00 AM',
    'Wednesday, June 8th, 2:00 PM',
    'Friday, June 10th, 11:00 AM',
    'Tuesday, June 14th, 3:00 PM',
  ];
  const contactInformation =
    'Email: frances@example.com | Phone: +1 (123) 456-7890';

  const emailSubject = `Meeting Availability for ${professorName}`;
  const emailBody = `Dear ${recipientName},

I hope this email finds you well. I am reaching out to discuss the possibility of scheduling a meeting to discuss ${topic}.

I am available for a meeting at the following times:

- ${availableTimes[0]}
- ${availableTimes[1]}
- ${availableTimes[2]}
- ${availableTimes[3]}

Please let me know which of these options works best for you, or if you have any alternative times in mind. Additionally, feel free to suggest a preferred meeting platform (e.g., Zoom, Microsoft Teams) or location if an in-person meeting is possible.

I look forward to hearing from you and finding a mutually convenient time to meet.

Best regards,
Professor ${professorName}
${contactInformation}`;
  const mailtoLink = `mailto:fhughes@stockton.edu.au?subject=${encodeURIComponent(
    emailSubject,
  )}&body=${encodeURIComponent(emailBody)}`;
  return (
    <Box className=' flex space-x-6'>
      <Box className='w-9/12  '>
        {/* <BackButton text="Back" /> */}
        <Box className='p-10'>
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
        <Box className='p-10 bg-white shadow-lg rounded-xl'>
          <Typography variant='h6'>Bio</Typography>
          <Typography paragraph className='bg-gray-100 rounded-xl p-5 mt-4'>
            {bio}
          </Typography>
        </Box>
      </Box>
      <Box className='w-3/12  flex-col space-y-5 h-fit'>
        <Box className='bg-white shadow-lg p-7 rounded-xl w-full'>
          <Typography variant='h4'>Contact</Typography>
          <Box className='flex space-x-4 mt-3'>
            <Typography variant='h6'>Email: </Typography>
            <Typography variant='h6' className='font-semibold'>
              {email}
            </Typography>
          </Box>
          <Box className='flex space-x-4 mt-3'>
            <Typography variant='h6'>Phone: </Typography>
            <Typography variant='h6' className='font-semibold'>
              {phone}
            </Typography>
          </Box>
        </Box>

        <Button
          startIcon={<ForwardToInboxIcon />}
          variant='contained'
          onClick={(e) => {
            window.location.href = mailtoLink;
            e.preventDefault();
          }}
          // sx={{ textTransform: 'none' }}
          className='p-6 text-lowercase bg-primary normal-case  hover:bg-secondary text-black '
        >
          <Typography className=' font-bold'>
            Availability Canvassing
          </Typography>
        </Button>

        {/* <Box className="bg-white shadow-lg p-7 rounded-xl w-full">
          <Typography variant="h4">Correspondance</Typography>
        </Box> */}
      </Box>
    </Box>
  );
};
