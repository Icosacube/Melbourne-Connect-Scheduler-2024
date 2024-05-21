import { Box } from '@mui/material';
import React, { useState } from 'react';
import EventTopNavBar from '../../components/TopNavBar/EventTopNavBar';
import EditEventModal from './EditEventModal';
import About from './TabPages/About';
import Participants from './TabPages/Participants';
import Programme from './TabPages/Programme';
import Services from './TabPages/Services';

function Event() {
  const [tabName, setTabName] = useState('About');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [event, setEvent] = useState({
    name: 'Social Media and AI Safety with Meta Whistleblower Frances Haugen',
    date: '05/07/2024',
    time: '15:30',
    host: 'Frances Haugen',
    category: 'Symposium',
    talkArea:
      'AI Safety, Social Media, Ethics in Technology, Whistleblowing, Tech Accountability, Public Safety',
    venue: 'Melbourne Connect, TheForum (Level M)',
    talkAbstract:
      "In 2024, global AI threats have become a major concern, altering the technology landscape. With nearly half the world gearing up for elections, the rise of persuasive AI avatars on ill-prepared social platforms has transformed how at what scale information warfare is waged. At this AI at Melbourne Colloquium, join Frances Haugen, known for her whistleblowing actions against Meta (formerly Facebook), as she unpacks recently revealed documents from Meta obtained through legal actions by 44 US states and territories. She will connect how the company’s lack of transparency concerning AI safety issues on its platforms around children can also shine a light on what we may face as elections unfold this year, and what solutions are available. In this talk, discover the implications of corporate opacity in today's emerging intangible economy.",
    eventDescription:
      "Countries worldwide are responding to the issues underlying Meta's historic lawsuit by introducing legislation. Learn how principles from the EU's Digital Services Act, the UK Online Safety Bill, and the new Canadian Online Harms Bill can bolster social media resilience against AI threats while preserving freedom of speech, and the ways Australia can contribute to this movement, shaping novel technologies in alignment with public interests. This event is a part of the AI at Melbourne Colloquium series and is presented in partnership with The University of Melbourne’s School of Computing and Information (CIS), Centre for Artificial Intelligence and Digital Ethics (CAIDE), Melbourne Connect and the Australian Information Security Association (AISA). Frances Haugen will deliver a keynote at AISA's Australian Cybersecurity Conference from 25–27 March in Canberra, where she will engage with key government policymakers."
  });

  const renderTabContent = (event) => {
    switch (tabName) {
      case 'About':
        return <About event={event} />;
      case 'Participants':
        return <Participants />;
      case 'Programme':
        return <Programme />;
      case 'Services':
        return <Services />;
      default:
        return <About />;
    }
  };

  return (
    <Box>
      <EventTopNavBar getCurTab={setTabName} openEditModal={handleOpen} />
      <EditEventModal event={event} open={open} handleClose={handleClose} setEvent={setEvent} />
      {renderTabContent(event)}
    </Box>
  );
}

export default Event;
