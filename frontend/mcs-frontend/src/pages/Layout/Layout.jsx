import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TopNavBar } from "../../components";

function Layout() {
  return (
    <>
      <TopNavBar />
      <Box className=" flex items-center justify-center mt-10">
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
