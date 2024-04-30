import { Box } from "@mui/material";
import BackButton from "./components/BackButton";
import NavBar from "./components/TopNavBar";
import SideNavBar from "./components/SideNavBar";
import EventTitle from "./components/EventTitle";

function App() {
  return (
    <>
      <NavBar />
      <SideNavBar />
      <Box className="flex justify-center items-center h-screen">
        <BackButton text="Back" />
        <EventTitle
          eventName="Event Title"
          dateTime="30/04/2024 16:20"
          guestName="Guest Name"
        />
      </Box>
    </>
  );
}

export default App;
