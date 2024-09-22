import React, { useEffect, useState } from 'react'
import { Avatar, Chip, Grid, Paper, Typography } from '@mui/material'
import {
    Canvassing,
    MainEvent,
    Speaker,
} from '../../../../../types/frontendTypes'
import {
    AddButton,
    FormInputMultiAutocomplete,
    ShareEmailButton,
} from '../../../../../components'
import { useForm } from 'react-hook-form'
import { People } from '@mui/icons-material'
import { CreateSubEventModal } from '../CreateSubEventModal'

interface CanvassingResultsFCSidebarProps {
    event: MainEvent
    speakers: Speaker[]
    academicFilter: string[]
    setAcademicFilter: (value: string[]) => void
    selectedSlot: Canvassing | null
    academicMap: { [id: string]: string }
}

export const CanvassingResultsFCSidebar: React.FC<
    CanvassingResultsFCSidebarProps
> = ({
    event,
    speakers,
    academicFilter,
    setAcademicFilter,
    selectedSlot,
    academicMap,
}) => {
    const [openCreate, setOpenCreate] = useState(false)
    const [subEventTimes, setSubEventTimes] = useState<{
        startDate: any
        endDate: any
    } | null>(null)

    const handleOpenCreate = (startDate: any, endDate: any) => {
        setSubEventTimes({ startDate, endDate })
        setOpenCreate(true)
    }

    const handleCloseCreate = () => {
        setOpenCreate(false)
        setSubEventTimes(null) // Clear after closing
    }

    const handleSubEventCreated = () => {}

    const { control, watch, setValue } = useForm({
        defaultValues: {
            academicFilter: academicFilter,
        },
    })
    const selectedAcademics = watch('academicFilter')

    useEffect(() => {
        setAcademicFilter(selectedAcademics)
    }, [selectedAcademics, setAcademicFilter])

    const academicOptions = Object.keys(academicMap).map((id) => ({
        value: id,
        label: academicMap[id],
    }))

    return (
        <>
            <Paper sx={{ p: 5 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Calendar Options
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormInputMultiAutocomplete
                            name="academicFilter"
                            control={control}
                            label="Filter by Academic"
                            options={academicOptions}
                            required={false}
                            setValue={setValue}
                            hint={'Type or Select Names'}
                        />
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{ p: 5, mt: 3 }}>
                {selectedSlot ? (
                    <Grid container spacing={3}>
                        <Grid
                            item
                            xs={12}
                            container
                            sx={{
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}
                        >
                            <Grid item sm={6} md={8} lg={9} xl={10}>
                                <Typography variant="subtitle1" color="primary">
                                    {selectedSlot.StartTime.format(
                                        'ddd, MMM DD'
                                    )}
                                </Typography>
                                <Typography variant="h5">
                                    {selectedSlot.StartTime.format('HH:mm')} -{' '}
                                    {selectedSlot.EndTime.format('HH:mm')}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sm={6}
                                md={4}
                                lg={3}
                                xl={2}
                                container
                                direction="column"
                                alignItems="center"
                            >
                                <Grid item>
                                    <People fontSize="medium" />
                                </Grid>
                                <Grid
                                    item
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Typography
                                        variant="subtitle1"
                                        color="black"
                                    >
                                        {selectedSlot.AvailableAcademic.length}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="grey"
                                    >
                                        /{selectedSlot.Academic.length}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {selectedSlot.AvailableAcademic.map(
                                (academicId, index) => (
                                    <Chip
                                        key={index}
                                        avatar={
                                            <Avatar
                                                alt={academicMap[academicId]}
                                            />
                                        }
                                        label={
                                            academicMap[academicId] || 'Unknown'
                                        }
                                        sx={{ mr: 1, mb: 0.5 }}
                                    />
                                )
                            )}
                        </Grid>
                        {selectedSlot.AvailableAcademic.length > 0 ? (
                            <Grid item xs={12}>
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    spacing={2}
                                    justifyContent="flex-start"
                                    marginTop={2}
                                >
                                    <Grid item>
                                        <ShareEmailButton
                                            event={event}
                                            academic={{
                                                RecordID: '12345',
                                                Email: 'john.doe@example.com',
                                                Name: 'John Doe',
                                                MainEvent: [
                                                    'event1',
                                                    'event2',
                                                    'event3',
                                                ],
                                                Canvassing: [
                                                    'canvassing1',
                                                    'canvassing2',
                                                ],
                                                CanvassingAvailable: [
                                                    'available1',
                                                    'available2',
                                                    'available3',
                                                ],
                                            }}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <AddButton
                                            name={'Sub-Event'}
                                            onClick={() =>
                                                handleOpenCreate(
                                                    selectedSlot.StartTime,
                                                    selectedSlot.EndTime
                                                )
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : null}
                    </Grid>
                ) : (
                    <Grid item>
                        <Typography variant="body1">
                            Click on a time slot to view details.
                        </Typography>
                    </Grid>
                )}
            </Paper>

            {openCreate && subEventTimes && (
                <CreateSubEventModal
                    open={openCreate}
                    handleClose={handleCloseCreate}
                    event={event}
                    speakers={speakers}
                    onSubEventCreation={handleSubEventCreated}
                    startDate={subEventTimes.startDate}
                    endDate={subEventTimes.endDate}
                />
            )}
        </>
    )
}
