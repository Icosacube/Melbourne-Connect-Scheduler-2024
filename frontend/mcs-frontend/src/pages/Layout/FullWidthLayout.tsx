import { Box, Grid } from '@mui/material'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { TopNavBar } from '../../components'

interface FullWidthLayoutProps {
    content: any
}

export const FullWidthLayout: FC<FullWidthLayoutProps> = ({ content }) => {
    return (
        <Grid
            container
            className="h-screen w-full"
            sx={{ backgroundColor: '#F9F9F9' }}
        >
            <Grid
                item
                xs
                sx={{
                    height: '100vh',
                    overflowY: 'auto',
                }}
            >
                <TopNavBar />
                {content}
            </Grid>
        </Grid>
    )
}
