import React, { useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'
import { TimeSlot } from '../../types/frontendTypes'
import {
    Box,
    Button,
    Grid,
    Checkbox,
    Typography,
    TextField,
    IconButton,
    useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

// TimeSlot with Available boolean for checkbox processing
interface TimeSlotTemp {
    StartTime: Dayjs
    EndTime: Dayjs
    isAvailable: boolean
    AvailableAcademic: string[]
}

interface CheckboxRowProps {
    mainEvent: string
    academic: string
    timeSlots: TimeSlot[]
    setTimeSlots: (value: TimeSlot[]) => void
}

export const CheckboxRow: React.FC<CheckboxRowProps> = ({
    mainEvent,
    academic,
    timeSlots,
    setTimeSlots,
}) => {
    const [timeSlotsTemp, setTimeSlotsTemp] = useState<TimeSlotTemp[]>([])
    const [email, setEmail] = useState<string>('')
    const [MixedAcademic, setMixedAcademic] = useState<{ name: string; email: string }[]>([])

    // WIP change to dynamic
    const title = 'Meeting For Event XXX'
    const venue = 'Zoom'

    useEffect(() => {
        // Convert TimeSlot[] to TimeSlotTemp[]
        const initialTimeSlotsTemp = timeSlots.map((slot) => ({
            StartTime: slot.StartTime,
            EndTime: slot.EndTime,
            isAvailable: false,
            AvailableAcademic: slot.AvailableAcademic,
        }))
        setTimeSlotsTemp(initialTimeSlotsTemp)
        setMixedAcademic(timeSlots.length > 0 ? timeSlots[0].MixedAcademic : [])
    }, [timeSlots])

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
        setTimeSlotsTemp((prevSlots) => {
            const updatedSlots = [...prevSlots]
            updatedSlots[index].isAvailable = !updatedSlots[index].isAvailable
            return updatedSlots
        })
    }

    const totalPages = Math.ceil(timeSlotsTemp.length / itemsPerPage)

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
    }

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
    }

    const displayedSlots = timeSlotsTemp.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handleSubmit = () => {
        const newTimeSlots: TimeSlot[] = timeSlotsTemp.map((slot) => ({
            MainEvent: mainEvent,
            StartTime: slot.StartTime,
            EndTime: slot.EndTime,
            AvailableAcademic: slot.isAvailable
                ? [...slot.AvailableAcademic, email]
                : slot.AvailableAcademic,
            MixedAcademic: MixedAcademic,
        }))
        setTimeSlots(newTimeSlots)
        console.log(newTimeSlots)
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
                <Grid item xs={12} container>
                    <Grid item xs={12} md={6} lg={9} marginY={4}>
                        <Typography variant="h3">{title}</Typography>
                        <Typography variant="subtitle1">
                            Venue: {venue}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        lg={3}
                        container
                        spacing={2}
                        justifyContent="flex-end"
                        alignItems={'center'}
                    >
                        <Grid item xs={8}>
                            <TextField
                                label="email"
                                variant="outlined"
                                required
                                value={email}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setEmail(event.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant={'contained'}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
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
                            const prevSlot = timeSlotsTemp[globalIndex - 1]
                            const nextSlot = timeSlotsTemp[globalIndex + 1]
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
            </Grid>
        </Box>
    )
}
