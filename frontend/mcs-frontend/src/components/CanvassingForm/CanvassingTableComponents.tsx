import React from 'react'
import { Grid, Box } from '@mui/material'

export const DateCornerLine = () => {
    return (
        <Grid item container direction="row" sx={{ marginTop: '48px' }}>
            {/* Horizontal Line */}
            <Grid item xs={6.5}>
                <Box
                    sx={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: '#DDDDDD',
                    }}
                />
            </Grid>
            {/* Vertical Line */}
            <Grid item xs={5.5}>
                <Box
                    sx={{
                        height: '64px',
                        width: '4px',
                        backgroundColor: '#DDDDDD',
                    }}
                />
            </Grid>
        </Grid>
    )
}

export const DateStraightLine = () => {
    return (
        <Box
            sx={{
                marginTop: '48px',
                width: '100%',
                height: '4px',
                backgroundColor: '#DDDDDD',
            }}
        />
    )
}
