import { Box, Divider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TopNavBar } from "../../components";

function Layout() {
  return (
    <>
      <TopNavBar />
      <Divider />
      <Box className="container m-auto mt-12 ">
        <Outlet className="mt-6 " />
      </Box>
      {/* Temporary navigation */}
      {/* <Box>
          <Link to="/dashboard">Dashboard</Link>
          <Divider />
          <Link to="/event">Event</Link>
          <Divider />
          <Link to="/speaker">Speaker</Link>
          <Divider />
          <Link to="/login">Login</Link>
          <Divider />
          <Link to="/components">Components</Link>
        </Box> */}
    </>
  );
}

export default Layout;
