import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TopNavBar } from "../../components";

function Layout() {
  return (
    <>
      <TopNavBar />
      <Box className=" flex items-center justify-center mt-10">
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </>
  );
}

export default Layout;
