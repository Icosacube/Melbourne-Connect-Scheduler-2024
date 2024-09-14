import React, { useState } from 'react'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { MainEvent, CanvassingTemp } from '../../../../types/frontendTypes'
import {
    FormInputMultiFreeSolo,
    CanvassingCreationCalendar,
} from '../../../../components'

interface CanvassingCreationProps {
    event: MainEvent
}

interface Person {
    name: string
    email: string
    image?: string
}

const MixedAcademicOptions: Person[] = [
    {
        email: 'john.doe@example.com',
        name: 'John Doe',
        image: '/path/to/john_image.jpg',
    },
    {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        image: '/path/to/jane_image.jpg',
    },
    {
        email: 'michael.johnson@example.com',
        name: 'Michael Johnson',
        image: '/path/to/michael_image.jpg',
    },
]

export const CanvassingCreation: React.FC<CanvassingCreationProps> = ({
    event,
}) => {
    const [canvassingSlots, setCanvassingSlots] = useState<CanvassingTemp[]>([])
    const { control, handleSubmit, setValue } = useForm()

    const onSubmit = (data: any) => {
        const updatedCanvassingSlots = canvassingSlots.map((slot) => ({
            ...slot,
            MixedAcademic: data.MixedAcademic.map((person: any) => ({
                name: person.label,
                email: person.value,
            })),
        }))
        console.log(updatedCanvassingSlots)
    }

    return (
        <Paper sx={{ p: 6 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} alignItems={'flex-start'}>
                    <Grid item lg={10} md={9} sm={12}>
                        <CanvassingCreationCalendar
                            MainEvent={event}
                            canvassingSlots={canvassingSlots}
                            setCanvassingSlots={setCanvassingSlots}
                        />
                    </Grid>
                    <Grid item sm={12} md={3} lg={2} container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Options</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="MixedAcademic"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <FormInputMultiFreeSolo
                                        name="MixedAcademic"
                                        control={control}
                                        label="Select Academics"
                                        options={MixedAcademicOptions.map(
                                            (person) => ({
                                                value: person.email,
                                                label: person.name,
                                                image: person.image,
                                            })
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item container justifyContent={'flex-end'}>
                            <Grid item>
                                <Button type="submit" variant={'contained'}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default CanvassingCreation
