import { Grid } from '@mui/material'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { SideNavBar, TopNavBar } from '../../components'

export const Layout: FC = () => {
    return (
        <Grid
            container
            className="h-screen w-full"
            sx={{ backgroundColor: '#F5F5F5' }}
        >
            <Grid
                item
                sx={{
                    position: 'sticky',
                    top: 0,
                    width: 200,
                    height: '100vh',
                    overflow: 'hidden', // don't scroll
                }}
            >
                <SideNavBar />
            </Grid>

            <Grid
                item
                xs
                sx={{
                    height: '100vh',
                    overflowY: 'auto',
                }}
            >
                <TopNavBar />
                <Outlet />
            </Grid>
        </Grid>
    )
}
