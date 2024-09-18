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
    Academic,
    Canvassing,
    CanvassingTemp,
    MainEvent,
    Venue,
} from '../../../../../types/frontendTypes'
import {
    BottomSuccessSnackbar,
    CanvassingCreationCalendar,
    FormInputMultiAutocomplete,
    FormInputMultiFreeSolo,
    SubmitButton,
} from '../../../../../components'
import { useRevalidator } from 'react-router-dom'
import {
    getAllVenues,
    getVenueById,
} from '../../../../../scripts/venue/functions'
import {
    createCanvassing,
    defaultCanvassing,
    formatCanvassingToTemp,
} from '../../../../../scripts/canvassing/functions'
import { SelectChangeEvent } from '@mui/material/Select/SelectInput'
import { getAllAcademics } from '../../../../../scripts/academic/functions'
import { ShareEmailButton } from '../../../../../components/Buttons/'
import { getCanvassingByEventId } from '../../../../../scripts/canvassing/functions'

interface CanvassingCreationProps {
    event: MainEvent
    canvassingSlots: Canvassing[]
}

export const CanvassingCreation: React.FC<CanvassingCreationProps> = ({
    event,
    canvassingSlots,
}) => {
    const { handleSubmit, reset, control, setValue, watch } = useForm<
        CanvassingTemp[]
    >({
        defaultValues: [defaultCanvassing],
    })
    const [academics, setAcademics] = useState<Academic[]>([])
    const [canvassings, setCanvassings] = useState<CanvassingTemp[]>([])
    const [timeSlotSize, setTimeSlotSize] = useState<string>('30')
    const [venues, setVenues] = useState<Venue[]>([])
    const [submitting, setSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const revalidator = useRevalidator()
    const [extractedEmails, setExtractedEmails] = useState<string[]>([])
    const [extractedCanvassing, setExtractedCanvassing] = useState<
        Canvassing[]
    >([])

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const venuePromises = event.Venue.map((venueId) =>
                    getVenueById(venueId)
                )
                const venues = await Promise.all(venuePromises)
                setVenues(venues)
            } catch (error) {
                console.error('Error fetching venues:', error)
            }
        }
        fetchVenues()
        // alternative: fetch all venues
        // getAllVenues().then((venues) => setVenues(venues))
    }, [event.Venue])

    useEffect(() => {
        if (canvassingSlots != null && canvassingSlots.length > 0) {
            const temp = canvassingSlots.map((canvassing) =>
                formatCanvassingToTemp(canvassing)
            )
            setCanvassings(temp)
        }
    }, [canvassingSlots, setValue])

    useEffect(() => {
        getAllAcademics().then((academics) => setAcademics(academics))
        console.log(academics)
    }, [event])

    const onSubmit = async (data: any) => {
        const formattedMixedAcademic = data.DropdownOptions.map(
            (academic: { id: string; label: string; value: string }) => ({
                id: academic.id,
                name: academic.label,
                email: academic.value,
            })
        )
        const updatedSlots = canvassings.map((slot) => ({
            ...slot,
            Venue: data.Venue,
            MixedAcademic: formattedMixedAcademic,
        }))

        try {
            setSubmitting(true)
            const res = await createCanvassing(updatedSlots)
            if (res) {
                setShowSuccess(true)
                revalidator.revalidate()
            } else {
                console.log('Failed to create Canvassing')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
            reset()
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setTimeSlotSize(event.target.value as string)
    }

    return (
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
                <Paper sx={{ p: 5 }}>
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
                                        <MenuItem value={60}>1 hour</MenuItem>
                                        <MenuItem value={90}>1.5 hour</MenuItem>
                                        <MenuItem value={120}>2 hours</MenuItem>
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
                                    options={academics.map((person) => ({
                                        id: person.RecordID,
                                        value: person.Email,
                                        label: person.Name,
                                    }))}
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
                                spacing={1.5}
                            >
                                <Grid item xs="auto">
                                    {event &&
                                        academics &&
                                        academics.length > 0 && (
                                            <ShareEmailButton
                                                event={event}
                                                academic={academics[0]}
                                            />
                                        )}
                                </Grid>
                                <Grid item xs="auto">
                                    <SubmitButton
                                        submitting={submitting}
                                        onClick={handleSubmit(onSubmit)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={8} xl={9}>
                <Paper sx={{ p: 5 }}>
                    <CanvassingCreationCalendar
                        MainEvent={event}
                        canvassingSlots={canvassings}
                        setCanvassingSlots={setCanvassings}
                        timeSlotSize={timeSlotSize}
                    />
                </Paper>
            </Grid>

            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Canvassing Form Created Successfully"
            />
        </Grid>
    )
}

export default CanvassingCreation
