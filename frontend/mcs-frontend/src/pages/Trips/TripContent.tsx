import { Box, Button, Grid, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { ProfileHeaderCard } from '../../components'
import { EventCard } from '../../components/EventCard/EventCard'
import {
    Trip as TripType,
    Speaker,
    MainEvent,
    Flight,
    Accommodation,
} from '../../types/frontendTypes'
import {
    defaultMainEvent,
    getMainEventById,
} from '../../scripts/event/function'
import { getFlightsByTripID } from '../../scripts/flight/function'
import { getAccomByTripID } from '../../scripts/accommodation/function'
import CreateCard from './CreateCard'
import { CreateFlightModal } from './Flight/CreateFlightModal'
import { CreateAccomModal } from './Accomodation/CreateAccomModal'
import AccomCard from './Accomodation/AccomCard'
import FlightCard from './Flight/FlightCard'
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface TripContentProps {
    trip: TripType
    speaker: Speaker
}

export const TripContent: React.FC<TripContentProps> = ({ trip, speaker }) => {
    const [event, setEvent] = useState<MainEvent>(defaultMainEvent)
    const [flights, setFlights] = useState<Flight[]>([])
    const [accom, setAccom] = useState<Accommodation[]>([])
    const [openFlight, setOpenFlight] = useState(false)
    const [openAccom, setOpenAccom] = useState(false)

    useEffect(() => {
        getMainEventById(trip.MainEvent[0]).then((event) => {
            setEvent(event)
        })

        getFlightsByTripID(trip.RecordID)
            .then((flights) => {
                setFlights(flights)
            })
            .catch((error) => {
                console.error('Error fetching flights:', error)
            })

        getAccomByTripID(trip.RecordID)
            .then((accommodations) => {
                setAccom(accommodations)
            })
            .catch((error) => {
                console.error('Error fetching accommodations:', error)
            })
    }, [trip.RecordID, trip.MainEvent])

    const handleOpenFlight = () => {
        setOpenFlight(true)
    }

    const handleCloseFlight = () => {
        setOpenFlight(false)
    }

    const handleOpenAccom = () => {
        setOpenAccom(true)
    }

    const handleCloseAccom = () => {
        setOpenAccom(false)
    }

    return (
        <Box className="flex space-x-10">
            <Box className="w-3/4 space-y-6">
                <Box>
                    <ProfileHeaderCard speaker={speaker} />
                </Box>
                <Box className="w-full">
                    <Grid
                        container
                        className="flex justify-between items-stretch"
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Typography variant="h6">Flight Tickets</Typography>
                        </Grid>

                        {flights.length > 0 &&
                            flights.map((flight, index) => (
                                <Grid item xs={12} lg={6} key={index}>
                                    <FlightCard flight={flight} />
                                </Grid>
                            ))}

                        {flights.length <= 1 && (
                            <Grid item xs={12} lg={6}>
                                <CreateCard
                                    onClick={handleOpenFlight}
                                    name="Flight"
                                />
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <Typography variant="h6">Accommodation</Typography>
                        </Grid>

                        {accom.length > 0 &&
                            accom.map((accom, index) => (
                                <Grid item xs={12} key={index}>
                                    <AccomCard accom={accom} />
                                </Grid>
                            ))}

                        {accom.length === 0 && (
                            <Grid item xs={12}>
                                <CreateCard
                                    onClick={handleOpenAccom}
                                    name="Accommodation"
                                />
                            </Grid>
                        )}
                    </Grid>

                    <CreateFlightModal
                        handleClose={handleCloseFlight}
                        open={openFlight}
                        tripID={trip.RecordID}
                    />
                    <CreateAccomModal
                        handleClose={handleCloseAccom}
                        open={openAccom}
                        tripID={trip.RecordID}
                    />
                </Box>
            </Box>
            <Box className="w-1/4 space-y-6">
                <Typography variant="h6">Main Event</Typography>
                <EventCard event={event} />
                <Button
                    variant="outlined"
                    href={
                        process.env.REACT_APP_TRIP_ATTACHMENT_FORM +
                        trip.RecordID
                    }
                >
                    <FileUploadIcon />
                    Upload Attachments
                </Button>
            </Box>
        </Box>
    )
}
