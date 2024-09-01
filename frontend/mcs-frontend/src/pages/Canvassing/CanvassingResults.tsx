import React, { useState } from 'react'
import { Dayjs } from 'dayjs'
import { Box, Grid, Typography, IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { CheckCircle, DoNotDisturb } from '@mui/icons-material'
import { TimeSlot } from '../../types/frontendTypes'

interface CanvassingResultsProps {
    timeSlots: TimeSlot[]
}

export const CanvassingResults: React.FC<CanvassingResultsProps> = ({
    timeSlots,
}) => {
    const theme = useTheme()
    const [currentPage, setCurrentPage] = useState(0)
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'))

    // Adjust items per page based on screen size
    const itemsPerPage = isSmallScreen
        ? 1
        : isMediumScreen
        ? 2
        : isLargeScreen
        ? 4
        : 8

    const totalPages = Math.ceil(timeSlots.length / itemsPerPage)

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
    }

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
    }

    const displayedSlots = timeSlots.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    return (
        <Box className="relative border-2 border-gray-200 bg-white rounded-lg p-2 m-24">
            <Grid
                container
                direction={'row'}
                sx={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingLeft: '8px',
                }}
            >
                {/* Column for displaying people's name */}
                <Grid item xs={3} md={2} lg={1} container direction={'column'}>
                    <Grid item>
                        <Box
                            sx={{
                                height: '280px',
                            }}
                        ></Box>
                    </Grid>
                    {timeSlots.length > 0 ? (
                        timeSlots[0].People.map((person, index) => (
                            <Grid
                                item
                                key={index}
                                sx={{
                                    textAlign: 'right',
                                    height: '68px',
                                    marginRight: '12px',
                                }}
                            >
                                <Typography variant="h6">
                                    {person.name.split(' ')[0]}
                                </Typography>
                                <Typography variant="h6">
                                    {person.name.split(' ')[1]}
                                </Typography>
                            </Grid>
                        ))
                    ) : (
                        <></>
                    )}
                </Grid>
                <IconButton
                    onClick={handlePrevPage}
                    size={'large'}
                    disabled={currentPage === 0}
                    color={'primary'}
                    sx={{
                        position: 'absolute',
                        top: '30%',
                        left: 100,
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton
                    onClick={handleNextPage}
                    size={'large'}
                    color={'primary'}
                    disabled={currentPage === totalPages - 1}
                    sx={{
                        position: 'absolute',
                        top: '30%',
                        right: 16,
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>

                {/* Column for displaying the time slots */}
                <Grid
                    item
                    xs={9}
                    md={10}
                    lg={11}
                    container
                    wrap="nowrap"
                    sx={{
                        overflowX: 'auto',
                        padding: '64px 48px 84px 48px',
                    }}
                >
                    {displayedSlots.map((slot, index) => {
                        const globalIndex = currentPage * itemsPerPage + index

                        return (
                            <Grid
                                item
                                key={globalIndex}
                                container
                                direction={'column'}
                                spacing={2}
                                sx={{
                                    minWidth: '108px',
                                    maxWidth: '240px',
                                    textAlign: 'center',
                                }}
                            >
                                <Grid
                                    item
                                    container
                                    direction={'column'}
                                    sx={{
                                        height: '128px',
                                        display: 'flex',
                                        justifyContent: 'flex-start', // vertical
                                    }}
                                >
                                    <Typography variant="h5" color={'primary'}>
                                        {slot.StartTime.format('ddd')}
                                    </Typography>
                                    <Typography variant="h3">
                                        {slot.StartTime.format('DD')}
                                    </Typography>
                                    <Typography variant="h6" color={'grey'}>
                                        {slot.StartTime.format('MMM')}
                                    </Typography>
                                </Grid>

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
                                            {slot.StartTime.format('HH:mm')}
                                        </Typography>
                                        <Typography variant="h6">
                                            {slot.EndTime.format('HH:mm')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {slot.People.map((person, personIndex) => (
                                    <Grid
                                        item
                                        key={personIndex}
                                        marginY={'8px'}
                                    >
                                        {slot.AvailablePeople.includes(
                                            person.email
                                        ) ? (
                                            <CheckCircle
                                                fontSize="large"
                                                color="secondary"
                                            />
                                        ) : (
                                            <DoNotDisturb
                                                fontSize="large"
                                                color="disabled"
                                            />
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Box>
    )
}
