import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { SideNavBar, TopNavBar } from '../../components'
import React, { FC } from 'react'

export const Layout: FC = () => {
    return (
        <>
            <Box className="bg-backGround flex h-screen w-full">
                <Box className="w-56">
                    <SideNavBar />
                </Box>
                <Box className=" w-full">
                    <TopNavBar />
                    <Box className=" flex items-center justify-center p-6">
                        <Container maxWidth="xl">
                            <Outlet />
                        </Container>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
