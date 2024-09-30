import React, { useState } from 'react'
import { Grid, IconButton,Button } from '@mui/material'
import { Outlet, useNavigation,useNavigate} from 'react-router-dom'
import { ProgressSpinner, SideNavBar, TopNavBar } from '../../components'
import MenuIcon from '@mui/icons-material/Menu'
import { logout } from '../../scripts/authentication/auth'
export const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const navigation = useNavigation()
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }
    const handleLogout = async() => {
        const success = await logout(); 
        if (success) {
            navigate('/login'); 
        }
    }
    return (
        <Grid
            container
            className="h-screen w-full"
            sx={{ backgroundColor: '#F5F5F5' }}
        >
            {/* Sidebar */}
            <Grid
                item
                sx={{
                    position: 'sticky',
                    top: 0,
                    width: isSidebarOpen ? '192px' : '0',
                    height: '100vh',
                    overflow: 'hidden',
                    transition: 'width 0.3s ease',
                }}
            >
                <SideNavBar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
            </Grid>

            {/* Main Content */}
            <Grid
                item
                xs
                sx={{
                    height: '100vh',
                    overflowY: 'auto',
                }}
            >
                {/* Toggle Sidebar Button, fixed for now */}
                <IconButton
                    onClick={toggleSidebar}
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        zIndex: 10,
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: 60,
                        zIndex: 10,
                    }}
                >
                    Logout
                </Button>

                <TopNavBar />

                {/* Render loading spinner or content */}
                {navigation.state === 'loading' ? (
                    <ProgressSpinner />
                ) : (
                    <Outlet />
                )}
            </Grid>
        </Grid>
    )
}
