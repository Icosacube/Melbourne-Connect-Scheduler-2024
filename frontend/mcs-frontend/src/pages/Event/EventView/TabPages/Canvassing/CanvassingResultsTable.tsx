import React, { useEffect, useState } from 'react'
import {
    Box,
    Grid,
    Typography,
    IconButton,
    useMediaQuery,
    Tooltip,
    Button,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Add, CheckCircle, DoNotDisturb, People } from '@mui/icons-material'
import {
    Canvassing,
    MainEvent,
    Speaker,
} from '../../../../../types/frontendTypes'
import { CreateSubEventModal } from '../CreateSubEventModal'
import dayjs, { Dayjs } from 'dayjs'
import { SlotDateTime } from '../../../../../components/'
import { ShareEmailButton } from '../../../../../components/Buttons'
import SelectAcademicModal from './SelectAcademicModal'

interface CanvassingResultsTableProps {
    event: MainEvent
    speakers: Speaker[]
    canvassingSlots: Canvassing[]
}

export const CanvassingResultsTable: React.FC<CanvassingResultsTableProps> = ({
    event,
    speakers,
    canvassingSlots,
}) => {
    const theme = useTheme()
    const [currentPage, setCurrentPage] = useState(0)
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'))
    const [openCreate, setOpenCreate] = useState(false)
    const [startTime, setStartTime] = useState<Dayjs>(dayjs())
    const [endTime, setEndTime] = useState<Dayjs>(dayjs())
    const [openSelectAcademic, setOpenSelectAcademic] = useState(false)

    const handleOpenSelectAcademic = () => {
        setOpenSelectAcademic(true)
    }

    const handleCloseSelectAcademic = () => {
        setOpenSelectAcademic(false)
    }

    const handleOpenCreate = (slot: Canvassing) => {
        setStartTime(dayjs(slot.StartTime))
        setEndTime(dayjs(slot.EndTime))
        setOpenCreate(true)
    }

    const handleCloseCreate = () => {
        setOpenCreate(false)
    }

    const handleSubEventCreated = () => {}

    // Adjust items per page based on screen size
    const itemsPerPage = isSmallScreen
        ? 1
        : isMediumScreen
        ? 2
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
        <Box className="relative border-2 border-gray-200 bg-white rounded-lg p-2">
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
                    <Box sx={{ height: '278px' }}></Box>
                    <Grid
                        item
                        container
                        alignItems="center"
                        justifyContent="flex-end"
                        marginRight="12px"
                        marginBottom="24px"
                    >
                        <Grid item marginRight={1}>
                            <People fontSize="medium" />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" color="grey">
                                {canvassingSlots[0].Academic.length}
                            </Typography>
                        </Grid>
                    </Grid>
                    {canvassingSlots.length > 0 ? (
                        canvassingSlots[0].AcademicName.map((name, index) => (
                            <Grid
                                item
                                key={index}
                                sx={{
                                    textAlign: 'right',
                                    height: '68px',
                                    marginRight: '12px',
                                }}
                            >
                                {name != null && name.split(' ').length > 1 ? (
                                    <>
                                        <Typography variant="h6">
                                            {name.split(' ')[0]}
                                        </Typography>
                                        <Typography variant="h6">
                                            {name.split(' ')[1]}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="h6">
                                        {name}{' '}
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
                                <SlotDateTime
                                    startTime={slot.StartTime}
                                    endTime={slot.EndTime}
                                    sameDateAsPrev={sameDateAsPrev}
                                    lastOfSameDay={lastOfSameDay}
                                    index={index}
                                    itemsPerPage={itemsPerPage}
                                />
                                <Grid item container justifyContent="center">
                                    <Tooltip title="Add Sub-Event">
                                        <IconButton
                                            sx={{
                                                color: 'black',
                                            }}
                                            onClick={() =>
                                                handleOpenCreate(slot)
                                            }
                                        >
                                            <Add />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                {canvassingSlots[0]?.Academic?.map(
                                    (id, index) => (
                                        <Grid item key={index} marginY={'8px'}>
                                            {slot.AvailableAcademic.includes(
                                                id
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
                                    )
                                )}
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>

            <CreateSubEventModal
                open={openCreate}
                handleClose={handleCloseCreate}
                event={event}
                speakers={speakers}
                startDate={startTime}
                endDate={endTime}
                onSubEventCreation={handleSubEventCreated}
            />
            {/* ShareEmailButton positioned at the bottom center */}
            {/* <Box
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <ShareEmailButton
                    event={event}
                    academic={{
                        RecordID: '12345',
                        Email: 'john.doe@example.com',
                        Name: 'John Doe',
                        MainEvent: ['event1', 'event2', 'event3'],
                        Canvassing: ['canvassing1', 'canvassing2'],
                        CanvassingAvailable: [
                            'available1',
                            'available2',
                            'available3',
                        ],
                    }}
                />
            </Box> */}
            <Button
                onClick={handleOpenSelectAcademic}
                variant="contained"
                color="primary"
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                }}
            >
                Send
            </Button>
            <SelectAcademicModal
                mainEvent={event}
                isOpen={openSelectAcademic}
                onClose={handleCloseSelectAcademic}
            />
        </Box>
    )
}
