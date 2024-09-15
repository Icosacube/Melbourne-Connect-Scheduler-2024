import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Box, Grid, Typography, IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { CheckCircle, DoNotDisturb } from '@mui/icons-material'
import { Canvassing, Academic } from '../../types/frontendTypes'
import { getAcademicById } from '../../scripts/academic/functions'

const temp: Canvassing[] = [
    {
        RecordID: '1',
        StartTime: dayjs('2024-09-15T09:00:00'),
        EndTime: dayjs('2024-09-15T10:00:00'),
        Academic: ['academic1', 'academic2', 'academic3'],
        Venue: ['venue1'],
        MainEvent: ['event1'],
        AvailableAcademic: ['academic1', 'academic2'],
    },
    {
        RecordID: '2',
        StartTime: dayjs('2024-09-15T11:00:00'),
        EndTime: dayjs('2024-09-15T12:00:00'),
        Academic: ['academic1', 'academic2', 'academic3'],
        Venue: ['venue1'],
        MainEvent: ['event1'],
        AvailableAcademic: ['academic1', 'academic3'],
    },
    {
        RecordID: '3',
        StartTime: dayjs('2024-09-15T13:00:00'),
        EndTime: dayjs('2024-09-15T14:00:00'),
        Academic: ['academic1', 'academic2', 'academic3'],
        Venue: ['venue1'],
        MainEvent: ['event1'],
        AvailableAcademic: ['academic2'],
    },
]

export const CanvassingResults: React.FC = ({}) => {
    const theme = useTheme()
    const [canvassingSlots, setCanvassingSlots] = useState<Canvassing[]>(temp)
    const [academics, setAcademics] = useState<Academic[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'))

    useEffect(() => {
        const canvassingSlots = temp

        setCanvassingSlots(canvassingSlots)
        /*
        const fetchAcademics = async () => {
            try {
                const academicPromises = canvassingSlots[0].Academic.map(
                    (academicId) => getAcademicById(academicId)
                )
                // Fetch all academics
                const fetchedAcademics = await Promise.all(academicPromises)
                setAcademics(fetchedAcademics)
            } catch (error) {
                console.error('Error fetching academics:', error)
            }
        }
        fetchAcademics() // Call the async function
            */
    }, [])

    // Adjust items per page based on screen size
    const itemsPerPage = isSmallScreen
        ? 2
        : isMediumScreen
        ? 3
        : isLargeScreen
        ? 5
        : 10

    const totalPages = Math.ceil(canvassingSlots.length / itemsPerPage)

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
    }

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
    }

    const displayedSlots = canvassingSlots.slice(
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
                {/* Column for displaying Academic's name */}
                <Grid item xs={3} md={2} lg={1} container direction={'column'}>
                    <Grid item>
                        <Box
                            sx={{
                                height: '280px',
                            }}
                        ></Box>
                    </Grid>
                    {canvassingSlots.length > 0 ? (
                        academics.map((person, index) => (
                            <Grid
                                item
                                key={index}
                                sx={{
                                    textAlign: 'right',
                                    height: '68px',
                                    marginRight: '12px',
                                }}
                            >
                                {person.Name != null &&
                                person.Name.split(' ').length > 1 ? (
                                    <>
                                        <Typography variant="h6">
                                            {person.Name.split(' ')[0]}
                                        </Typography>
                                        <Typography variant="h6">
                                            {person.Name.split(' ')[1]}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="h6">
                                        {person.Name}{' '}
                                    </Typography>
                                )}
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
                        top: 140,
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
                        top: 140,
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
                        const prevSlot = canvassingSlots[globalIndex - 1]
                        const nextSlot = canvassingSlots[globalIndex + 1]
                        const sameDateAsPrev =
                            prevSlot &&
                            slot.StartTime.isSame(prevSlot.StartTime, 'day')
                        const lastOfSameDay =
                            sameDateAsPrev &&
                            (!nextSlot ||
                                !slot.StartTime.isSame(
                                    nextSlot.StartTime,
                                    'day'
                                ))
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
                                    {(lastOfSameDay && index !== 0) ||
                                    (sameDateAsPrev &&
                                        index === itemsPerPage - 1) ? (
                                        <Grid item container direction={'row'}>
                                            <Grid item xs={6.5}>
                                                <Box
                                                    sx={{
                                                        marginTop: '48px',
                                                        width: '100%',
                                                        height: '4px',
                                                        backgroundColor:
                                                            '#DDDDDD',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={5.5}>
                                                <Box
                                                    sx={{
                                                        marginTop: '48px',
                                                        height: '64px',
                                                        width: '4px',
                                                        backgroundColor:
                                                            '#DDDDDD',
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    ) : sameDateAsPrev && index !== 0 ? (
                                        <Box
                                            sx={{
                                                marginTop: '48px',
                                                width: '100%',
                                                height: '4px',
                                                backgroundColor: '#DDDDDD',
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <Typography
                                                variant="h5"
                                                color={'primary'}
                                            >
                                                {slot.StartTime.format('ddd')}
                                            </Typography>
                                            <Typography variant="h3">
                                                {slot.StartTime.format('DD')}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                color={'grey'}
                                            >
                                                {slot.StartTime.format('MMM')}
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
                                {academics.map((person, personIndex) => (
                                    <Grid
                                        item
                                        key={personIndex}
                                        marginY={'8px'}
                                    >
                                        {slot.AvailableAcademic.includes(
                                            person.RecordID
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
