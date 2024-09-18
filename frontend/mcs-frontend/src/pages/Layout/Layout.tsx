import React, { useState } from 'react'
import { Grid, IconButton } from '@mui/material'
import { Outlet, useNavigation } from 'react-router-dom'
import { ProgressSpinner, SideNavBar, TopNavBar } from '../../components'
import MenuIcon from '@mui/icons-material/Menu'

export const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const navigation = useNavigation()

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
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
