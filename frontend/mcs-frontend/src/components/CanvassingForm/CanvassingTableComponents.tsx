import React from 'react'

import { Dayjs } from 'dayjs'
import { Grid, Box, Typography } from '@mui/material'

const DateCornerLine = () => {
    return (
        <Box sx={{ display: 'flex', marginTop: '48px', width: '100%' }}>
            {/* Horizontal Line */}
            <Box
                sx={{
                    flexBasis: '52%',
                    height: '4px',
                    backgroundColor: '#E5E7EB',
                }}
            />
            {/* Vertical Line */}
            <Box
                sx={{
                    flexBasis: '48%',
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

const DateStraightLine = () => {
    return (
        <Box
            sx={{
                marginTop: '48px',
                width: '100%',
                height: '4px',
                backgroundColor: '#E5E7EB',
            }}
        />
    )
}

interface SlotDateDisplayProps {
    date: Dayjs
}

const SlotDateDisplay: React.FC<SlotDateDisplayProps> = ({ date }) => {
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

const SlotTimeDisplay: React.FC<SlotTimeDisplayProps> = ({
    startTime,
    endTime,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                marginY: '4px',
            }}
        >
            <Box className="w-3 h-12 border-t-4 border-l-4 border-b-4 border-gray-300 ml-2" />
            <Box>
                <Typography variant="h6" gutterBottom>
                    {startTime.format('HH:mm')}
                </Typography>
                <Typography variant="h6">{endTime.format('HH:mm')}</Typography>
            </Box>
        </Box>
    )
}
interface SlotDateTimeProps {
    startTime: Dayjs
    endTime: Dayjs
    sameDateAsPrev: boolean
    lastOfSameDay: boolean
    index: number
    itemsPerPage: number
}

export const SlotDateTime: React.FC<SlotDateTimeProps> = ({
    startTime,
    endTime,
    sameDateAsPrev,
    lastOfSameDay,
    index,
    itemsPerPage,
}) => {
    return (
        <>
            <Grid
                item
                container
                direction={'column'}
                sx={{
                    height: '128px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginBottom: '16px',
                }}
            >
                {(lastOfSameDay && index !== 0) ||
                (sameDateAsPrev && index === itemsPerPage - 1) ? (
                    <DateCornerLine />
                ) : sameDateAsPrev && index !== 0 ? (
                    <DateStraightLine />
                ) : (
                    <SlotDateDisplay date={startTime} />
                )}
            </Grid>
            <SlotTimeDisplay startTime={startTime} endTime={endTime} />
        </>
    )
}
