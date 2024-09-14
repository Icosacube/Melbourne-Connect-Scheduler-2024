import React, { useState } from 'react'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { CanvassingTemp, MainEvent } from '../../../../types/frontendTypes'
import {
    CanvassingCreationCalendar,
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
        const formattedMixedAcademic = data.DropdownOptions.map(
            (academic: { id: string; value: string }) => ({
                id: academic.id,
                email: academic.value,
            })
        )
        const updatedSlots = canvassingSlots.map((slot) => ({
            ...slot,
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
                className="w-full p-16 flex space-between justify-items"
            >
                <Grid item xs={12} sm={8}>
                    <Typography variant="h4" gutterBottom>
                        Create Canvassing Form
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} container justifyContent="flex-end">
                    <Button
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Save
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <FormInputMultiFreeSolo
                        name="DropdownOptions"
                        control={control}
                        label="Select Academics"
                        options={MixedAcademicOptions.map((person) => ({
                            id: person.id,
                            value: person.email,
                            label: person.name,
                        }))}
                    />
                </Grid>

                <Grid item xs={12}>
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
