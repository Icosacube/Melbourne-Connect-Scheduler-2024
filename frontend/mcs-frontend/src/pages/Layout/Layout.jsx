import { Box, Divider } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { TopNavBar } from "../../components";

function Layout() {
  return (
    <>
      <TopNavBar />
      <Box className="h-screen flex items-center justify-center space-x-10">
        <Outlet />
        {/* Temporary navigation */}
        <Box>
          <Link to="/dashboard">Dashboard</Link>
          <Divider />
          <Link to="/event">Event</Link>
          <Divider />
          <Link to="/speaker">Speaker</Link>
          <Divider />
          <Link to="/login">Login</Link>
          <Divider />
          <Link to="/components">Components</Link>
        </Box>
      </Box>
    </>
  );
}

export default Layout;
