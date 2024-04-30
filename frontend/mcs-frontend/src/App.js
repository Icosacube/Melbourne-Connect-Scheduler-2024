import { Box, Typography } from "@mui/material";
import BackButton from "./components/BackButton";
import EventTitle from "./components/EventTitle";
import ProfileHeader from "./components/ProfileHeader";
import SideNavBar from "./components/SideNavBar";
import SpeakerTitle from "./components/SpeakerTitle";
import NavBar from "./components/TopNavBar";
import ProfileCard from "./components/ProfileCard";
import SpeakerTag from "./components/SpeakerTag";

function App() {
  const tags = ["CEO", "Justice", "Dark Knight", "Vigilante", "Billionaire"];
  return (
    <>
      <NavBar />
      <SideNavBar />
      <Box className="flex flex-wrap justify-center items-center h-screen space-x-6">
        <BackButton text="Back" />
        <EventTitle
          eventName="Birthday Party"
          dateTime="30/04/2024 16:20"
          guestName="Bruce Wayne"
        />

        <SpeakerTitle firstname="Bruce" lastname="Wayne">
          <Typography>CEO of Wayne Enterprises</Typography>
          <Typography>Hammer of Justice</Typography>
          <Typography>Dark Knight</Typography>
        </SpeakerTitle>

        <ProfileHeader
          title="Mr"
          firstname="Bruce"
          lastname="Wayne"
          organisation="Wayne Enterprise"
          tags={tags}
        />

        <ProfileCard firstname="Bruce" lastname="Wayne" roletag="CEO" />
        <SpeakerTag name="Bruce" />
      </Box>
    </>
  );
}

export default App;
