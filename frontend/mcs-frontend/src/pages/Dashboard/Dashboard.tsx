import ConnectingAirports from '@mui/icons-material/ConnectingAirports'
import Event from '@mui/icons-material/Event'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Box, Button, Divider, Stack, Typography } from '@mui/material/'
import { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { DashboardCalendar } from '../../components'
import { MainEvent, Speaker, Venue } from '../../types/frontendTypes'
import { CreateTripModal } from '../Trips/CreateTripModal'
import { EventFormModal } from '../Event'
import { SpeakerFormModal } from '../Speaker'
import { EventListView } from './EventsListView'

// eslint-disable-next-line no-lone-blocks
{
    /* PlaceHolders */
}

export const Dashboard: FC = () => {
    const { events, speakers, venues } = useLoaderData() as {
        events: MainEvent[]
        speakers: Speaker[]
        venues: Venue[]
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
            <Box className="w-full space-y-5">
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
                        <DashboardCalendar
                            events={events}
                            venues={venues}
                            speakers={speakers}
                        />
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box className="flex flex-col w-4/12 ">
                        <Typography variant="h5" className="mb-2">
                            Upcoming Events
                        </Typography>
                        <Box className=" overflow-y-scroll h-[35rem] w-full overflow-x-hidden">
                            <EventListView events={events} venues={venues} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <SpeakerFormModal
                handleClose={handleCloseCreateSpeakerModal}
                open={createSpeakerModalOpen}
                variant="create"
            />
            <EventFormModal
                handleClose={handleCloseCreateEventModal}
                open={createEventModalOpen}
                venues={venues}
                speakers={speakers}
                variant="create"
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
