import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Button,
    Chip,
    Grid,
    IconButton,
    Paper,
    Typography,
} from '@mui/material'
import {
    Canvassing,
    MainEvent,
    Speaker,
} from '../../../../../types/frontendTypes'
import {
    AddButton,
    FormInputMultiAutocomplete,
} from '../../../../../components'
import { useForm, Controller } from 'react-hook-form'
import { Add, AddCircle, People } from '@mui/icons-material'
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
    const handleOpenCreate = () => setOpenCreate(true)
    const handleCloseCreate = () => setOpenCreate(false)
    const handleSubEventCreated = () => {}

    const { control, watch, setValue } = useForm({
        defaultValues: {
            academicFilter: academicFilter,
        },
    })
    const selectedAcademics = watch('academicFilter')

    useEffect(() => {
        setAcademicFilter(selectedAcademics)
        console.log(academicFilter)
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
                            <Grid item xs={12} md={9}>
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
                                xs={12}
                                md={3}
                                container
                                alignItems="flex-end"
                            >
                                <Grid item>
                                    <People fontSize="medium" />
                                </Grid>
                                <Grid item sx={{ marginLeft: 1 }}>
                                    <Typography variant="h6">
                                        {selectedSlot.AvailableAcademic.length}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" color="grey">
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
                        <Grid item xs={12}>
                            <Grid
                                item
                                xs={12}
                                container
                                justifyContent="flex-start"
                                marginTop={2}
                            >
                                <AddButton
                                    name={'Sub-Event'}
                                    onClick={handleOpenCreate}
                                />
                            </Grid>
                        </Grid>
                        <CreateSubEventModal
                            open={openCreate}
                            handleClose={handleCloseCreate}
                            event={event}
                            speakers={speakers}
                            onSubEventCreation={handleSubEventCreated}
                            startDate={selectedSlot.StartTime}
                            endDate={selectedSlot.EndTime}
                        />
                    </Grid>
                ) : (
                    <Grid item>
                        <Typography variant="body1">
                            Click on a time slot to view details.
                        </Typography>
                    </Grid>
                )}
            </Paper>
        </>
    )
}
