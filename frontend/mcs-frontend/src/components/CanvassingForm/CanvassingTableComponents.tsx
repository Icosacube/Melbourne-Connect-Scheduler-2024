import React from 'react'

import dayjs, { Dayjs } from 'dayjs'
import { Grid, Box, Typography } from '@mui/material'

export const DateCornerLine = () => {
    return (
        <Box sx={{ display: 'flex', marginTop: '48px', width: '100%' }}>
            {/* Horizontal Line */}
            <Box
                sx={{
                    flexBasis: '55%',
                    height: '4px',
                    backgroundColor: '#E5E7EB',
                }}
            />
            {/* Vertical Line */}
            <Box
                sx={{
                    flexBasis: '45%',
                    display: 'flex',
                    justifyContent: 'left',
                }}
            >
                <Box
                    sx={{
                        height: '64px',
                        width: '4px',
                        backgroundColor: '#E5E7EB',
                    }}
                />
            </Box>
        </Box>
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

interface SlotDateDisplayProps {
    date: Dayjs
}

export const SlotDateDisplay: React.FC<SlotDateDisplayProps> = ({ date }) => {
    return (
        <>
            <Typography variant="h5" color="primary">
                {date.format('ddd')}
            </Typography>
            <Typography variant="h3">{date.format('DD')}</Typography>
            <Typography variant="h6" color="grey">
                {date.format('MMM')}
            </Typography>
        </>
    )
}

interface SlotTimeDisplayProps {
    startTime: Dayjs
    endTime: Dayjs
}

export const SlotTimeDisplay: React.FC<SlotTimeDisplayProps> = ({
    startTime,
    endTime,
}) => {
    return (
        <Grid
            item
            container
            direction={'row'}
            spacing={0.5}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
            }}
        >
            <Grid item>
                <Box className="relative w-3 h-12 border-t-4 border-l-4 border-b-4 border-gray-300"></Box>
            </Grid>
            <Grid item>
                <Typography variant="h6" gutterBottom>
                    {startTime.format('HH:mm')}
                </Typography>
                <Typography variant="h6">
                    {endTime.format('HH:mm')}
                </Typography>
            </Grid>
        </Grid>
    )
}
