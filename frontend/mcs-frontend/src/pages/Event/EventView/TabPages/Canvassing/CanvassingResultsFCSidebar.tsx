import React, { useEffect } from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import { Canvassing } from '../../../../../types/frontendTypes'
import { FormInputMultiAutocomplete } from '../../../../../components'
import { useForm, Controller } from 'react-hook-form'

interface CanvassingResultsFCSidebarProps {
    academicFilter: string[]
    setAcademicFilter: (value: string[]) => void
    selectedSlot: Canvassing | null
    academicMap: { [id: string]: string }
}

export const CanvassingResultsFCSidebar: React.FC<
    CanvassingResultsFCSidebarProps
> = ({ academicFilter, setAcademicFilter, selectedSlot, academicMap }) => {
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
                <Grid container spacing={3}>
                    {selectedSlot ? (
                        <Grid item xs={12} container spacing={1}>
                            <Grid
                                item
                                xs={12}
                                container
                                sx={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Grid item xs={10} container>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1">
                                            {selectedSlot.StartTime.format(
                                                'HH:mm'
                                            )}{' '}
                                            -{' '}
                                            {selectedSlot.EndTime.format(
                                                'HH:mm'
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" gutterBottom>
                                            {selectedSlot.StartTime.format(
                                                'ddd, MMM DD'
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">
                                        {selectedSlot.AvailableAcademic.length}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {selectedSlot.AvailableAcademic.map(
                                    (academicId, index) => (
                                        <Typography key={index}>
                                            {academicMap[academicId] ||
                                                'Unknown'}
                                        </Typography>
                                    )
                                )}
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item>
                            <Typography variant="body1">
                                Click on a time slot to view details.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </>
    )
}
