import { Box } from '@mui/material'
import React, { FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import { AddButton } from '../../../components'
import { MainEvent, Speaker, Venue } from '../../../types/frontendTypes'
import { CreateEventModal } from './CreateEventModal'
import { EventsTable } from './EventsTable'
import EventsWidgets from './EventsWidgets'

export const Events: FC = () => {
    const { events, speakers, venues } = useLoaderData() as {
        events: MainEvent[]
        speakers: Speaker[]
        venues: Venue[]
    }
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Box className="  mb-4 flex flex-col">
                <Box className=" flex flex-col">
                    <AddButton name={'Event'} onClick={handleOpen} />
                    <CreateEventModal
                        open={open}
                        handleClose={handleClose}
                        venues={venues}
                    />
                </Box>

                <EventsWidgets />
            </Box>
            <Box className="w-full bg-white shadow-md">
                <EventsTable events={events} speakers={speakers} />
            </Box>
        </>
    )
}
