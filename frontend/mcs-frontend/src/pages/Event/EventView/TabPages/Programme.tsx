import {
    Avatar,
    Box,
    Button,
    Chip,
    Grid,
    Paper,
    Typography,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { AddButton, OutlinedButton } from '../../../../components'
import WeeklyCalendar from '../../../../components/Calendar/WeeklyCalendar'
import { getSubEventsByMainEventID } from '../../../../scripts/subevent/functions'
import { MainEvent, Speaker, SubEvent } from '../../../../types/frontendTypes'
import { CreateSubEventModal } from './CreateSubEventModal'
import { EditSubEventModal } from './EditSubEventModal'
import { People } from '@mui/icons-material'
import Edit from '@mui/icons-material/Edit'

interface ProgrammeProps {
    event: MainEvent
    speakers: Speaker[]
}

export const Programme: FC<ProgrammeProps> = ({ event, speakers }) => {
    const [subEvents, setSubEvents] = useState<SubEvent[]>([])
    const [openCreate, setOpenCreate] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [selectedSubEvent, setSelectedSubEvent] = useState<SubEvent | null>(
        null
    )
    const [selectedSlot, setSelectedSlot] = useState<SubEvent | null>(null)

    // Fetch subevents
    const fetchSubEvents = async () => {
        const fetchedSubEvents = await getSubEventsByMainEventID(event.RecordID)
        setSubEvents(fetchedSubEvents)
    }

    // Fetch subevents when eventID changes
    useEffect(() => {
        fetchSubEvents()
    }, [event.RecordID])

    const handleOpenCreate = () => setOpenCreate(true)
    const handleCloseCreate = () => setOpenCreate(false)

    const handleSubEventCreated = () => {
        fetchSubEvents()
    }

    const handleOpenUpdate = () => {
        setSelectedSubEvent(selectedSlot)
        setOpenUpdate(true)
    }

    const handleCloseUpdate = () => {
        setSelectedSubEvent(null)
        setOpenUpdate(false)
    }

    const handleEventClick = (subEvent: SubEvent) => {
        setSelectedSlot(subEvent)
    }

    return (
        <>
            <Grid
                container
                spacing={3}
                direction="row-reverse"
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
            >
                <Grid item xs={12} md={4} lg={3}>
                    <Paper sx={{ pt: 3, px: 5, pb: 5 }}>
                        <Grid item marginY={2}>
                            <OutlinedButton
                                name={'Add Sub-Event'}
                                onClick={handleOpenCreate}
                            />
                        </Grid>
                        {selectedSlot ? (
                            <Grid item container spacing={3}>
                                <Grid item container>
                                    <Grid
                                        item
                                        container
                                        sx={{ alignItems: 'center' }}
                                    >
                                        <Grid item xs={12} lg={8}>
                                            <Typography
                                                variant="subtitle2"
                                                color="primary"
                                            >
                                                {selectedSlot.StartDate.format(
                                                    'HH:mm'
                                                )}{' '}
                                                -{' '}
                                                {selectedSlot.EndDate.format(
                                                    'HH:mm'
                                                )}{' '}
                                                |{' '}
                                                {selectedSlot.StartDate.format(
                                                    'ddd, MMM DD'
                                                )}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            lg={4}
                                            container
                                            justifyContent="flex-end"
                                        >
                                            <Chip
                                                size="small"
                                                label={
                                                    selectedSlot.EventType ||
                                                    'Unknown'
                                                }
                                            />
                                        </Grid>

                                        <Typography variant="h5">
                                            {selectedSlot.EventName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">
                                        Attendees
                                    </Typography>
                                    {selectedSlot.Speakers.map(
                                        (speakerId, index) => (
                                            <Chip
                                                key={index}
                                                avatar={
                                                    <Avatar alt={speakerId} />
                                                }
                                                label={speakerId || 'Unknown'}
                                                sx={{ mr: 1, mt: 0.5 }}
                                            />
                                        )
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">
                                        Description
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedSlot.EventDescription}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">
                                        Notes
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedSlot.EventDescription}
                                    </Typography>
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    container
                                    alignItems={'flex-end'}
                                >
                                    <Button
                                        variant="contained"
                                        onClick={handleOpenUpdate}
                                        startIcon={<Edit />}
                                    >
                                        Edit
                                    </Button>
                                </Grid>
                            </Grid>
                        ) : (
                            <Typography variant="body1">
                                Click on a sub-event to see details.
                            </Typography>
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                    <Paper sx={{ p: 5 }}>
                        <WeeklyCalendar
                            event={event}
                            subEvents={subEvents}
                            onEventClick={handleEventClick}
                        />
                    </Paper>
                </Grid>
            </Grid>
            {selectedSubEvent && (
                <EditSubEventModal
                    open={openUpdate}
                    handleClose={handleCloseUpdate}
                    speakers={speakers}
                    subEvent={selectedSubEvent}
                    removeSubEvent={(removeSubEventID) => {
                        setSubEvents((prevSubEvent) =>
                            prevSubEvent.filter(
                                (event) => event.RecordID !== removeSubEventID
                            )
                        )
                        handleCloseUpdate()
                    }}
                    updateSubEvent={(updatedSubEvent) => {
                        setSubEvents((prevSubEvent) =>
                            prevSubEvent.map((item) =>
                                item.RecordID === updatedSubEvent.RecordID
                                    ? updatedSubEvent
                                    : item
                            )
                        )
                        handleCloseUpdate()
                    }}
                />
            )}
            <CreateSubEventModal
                open={openCreate}
                handleClose={handleCloseCreate}
                event={event}
                speakers={speakers}
                onSubEventCreation={handleSubEventCreated}
            />
        </>
    )
}

export default Programme
