import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select/SelectInput'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRevalidator } from 'react-router-dom'
import {
    BottomSuccessSnackbar,
    CanvassingCreationCalendar,
    DeleteButton,
    FormInputMultiAutocomplete,
    FormInputMultiFreeSolo,
    SubmitButton,
} from '../../../../../components'
import { getAllAcademics } from '../../../../../scripts/academic/functions'
import {
    createCanvassing,
    deleteCanvassing,
    defaultCanvassing,
    formatCanvassingToTemp,
} from '../../../../../scripts/canvassing/functions'
import {
    generateBatchEmailForCanvassing,
    sendEmail,
} from '../../../../../scripts/email/functions'
import { getVenueById } from '../../../../../scripts/venue/functions'
import {
    Academic,
    Canvassing,
    CanvassingTemp,
    MainEvent,
    Venue,
} from '../../../../../types/frontendTypes'

interface CanvassingCreationProps {
    event: MainEvent
    canvassingSlots: Canvassing[]
}

export const CanvassingCreation: React.FC<CanvassingCreationProps> = ({
    event,
    canvassingSlots,
}) => {
    const { handleSubmit, reset, control, setValue } = useForm<Canvassing[]>({
        defaultValues:
            canvassingSlots.length > 0 ? canvassingSlots : [defaultCanvassing],
    })
    const [allAcademics, setAllAcademics] = useState<Academic[]>([])
    const [canvassings, setCanvassings] = useState<CanvassingTemp[]>([])
    const [timeSlotSize, setTimeSlotSize] = useState<string>('30')
    const [venues, setVenues] = useState<Venue[]>([])
    const [submitting, setSubmitting] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showSuccessEmail, setShowSuccessEmail] = useState(false)
    const revalidator = useRevalidator()

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

        getAllAcademics().then((academics) => setAllAcademics(academics))
    }, [event])

    // for update mode
    useEffect(() => {
        if (canvassingSlots != null && canvassingSlots.length > 0) {
            const temp = canvassingSlots.map((canvassing) =>
                formatCanvassingToTemp(canvassing)
            )
            setCanvassings(temp)
        }
    }, [canvassingSlots, setValue])

    const deleteEmptyTimeslots = async () => {
        setDeleting(true)

        try {
            const filteredSlots = canvassings.filter(
                (slot) => slot.AvailableAcademic.length > 0
            )
            const ids = canvassings
                .filter((slot) => slot.AvailableAcademic.length === 0)
                .map((slot) => slot.id)
            if (ids.length === 0) {
                setDeleting(false)
                return
            }
            const res = await deleteCanvassing(ids)

            if (res === 200) {
                setCanvassings(filteredSlots)
                console.log('Successfully deleted empty timeslots.')
            } else {
                console.error(
                    `Failed to delete timeslots. ${res}`
                )
            }
        } catch (error) {
            console.error('An error occurred while deleting timeslots:', error)
        } finally {
            setDeleting(false)
            revalidator.revalidate()
        }
    }

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
            var res
            if (canvassingSlots.length > 0) {
                const ids = canvassingSlots.map((slot) => slot.RecordID)
                const res_delete = await deleteCanvassing(ids)
                if (res_delete != 200) {
                    console.log('Failed to delete Canvassing for update')
                }
            }
            // create new timeslots
            res = await createCanvassing(updatedSlots)

            if (res) {
                setShowSuccess(true)
                const { emailSubject, emailContent } =
                    generateBatchEmailForCanvassing(event)
                // console.log('Emails:', emails)
                for (const academic of formattedMixedAcademic) {
                    await sendEmail(
                        'mcs083087@gmail.com',
                        academic.email,
                        [],
                        [],
                        emailSubject,
                        emailContent
                    )
                }
                setShowSuccessEmail(true)
            } else {
                console.log('Failed to create or edit Canvassing')
            }
        } catch (error) {
            console.error(error)
        } finally {
            revalidator.revalidate()
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
                            {/* Optionally display this button when canvassingSlots exist (update mode) */}
                            {canvassingSlots.length > 0 ? (
                                <Grid item xs={12} container>
                                    <Grid item xs="auto">
                                        <DeleteButton
                                            deleting={deleting}
                                            onClick={deleteEmptyTimeslots}
                                            objectName={'Empty Slots'}
                                        />
                                    </Grid>
                                </Grid>
                            ) : (
                                <></>
                            )}
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
                                    defaultValueList={
                                        canvassingSlots[0] &&
                                        canvassingSlots[0].Venue.map(
                                            (venue, i) => ({
                                                value: venue,
                                                label: canvassingSlots[0]
                                                    .VenueName[i],
                                            })
                                        )
                                    }
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
                                    setValue={setValue}
                                    label="Academics"
                                    defaultValueList={allAcademics
                                        .filter(
                                            (academic) =>
                                                canvassingSlots[0] &&
                                                canvassingSlots[0].Academic.includes(
                                                    academic.RecordID
                                                )
                                        )
                                        .map((person) => ({
                                            id: person.RecordID,
                                            value: person.Email,
                                            label: person.Name,
                                        }))}
                                    options={allAcademics.map((person) => ({
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
                                {/* <Grid item xs="auto">
                                    {event &&
                                        academics &&
                                        academics.length > 0 && (
                                            <ShareEmailButton
                                                event={event}
                                                academic={academics[0]}
                                            />
                                        )}
                                </Grid> */}
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
                message="Canvassing Form Created Successfully. Sending Emails..."
            />
            <BottomSuccessSnackbar
                showSuccess={showSuccessEmail}
                setShowSuccess={setShowSuccessEmail}
                message="Email(s) sent successfully!"
            />
        </Grid>
    )
}

export default CanvassingCreation
