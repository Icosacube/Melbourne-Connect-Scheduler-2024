import { Box } from "@mui/material";
import BackButton from "./components/BackButton";
import NavBar from "./components/TopNavBar";
import SideNavBar from "./components/SideNavBar";

function App() {
  return (
    <>
      <NavBar />
      <SideNavBar />
      <Box className="flex justify-center items-center h-screen">
        <BackButton text="Back" />
      </Box>
    </>
  );
}

export default App;
