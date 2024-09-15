import React, { useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'
import { Canvassing, Venue } from '../../types/frontendTypes'
import {
    Box,
    Button,
    Grid,
    Checkbox,
    Typography,
    IconButton,
    useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { getVenueById } from '../../scripts/venue/functions'
import { updateCanvassing } from '../../scripts/canvassing/functions'
import { useRevalidator } from 'react-router-dom'
import { BottomSuccessSnackbar } from '../../components'

// Canvassing with Available boolean for checkbox processing
interface CheckSlots {
    RecordID: string
    StartTime: Dayjs
    EndTime: Dayjs
    isAvailable: boolean
    AvailableAcademic: string[]
}

interface CheckboxRowProps {
    academic: string
    canvassingSlots: Canvassing[]
}

export const CheckboxRow: React.FC<CheckboxRowProps> = ({
    academic,
    canvassingSlots,
}) => {
    const [checkSlots, setCheckSlots] = useState<CheckSlots[]>([])
    const [academics, setAcademics] = useState<string[]>([])
    const [venues, setVenues] = useState<Venue[]>([])

    const [showSuccess, setShowSuccess] = useState(false)
    const revalidator = useRevalidator()

    const MainEvent = canvassingSlots[0].MainEvent

    useEffect(() => {
        const initialCheckSlots = canvassingSlots.map((slot) => ({
            RecordID: slot.RecordID,
            StartTime: slot.StartTime,
            EndTime: slot.EndTime,
            isAvailable: slot.AvailableAcademic.includes(academic),
            AvailableAcademic: slot.AvailableAcademic,
        }))
        setCheckSlots(initialCheckSlots)

        setAcademics(
            canvassingSlots.length > 0 ? canvassingSlots[0].Academic : []
        )

        const fetchVenues = async () => {
            try {
                const venuePromises = canvassingSlots[0].Venue.map((venueId) =>
                    getVenueById(venueId)
                )
                const venueObjs = await Promise.all(venuePromises)
                setVenues(venueObjs)
            } catch (error) {
                console.error('Error fetching venues:', error)
            }
        }
        fetchVenues()
    }, [canvassingSlots])

    const [currentPage, setCurrentPage] = useState(0)

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'))

    // Adjust items per page based on screen size
    const itemsPerPage = isSmallScreen
        ? 2
        : isMediumScreen
        ? 3
        : isLargeScreen
        ? 5
        : 10

    const handleCheckboxChange = (index: number) => {
        setCheckSlots((prevSlots) => {
            const updatedSlots = [...prevSlots]
            updatedSlots[index].isAvailable = !updatedSlots[index].isAvailable
            return updatedSlots
        })
    }

    const totalPages = Math.ceil(checkSlots.length / itemsPerPage)

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
    }

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
    }

    const displayedSlots = checkSlots.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handleSubmit = async () => {
        const newCanvassings = checkSlots.map((slot) => {
            const wasAvailable =
                slot.AvailableAcademic.length == 0
                    ? false
                    : slot.AvailableAcademic.includes(academic)

            var availableList = slot.AvailableAcademic
            if (slot.isAvailable && !wasAvailable) {
                availableList = [...availableList, academic]
            } else if (!slot.isAvailable && wasAvailable) {
                availableList.filter((avail) => avail !== academic)
            }
            return {
                RecordID: slot.RecordID,
                MainEvent: MainEvent,
                StartTime: slot.StartTime,
                EndTime: slot.EndTime,
                Venue: canvassingSlots[0].Venue,
                AvailableAcademic: availableList,
                Academic: academics,
                EventName: canvassingSlots[0].EventName,
            }
        })

        console.log(newCanvassings)

        try {
            // TODO: add submitting state
            const res = await updateCanvassing(newCanvassings)
            if (res) {
                setShowSuccess(true)
                revalidator.revalidate()
            } else {
                console.log('Failed to update Canvassing Form')
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Box className="m-24">
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}
            >
                <Grid item xs={12}>
                    <Typography variant="h3">
                        Meeting For {canvassingSlots[0].EventName.join(', ')}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={9} marginBottom={8}>
                    <Typography variant="subtitle1" fontSize={20}>
                        {venues.map((venue) => venue.VenueName).join(', ')}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={3}
                    container
                    justifyContent="flex-end"
                >
                    <Grid
                        item
                        container
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography variant="subtitle1">
                                Available ={' '}
                            </Typography>
                        </Grid>
                        <Grid item marginRight={2}>
                            <Checkbox
                                size={'medium'}
                                checked={true}
                                onChange={() => {}}
                                color={'secondary'}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">
                                Unavailable ={' '}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Checkbox
                                size={'medium'}
                                checked={false}
                                onChange={() => {}}
                                color={'secondary'}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={12}
                    container
                    className="relative border-2 border-gray-200 bg-white rounded-lg"
                >
                    <IconButton
                        onClick={handlePrevPage}
                        size={'large'}
                        disabled={currentPage === 0}
                        color={'primary'}
                        sx={{
                            position: 'absolute',
                            top: '40%',
                            left: 32,
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
                            top: '40%',
                            right: 32,
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>

                    <Grid
                        container
                        wrap="nowrap"
                        sx={{
                            overflowX: 'auto',
                            padding: '64px 48px 84px 48px',
                        }}
                    >
                        {displayedSlots.map((slot, index) => {
                            const globalIndex =
                                currentPage * itemsPerPage + index
                            const prevSlot = checkSlots[globalIndex - 1]
                            const nextSlot = checkSlots[globalIndex + 1]
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
                                            <Grid
                                                item
                                                container
                                                direction={'row'}
                                            >
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
                                                    {slot.StartTime.format(
                                                        'ddd'
                                                    )}
                                                </Typography>
                                                <Typography variant="h3">
                                                    {slot.StartTime.format(
                                                        'DD'
                                                    )}
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    color={'grey'}
                                                >
                                                    {slot.StartTime.format(
                                                        'MMM'
                                                    )}
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
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                            >
                                                {slot.StartTime.format('HH:mm')}
                                            </Typography>
                                            <Typography variant="h6">
                                                {slot.EndTime.format('HH:mm')}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Checkbox
                                            size={'large'}
                                            checked={slot.isAvailable}
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    globalIndex
                                                )
                                            }
                                            color={'secondary'}
                                        />
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    container
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Grid item>
                        <Button variant={'contained'} onClick={handleSubmit}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Canvassing Form Saved Successfully"
            />
        </Box>
    )
}
