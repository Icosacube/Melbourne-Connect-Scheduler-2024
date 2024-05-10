
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TopNavBar } from "../../components";

function Layout() {
  return (
    <>
      <TopNavBar />
      <Box className="h-screen flex items-center justify-center space-x-10">
        <Outlet />        
      </Box>
    </>
  );
}

export default Layout;
