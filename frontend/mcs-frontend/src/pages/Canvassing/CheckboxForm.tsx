import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {
    Box,
    Checkbox,
    Grid,
    IconButton,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    BottomSuccessSnackbar,
    FormInputText,
    SlotDateTime,
    SubmitButton,
} from '../../components'
import { updateCanvassing } from '../../scripts/canvassing/functions'
import { Canvassing } from '../../types/frontendTypes'

// Canvassing with Available boolean for checkbox processing
interface CheckSlots {
    RecordID: string
    StartTime: Dayjs
    EndTime: Dayjs
    isAvailable: boolean
    AvailableAcademic: string[]
}

interface CheckboxFormProps {
    canvassingSlots: Canvassing[]
}

export const CheckboxForm: React.FC<CheckboxFormProps> = ({
    canvassingSlots,
}) => {
    const [checkSlots, setCheckSlots] = useState<CheckSlots[]>([])
    const [academics, setAcademics] = useState<string[]>([])
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const MainEvent = canvassingSlots[0].MainEvent
    const [submitting, setSubmitting] = useState(false)
    const { handleSubmit, reset, control } = useForm<{ academicName: string }>({
        defaultValues: { academicName: '' },
    })

    useEffect(() => {
        const initialCheckSlots = canvassingSlots.map((slot) => ({
            RecordID: slot.RecordID,
            StartTime: slot.StartTime,
            EndTime: slot.EndTime,
            isAvailable: false,
            AvailableAcademic: slot.AvailableAcademic,
        }))
        setCheckSlots(initialCheckSlots)

        setAcademics(
            canvassingSlots.length > 0 ? canvassingSlots[0].Academic : []
        )
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

    const onSubmit = async (data: { academicName: string }) => {
        setSubmitting(true)
        const academicIndex = canvassingSlots[0].AcademicName?.indexOf(
            data.academicName
        )
        if (academicIndex === -1) {
            setShowError(true)
            setSubmitting(false)
            return
        }
        const academic = canvassingSlots[0].Academic[academicIndex]
        const modifiedCanvassings = checkSlots.reduce((acc, slot) => {
            const wasAvailable =
                slot.AvailableAcademic.length === 0
                    ? false
                    : slot.AvailableAcademic.includes(academic)

            let availableList = [...slot.AvailableAcademic]
            if (slot.isAvailable && !wasAvailable) {
                availableList.push(academic)
            } else if (!slot.isAvailable && wasAvailable) {
                availableList = availableList.filter(
                    (avail) => avail !== academic
                )
            } else {
                return acc
            }
            acc.push({
                RecordID: slot.RecordID,
                MainEvent: MainEvent,
                StartTime: slot.StartTime,
                EndTime: slot.EndTime,
                Venue: canvassingSlots[0].Venue,
                AvailableAcademic: availableList,
                Academic: academics,
                EventName: canvassingSlots[0].EventName,
            })
            return acc
        }, [] as any[])

        console.log(modifiedCanvassings)

        try {
            const res = await updateCanvassing(modifiedCanvassings)
            setSubmitting(false)
            if (res === 200) {
                setShowSuccess(true)
            } else {
                console.log('Failed to update Canvassing Form')
            }
        } catch (error) {
            console.error(error)
        } finally {
            reset()
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
                <Grid item xs={12} marginBottom={2}>
                    <Typography variant="subtitle1" fontSize={20}>
                        {canvassingSlots[0].VenueName.join(', ')}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={8} marginBottom={1}>
                    <FormInputText
                        required={true}
                        name="academicName"
                        control={control}
                        label="Full Name"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    container
                    marginBottom={1}
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
                                    {/* Slot date-time related content */}
                                    <SlotDateTime
                                        startTime={slot.StartTime}
                                        endTime={slot.EndTime}
                                        sameDateAsPrev={sameDateAsPrev}
                                        lastOfSameDay={lastOfSameDay}
                                        index={index}
                                        itemsPerPage={itemsPerPage}
                                    />

                                    {/* Checkbox content */}
                                    <Grid item marginTop={2}>
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
                        <SubmitButton
                            submitting={submitting}
                            onClick={handleSubmit(onSubmit)}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Canvassing Form Saved Successfully"
            />
            <BottomSuccessSnackbar
                showSuccess={showError}
                setShowSuccess={setShowError}
                message="The entered name is not found for this form"
                variant="error"
            />
        </Box>
    )
}
