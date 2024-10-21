import Edit from '@mui/icons-material/Edit'
import { Avatar, Button, Chip, Grid, Paper, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { OutlinedButton } from '../../../../components'
import WeeklyCalendar from '../../../../components/Calendar/WeeklyCalendar'
import { getSpeakerById } from '../../../../scripts/speaker/functions'
import { getSubEventsByMainEventID } from '../../../../scripts/subevent/functions'
import { MainEvent, Speaker, SubEvent } from '../../../../types/frontendTypes'
import { CreateSubEventModal } from './CreateSubEventModal'
import { EditSubEventModal } from './EditSubEventModal'
import { ShareSubEventModal } from './ShareSubEventModal'
import { Send, Share } from '@mui/icons-material'

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
    const [speakerNames, setSpeakerNames] = useState<string[]>([])
    const [isLoadingSpeaker, setIsLoadingSpeaker] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const fetchSpeakers = async () => {
            setIsLoadingSpeaker(true)
            if (selectedSlot === null || selectedSlot!.Speakers.length === 0) {
                setIsLoadingSpeaker(false)
                return []
            }
            const speakerNames: string[] = await Promise.all(
                selectedSlot.Speakers.map(async (speakerId) => {
                    const speakerName = await getSpeakerById(speakerId)
                    return (
                        `${speakerName.FirstName} ${speakerName.LastName}` ||
                        'Unknown'
                    )
                })
            )
            setSpeakerNames(speakerNames)
            setIsLoadingSpeaker(false)
        }
        fetchSpeakers()
    }, [selectedSlot])

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

    const handleOpenModal = () => {
        setSelectedSubEvent(selectedSlot)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setSelectedSubEvent(null)
        setOpenModal(false)
    }

    const handleSubEventCreated = () => {
        fetchSubEvents()
        handleCloseCreate()
    }

    const handleOpenUpdate = () => {
        setSelectedSubEvent(selectedSlot)
        setOpenUpdate(true)
    }

    const handleCloseUpdate = () => {
        setOpenUpdate(false)
    }

    const handleEventClick = (subEvent: SubEvent) => {
        setSelectedSlot(subEvent)
    }

    const handleRemoveSubEvent = (removeSubEventID: string) => {
        setSubEvents((prevSubEvent) =>
            prevSubEvent.filter((event) => event.RecordID !== removeSubEventID)
        )
        handleCloseUpdate()
    }

    const handleUpdateSubEvent = (updatedSubEvent: SubEvent) => {
        setSubEvents((prevSubEvent) =>
            prevSubEvent.map((item) =>
                item.RecordID === updatedSubEvent.RecordID
                    ? updatedSubEvent
                    : item
            )
        )
        handleCloseUpdate()
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
                                        <Grid item xs={7}>
                                            <Typography variant="subtitle2">
                                                {selectedSlot.StartDate.format(
                                                    'HH:mm'
                                                )}{' '}
                                                -{' '}
                                                {selectedSlot.EndDate.format(
                                                    'HH:mm'
                                                )}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={5}
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
                                    {/* Show loading state if isLoadingSpeaker is true */}
                                    {isLoadingSpeaker ? (
                                        <Typography variant="body2">
                                            Loading...
                                        </Typography>
                                    ) : (
                                        speakerNames.map(
                                            (speakerName, index) => (
                                                <Chip
                                                    key={index}
                                                    avatar={
                                                        <Avatar
                                                            alt={speakerName}
                                                        />
                                                    }
                                                    label={
                                                        speakerName || 'Unknown'
                                                    }
                                                    sx={{ mr: 1, mt: 0.5 }}
                                                />
                                            )
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
                                >
                                    <Button
                                        variant="contained"
                                        onClick={handleOpenUpdate}
                                        startIcon={<Edit />}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        sx={{ marginLeft: 2 }}
                                        variant="contained"
                                        onClick={handleOpenModal}
                                        startIcon={<Share />}
                                    >
                                        Share
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
                    subEvent={selectedSubEvent}
                    speakers={speakers}
                    handleClose={handleCloseUpdate}
                    updateSubEvent={handleUpdateSubEvent}
                    removeSubEvent={handleRemoveSubEvent}
                />
            )}
            {selectedSubEvent && (
                <ShareSubEventModal
                    isOpen={openModal}
                    onClose={handleCloseModal}
                    subEvent={selectedSubEvent}
                    speakers={speakers}
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
