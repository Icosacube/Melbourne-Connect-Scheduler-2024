import React, { useState } from 'react'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { CanvassingTemp, MainEvent } from '../../../../types/frontendTypes'
import {
    CanvassingCreationCalendar,
    FormInputMultiAutocomplete,
    FormInputMultiFreeSolo,
} from '../../../../components'
import { DropdownOptions } from '../../../../components/FormComponents/FormInputProps'

interface CanvassingCreationProps {
    event: MainEvent
}

type MixedAcademic = {
    id: string
    name: string
    email: string
}

export const CanvassingCreation: React.FC<CanvassingCreationProps> = ({
    event,
}) => {
    const { handleSubmit, reset, control, watch } = useForm<DropdownOptions[]>({
        defaultValues: [],
    })
    const [canvassingSlots, setCanvassingSlots] = useState<CanvassingTemp[]>([])

    // Submit form and add MixedAcademic to each slot
    const onSubmit = (data: any) => {
        console.log(data)
        const formattedMixedAcademic = data.DropdownOptions.map(
            (academic: { id: string; label: string; value: string }) => ({
                id: academic.id,
                name: academic.label,
                email: academic.value,
            })
        )
        const updatedSlots = canvassingSlots.map((slot) => ({
            ...slot,
            Venue: data.Venue,
            MixedAcademic: formattedMixedAcademic,
        }))
        console.log('Updated Canvassing Slots:', updatedSlots)

        reset()
    }

    return (
        <Paper sx={{ p: 6 }}>
            <Grid
                container
                spacing={3}
                direction="row-reverse"
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
            >
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Create Canvassing Form
                    </Typography>
                </Grid>
                <Grid item xs={12} lg={4} xl={3} container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Options
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <FormInputMultiAutocomplete
                            name="Venue"
                            control={control}
                            label="Select Venue"
                            options={event.Venue.map((venue) => ({
                                value: venue,
                                label: venue,
                            }))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormInputMultiFreeSolo
                            name="DropdownOptions"
                            hint="Search By Name or Type In Email"
                            control={control}
                            label="Academics"
                            options={MixedAcademicOptions.map((person) => ({
                                id: person.id,
                                value: person.email,
                                label: person.name,
                            }))}
                            labelName='Name'
                            valueName='Email'
                        />
                    </Grid>

                    <Grid item xs={12} container justifyContent="flex-end">
                        <Button
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={8} xl={9}>
                    <CanvassingCreationCalendar
                        MainEvent={event}
                        canvassingSlots={canvassingSlots}
                        setCanvassingSlots={setCanvassingSlots}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CanvassingCreation

// Sample academics
const MixedAcademicOptions: MixedAcademic[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
    },
    {
        id: '3',
        name: 'Michael Johnson',
        email: 'michael@example.com',
    },
]
