import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import {
    Box,
    Grid,
    Checkbox,
    Typography,
    IconButton,
    useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

// actual data format sent from backend
type TimeSlot = {
    MainEvent: string
    StartDate: Dayjs
    EndDate: Dayjs
    Available: string[] // a list of emails
    People: string[] // a list of {name, email}
}


// TimeSlot with available boolean for checkbox processing
interface TimeSlotTemp {
    StartDate: Dayjs
    EndDate: Dayjs
    available: boolean
}

export const CheckboxRow: React.FC = () => {
    const [timeSlots, setTimeSlots] = useState<TimeSlotTemp[]>([
        {
            StartDate: dayjs('2024-09-01T10:00:00'),
            EndDate: dayjs('2024-09-01T11:00:00'),
            available: false,
        },
        {
            StartDate: dayjs('2024-09-02T14:00:00'),
            EndDate: dayjs('2024-09-02T14:45:00'),
            available: false,
        },
        {
            StartDate: dayjs('2024-09-02T16:00:00'),
            EndDate: dayjs('2024-09-02T16:30:00'),
            available: false,
        },
        {
            StartDate: dayjs('2024-09-03T10:00:00'),
            EndDate: dayjs('2024-09-03T11:00:00'),
            available: false,
        },
        {
            StartDate: dayjs('2024-09-04T10:00:00'),
            EndDate: dayjs('2024-09-04T11:00:00'),
            available: false,
        },
        {
            StartDate: dayjs('2024-09-05T14:00:00'),
            EndDate: dayjs('2024-09-05T14:45:00'),
            available: false,
        },
        {
            StartDate: dayjs('2024-09-09T10:00:00'),
            EndDate: dayjs('2024-09-09T11:00:00'),
            available: false,
        },
        {
            StartDate: dayjs('2024-09-09T14:00:00'),
            EndDate: dayjs('2024-09-09T14:45:00'),
            available: false,
        },
        {
            StartDate: dayjs('2024-09-09T16:00:00'),
            EndDate: dayjs('2024-09-09T16:30:00'),
            available: false,
        },
        {
            StartDate: dayjs('2024-09-09T17:00:00'),
            EndDate: dayjs('2024-09-09T17:30:00'),
            available: false,
        },
        {
            StartDate: dayjs('2024-09-10T14:00:00'),
            EndDate: dayjs('2024-09-10T14:45:00'),
            available: false,
        },
    ])

    const [currentPage, setCurrentPage] = useState(0)

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'))

    // Adjust itemsperpage based on screensize
    const itemsPerPage = isSmallScreen
        ? 1
        : isMediumScreen
        ? 2
        : isLargeScreen
        ? 5
        : 9

    const handleCheckboxChange = (index: number) => {
        setTimeSlots((prevSlots) => {
            const updatedSlots = [...prevSlots]
            updatedSlots[index].available = !updatedSlots[index].available
            return updatedSlots
        })
    }

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
        <Box className="relative border-2 border-gray-200 bg-white rounded-lg p-2">
            <IconButton
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                color={'primary'}
                sx={{
                    position: 'absolute',
                    top: '40%',
                    left: 16,
                }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
                onClick={handleNextPage}
                color={'primary'}
                disabled={currentPage === totalPages - 1}
                sx={{
                    position: 'absolute',
                    top: '40%',
                    right: 16,
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>

            <Grid
                container
                wrap="nowrap"
                sx={{
                    overflowX: 'auto',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                }}
            >
                {displayedSlots.map((slot, index) => {
                    const globalIndex = currentPage * itemsPerPage + index
                    const prevSlot = timeSlots[globalIndex - 1]
                    const nextSlot = timeSlots[globalIndex + 1]
                    const sameDateAsPrev =
                        prevSlot &&
                        slot.StartDate.isSame(prevSlot.StartDate, 'day')
                    const lastOfSameDay =
                        sameDateAsPrev &&
                        (!nextSlot ||
                            !slot.StartDate.isSame(nextSlot.StartDate, 'day'))

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
                                {(lastOfSameDay && index != 0) ||
                                (sameDateAsPrev &&
                                    index == itemsPerPage - 1) ? (
                                    <Grid item container direction={'row'}>
                                        <Grid item xs={6.5}>
                                            <Box
                                                sx={{
                                                    marginTop: '48px',
                                                    width: '100%',
                                                    height: '4px',
                                                    backgroundColor: '#CCCCCC',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={5.5}>
                                            <Box
                                                sx={{
                                                    marginTop: '48px',
                                                    height: '64px',
                                                    width: '4px',
                                                    backgroundColor: '#CCCCCC',
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                ) : sameDateAsPrev && index != 0 ? (
                                    <Box
                                        sx={{
                                            marginTop: '48px',
                                            width: '100%',
                                            height: '4px',
                                            backgroundColor: '#CCCCCC',
                                        }}
                                    />
                                ) : (
                                    <>
                                        <Typography
                                            variant="h5"
                                            color={'primary'}
                                        >
                                            {slot.StartDate.format('ddd')}
                                        </Typography>
                                        <Typography variant="h3">
                                            {slot.StartDate.format('DD')}
                                        </Typography>
                                        <Typography variant="h6" color={'grey'}>
                                            {slot.StartDate.format('MMM')}
                                        </Typography>
                                    </>
                                )}
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
                                }}
                            >
                                <Grid item>
                                    <Box className="relative w-3 h-12 border-t-4 border-l-4 border-b-4 border-gray-300"></Box>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" gutterBottom>
                                        {slot.StartDate.format('HH:mm')}
                                    </Typography>
                                    <Typography variant="h6">
                                        {slot.EndDate.format('HH:mm')}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Checkbox
                                    size={'large'}
                                    checked={slot.available}
                                    onChange={() =>
                                        handleCheckboxChange(globalIndex)
                                    }
                                    color={'secondary'}
                                />
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}
