import { Box } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { AddButton } from '../../../../components'
import WeeklyCalendar from '../../../../components/Calendar/WeeklyCalendar'
import { getSubEventsByMainEventID } from '../../../../scripts/subevent/functions'
import { MainEvent, Speaker, SubEvent } from '../../../../types/frontendTypes'
import { CreateSubEventModal } from './CreateSubEventModal'
import { EditSubEventModal } from './EditSubEventModal'

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

    const handleOpenUpdate = (subEvent: SubEvent) => {
        setSelectedSubEvent(subEvent)
        setOpenUpdate(true)
    }

    const handleCloseUpdate = () => {
        setSelectedSubEvent(null)
        setOpenUpdate(false)
    }

    return (
        <>
            <Box className="mb-4 flex flex-col">
                <AddButton name={'Sub-Event'} onClick={handleOpenCreate} />
                <CreateSubEventModal
                    open={openCreate}
                    handleClose={handleCloseCreate}
                    event={event}
                    speakers={speakers}
                    onSubEventCreation={handleSubEventCreated}
                />
            </Box>
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
            <Box className="space-y-5">
                <WeeklyCalendar
                    event={event}
                    subEvents={subEvents}
                    onEventClick={handleOpenUpdate}
                />
            </Box>
        </>
    )
}
export default Programme
