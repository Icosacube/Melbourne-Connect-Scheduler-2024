import { Box } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { AddButton } from '../../../../components'
import WeeklyCalendar from '../../../../components/Calendar/WeeklyCalendar'
import { getSubEventsByMainEventID } from '../../../../scripts/subevent/functions'
import { MainEvent, Speaker, SubEvent } from '../../../../types/frontendTypes'
import { CreateSubEventModal } from './CreateSubEventModal'

interface ProgrammeProps {
    event: MainEvent
    speakers: Speaker[]
}

export const Programme: FC<ProgrammeProps> = ({ event, speakers }) => {
    const [subEvents, setSubEvents] = useState<SubEvent[]>([])
    const [openCreate, setOpenCreate] = useState(false)

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
            <Box className="space-y-5">
                <WeeklyCalendar event={event} subEvents={subEvents} />
            </Box>
        </>
    )
}
export default Programme
