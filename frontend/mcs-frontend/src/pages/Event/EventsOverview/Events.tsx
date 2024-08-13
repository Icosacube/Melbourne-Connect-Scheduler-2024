import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined'
import { Box, Button, Typography } from '@mui/material'
import React, { FC } from 'react'
import { EventsTable } from './EventsTable'
import EventsWidgets from './EventsWidgets'
import { useLoaderData } from 'react-router-dom'
import { CreateEventModal } from './CreateEventModal'
import { MainEvent, Speaker, Venue } from '../../../types/frontendTypes'

export const Events: FC = () => {
    const { events, speakers } = useLoaderData() as {
        events: MainEvent[]
        speakers: Speaker[]
    }
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Box className="  mb-4 flex flex-col">
                <Box className=" flex flex-col">
                    <Button
                        variant="contained"
                        className="flex self-end h-12"
                        onClick={handleOpen}
                    >
                        <AddCircleOutlineOutlined className="mr-2" />
                        <Typography>New Event</Typography>
                    </Button>

                    <CreateEventModal open={open} handleClose={handleClose} />
                </Box>

                <EventsWidgets />
            </Box>
            <Box className="w-full bg-white shadow-md">
                <EventsTable events={events} speakers={speakers} />
            </Box>
        </>
    )
}
