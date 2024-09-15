import React, { useEffect, useState } from 'react'
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import {
    CanvassingTemp,
    MainEvent,
    Venue,
} from '../../../../types/frontendTypes'
import {
    CanvassingCreationCalendar,
    FormInputMultiAutocomplete,
    FormInputMultiFreeSolo,
} from '../../../../components'
import { DropdownOptions } from '../../../../components/FormComponents/FormInputProps'
import { useRevalidator } from 'react-router-dom'
import { getAllVenues, getVenueById } from '../../../../scripts/venue/functions'
import { defaultCanvassing } from '../../../../scripts/canvassing/functions'
import { SelectChangeEvent } from '@mui/material/Select/SelectInput'

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
    const { handleSubmit, reset, control, watch } = useForm<CanvassingTemp[]>({
        defaultValues: [defaultCanvassing],
    })
    const [canvassingSlots, setCanvassingSlots] = useState<CanvassingTemp[]>([])
    const [timeSlotSize, setTimeSlotSize] = useState<string>('30')
    const [showSuccess, setShowSuccess] = useState(false)
    const [venues, setVenues] = useState<Venue[]>([])
    const [submitting, setSubmitting] = useState(false)
    const revalidator = useRevalidator()

    const timeSlotSizes: DropdownOptions[] = [
        { value: '30', label: '30 min' },
        { value: '45', label: '45 min' },
        { value: '60', label: '1 hour' },
        { value: '90', label: '1.5 hour' },
        { value: '120', label: '2 hours' },
    ]

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const venuePromises = event.Venue.map((venueId) =>
                    getVenueById(venueId)
                )
                const venues = await Promise.all(venuePromises)
                setVenues(venues)
                console.log(venues)
            } catch (error) {
                console.error('Error fetching venues:', error)
            }
        }
        fetchVenues()
        // alternative: fetch all venues
        // getAllVenues().then((venues) => setVenues(venues))
    }, [event.Venue])

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
    const handleChange = (event: SelectChangeEvent) => {
        setTimeSlotSize(event.target.value as string)
    }

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Create Canvassing Form
            </Typography>
            <Grid
                container
                spacing={3}
                direction="row-reverse"
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
            >
                <Grid item xs={12} lg={4} xl={3}>
                    <Paper sx={{ p: 6 }}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom>
                                        Calendar Options
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="slotsize">
                                            Time Slot Size
                                        </InputLabel>
                                        <Select
                                            labelId="slotsize"
                                            value={timeSlotSize}
                                            label="Default Time Slot Size"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={30}>
                                                30 minutes
                                            </MenuItem>
                                            <MenuItem value={45}>
                                                45 minutes
                                            </MenuItem>
                                            <MenuItem value={60}>
                                                1 hour
                                            </MenuItem>
                                            <MenuItem value={90}>
                                                1.5 hour
                                            </MenuItem>
                                            <MenuItem value={120}>
                                                2 hours
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom>
                                        Additional Details
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormInputMultiAutocomplete
                                        name="Venue"
                                        control={control}
                                        label="Venue"
                                        options={venues.map((venue) => ({
                                            value: venue.RecordID,
                                            label: venue.VenueName,
                                        }))}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputMultiFreeSolo
                                        name="DropdownOptions"
                                        hint="Search By Name or Type In Email"
                                        control={control}
                                        label="Academics"
                                        options={MixedAcademicOptions.map(
                                            (person) => ({
                                                id: person.id,
                                                value: person.email,
                                                label: person.name,
                                            })
                                        )}
                                        labelName="Name"
                                        valueName="Email"
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justifyContent="flex-end"
                                >
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={8} xl={9}>
                    <Paper sx={{ p: 6 }}>
                        <CanvassingCreationCalendar
                            MainEvent={event}
                            canvassingSlots={canvassingSlots}
                            setCanvassingSlots={setCanvassingSlots}
                            timeSlotSize={timeSlotSize}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </>
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
