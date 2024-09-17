import ConnectingAirports from '@mui/icons-material/ConnectingAirports'
import Event from '@mui/icons-material/Event'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Box, Button, Divider, Stack, Typography } from '@mui/material/'
import React, { FC, useState } from 'react'
import { Calendar, EventCard } from '../../components'
import { CreateEventModal } from '../Event/EventsOverview/CreateEventModal'
import { CreateSpeakerModal } from '../Speaker/SpeakerOverview/CreateSpeakerModal'
import { CreateTripModal } from '../Trips/CreateTripModal'
import { MainEvent, Speaker } from '../../types/frontendTypes'
import { useLoaderData } from 'react-router-dom'

// eslint-disable-next-line no-lone-blocks
{
    /* PlaceHolders */
}

export const Dashboard: FC = () => {
    const { events, speakers } = useLoaderData() as {
        events: MainEvent[]
        speakers: Speaker[]
    }

    // Speaker modal logic
    const [createSpeakerModalOpen, setCreateSpeakerModalOpen] = useState(false)
    const handleCloseCreateSpeakerModal = () => {
        setCreateSpeakerModalOpen(false)
    }
    const handleOpenCreateSpeakerModal = () => {
        setCreateSpeakerModalOpen(true)
    }

    // Event modal logic
    const [createEventModalOpen, setCreateEventModalOpen] = useState(false)
    const handleCloseCreateEventModal = () => {
        setCreateEventModalOpen(false)
    }
    const handleOpenCreateEventModal = () => {
        setCreateEventModalOpen(true)
    }

    // Trip modal logic
    const [createTripModalOpen, setCreateTripModalOpen] = useState(false)
    const handleCloseCreateTripModal = () => {
        setCreateTripModalOpen(false)
    }
    const handleOpenCreateTripModal = () => {
        setCreateTripModalOpen(true)
    }

    return (
        <Box className="flex space-x-10">
            <Box className="w-3/12">
                <Stack direction="column" spacing={3}>
                    <Typography variant="h5">Recently Edited Pages</Typography>
                    {events.slice(0, 4).map((event) => (
                        <EventCard key={event.RecordID} event={event} />
                    ))}
                </Stack>
            </Box>
            <Box className="w-9/12 space-y-5">
                <Box className="space-y-2">
                    <Typography variant="h5">Quick Actions</Typography>
                    <Stack direction="row" spacing={3}>
                        <Button
                            variant="contained"
                            onClick={handleOpenCreateSpeakerModal}
                            startIcon={<PersonAddIcon />}
                            sx={{
                                backgroundColor: '#FAAB19',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#BC8012',
                                },
                            }}
                        >
                            Add Speaker
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleOpenCreateEventModal}
                            startIcon={<Event />}
                            sx={{
                                backgroundColor: '#FAAB19',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#BC8012',
                                },
                            }}
                        >
                            Add Event
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleOpenCreateTripModal}
                            startIcon={<ConnectingAirports />}
                            sx={{
                                backgroundColor: '#FAAB19',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#BC8012',
                                },
                            }}
                        >
                            Add Trip
                        </Button>
                    </Stack>
                </Box>
                <Box className="bg-white rounded-lg p-8 flex space-x-3 justify-between shadow-sm">
                    <Box className="w-8/12">
                        <Calendar events={events} />
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box className="flex flex-col w-4/12 ">
                        <Typography variant="h5" className="mb-2">
                            Upcoming Events
                        </Typography>
                        <Box className=" overflow-scroll h-[35rem]">
                            <Divider className="mb-2" />
                            {events.map((event) => (
                                <Box key={event.RecordID}>
                                    <Typography className="text-s text-gray-400">
                                        {event.Date.toString()}
                                    </Typography>
                                    <Typography className="text-lg font-semibold">
                                        {event.EventName}
                                    </Typography>
                                    <Typography className="text-s text-gray-400">
                                        {event.Venue}
                                    </Typography>
                                    <Divider className="mb-2" />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <CreateSpeakerModal
                handleClose={handleCloseCreateSpeakerModal}
                open={createSpeakerModalOpen}
            />
            <CreateEventModal
                handleClose={handleCloseCreateEventModal}
                open={createEventModalOpen}
            />
            <CreateTripModal
                handleClose={handleCloseCreateTripModal}
                open={createTripModalOpen}
                events={events}
                speakers={speakers}
            />
        </Box>
    )
}
