import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { SideNavBar, TopNavBar } from '../../components';

function Layout() {
  return (
    <>
      <Box
        className="bg-backGround flex h-screen
      ">
        <SideNavBar />
        <Box className=" w-full">
          <TopNavBar />
          <Box className=" flex items-center justify-center mt-10">
            <Container maxWidth="xl">
              <Outlet />
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Layout;
