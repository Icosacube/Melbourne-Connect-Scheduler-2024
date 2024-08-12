import AddLocationIcon from '@mui/icons-material/AddLocation'
import ConnectingAirports from '@mui/icons-material/ConnectingAirports'
import Event from '@mui/icons-material/Event'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Box, Button, Divider, Stack, Typography } from '@mui/material/'
import React, { FC, useState } from 'react'
import { AddButton, Calendar, EventTitle } from '../../components'
import { CreateSpeakerModal } from '../Speaker/SpeakerOverview/CreateSpeakerModal'
import { CreateTripModal } from '../Trips/CreateTripModal'
import { CreateEventModal } from '../Event/EventsOverview/CreateEventModal'

// eslint-disable-next-line no-lone-blocks
{
    /* PlaceHolders */
}

export const Dashboard: FC = () => {
    const events = [
        {
            title: 'The Rise of AI',
            date: '2024-04-10',
            end: '2024-04-12',
            backgroundColor: '#FAAB19',
            time: '10:00 AM',
            speakerFirstName: 'John',
            speakerLastName: 'Doe',
            venue: 'Auditorium A',
            isCompleted: false,
        },
        {
            title: 'Is ChatGPT Evil',
            date: '2024-04-22',
            end: '2024-04-25',
            backgroundColor: '#734023',
            time: '2:00 PM',
            speakerFirstName: 'Alice',
            speakerLastName: 'Smith',
            venue: 'Conference Room B',
            isCompleted: true,
        },
        {
            title: 'The Future of Robotics',
            date: '2024-04-30',
            end: '2024-05-02',
            backgroundColor: 'blue',
            time: '9:00 AM',
            speakerFirstName: 'Robert',
            speakerLastName: 'Jones',
            venue: 'Auditorium A',
            isCompleted: false,
        },
        {
            title: 'Is C++ Still Relevant',
            date: '2024-05-10',
            end: '2024-05-12',
            backgroundColor: 'tomato',
            time: '11:00 AM',
            speakerFirstName: 'Michael',
            speakerLastName: 'Johnson',
            venue: 'Main Hall',
            isCompleted: false,
        },
        {
            title: 'Will AI Take Over the World',
            date: '2024-05-22',
            end: '2024-05-24',
            backgroundColor: 'green',
            time: '3:00 PM',
            speakerFirstName: 'Emma',
            speakerLastName: 'Brown',
            venue: 'Lecture Theatre 1',
            isCompleted: false,
        },
        {
            title: 'Ethical Considerations in AI',
            date: '2024-05-30',
            end: '2024-06-01',
            backgroundColor: 'purple',
            time: '1:00 PM',
            speakerFirstName: 'Sarah',
            speakerLastName: 'Taylor',
            venue: 'Conference Room B',
            isCompleted: false,
        },
        {
            title: 'AI and Humanity',
            date: '2024-06-10',
            end: '2024-06-12',
            backgroundColor: '#FF5733',
            time: '9:00 AM',
            speakerFirstName: 'David',
            speakerLastName: 'Williams',
            venue: 'Auditorium A',
            isCompleted: false,
        },
        {
            title: 'The Future of Quantum Computing',
            date: '2024-06-20',
            end: '2024-06-22',
            backgroundColor: '#2E86C1',
            time: '10:00 AM',
            speakerFirstName: 'Sophia',
            speakerLastName: 'Clark',
            venue: 'Main Hall',
            isCompleted: false,
        },
        {
            title: 'The Power of Machine Learning',
            date: '2024-06-28',
            end: '2024-06-30',
            backgroundColor: '#3498DB',
            time: '2:00 PM',
            speakerFirstName: 'Daniel',
            speakerLastName: 'Anderson',
            venue: 'Conference Room B',
            isCompleted: false,
        },
    ]

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
                        <EventTitle event={event} />
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
                                <>
                                    <Typography className="text-s text-gray-400">
                                        {event.date} - {event.end} |{' '}
                                        {event.time}
                                    </Typography>
                                    <Typography className="text-lg font-semibold">
                                        {event.title}
                                    </Typography>
                                    <Typography className="text-s text-gray-400">
                                        {event.venue}
                                    </Typography>
                                    <Divider className="mb-2" />
                                </>
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
            {/* <CreateTripModal
                handleClose={handleCloseCreateTripModal}
                open={createTripModalOpen}
            /> */}
        </Box>
    )
}
