import React, { useState, useEffect } from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    Stack,
    Typography,
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import PlaceIcon from '@mui/icons-material/Place'
import { MainEvent, Venue } from '../../types/frontendTypes'
import { useNavigate } from 'react-router-dom'
import { getVenueByMainEventId } from '../../scripts/venue/functions'

interface EventCardProps {
    event: MainEvent
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/event/${event.RecordID}`)
    }

    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [venueString, setVenueString] = useState<String>('')

    useEffect(() => {
        event.RecordID && getVenueString()
    }, [event.RecordID])

    const getVenueString = async () => {
        try {
            const venues = await getVenueByMainEventId(event.RecordID)
            const venueStrings = venues.map(
                (venue: Venue) => venue?.VenueName || 'unknown venue'
            )
            setVenueString(venueStrings.join(', '))
        } catch (error) {
            console.error('Error fetching Venues:', error)
            setVenueString('unknown venue')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardActionArea
                onClick={handleCardClick}
                sx={{ flexGrow: 1, width: '100%', height: '100%' }}
            >
                <CardContent>
                    <Stack direction="column" spacing={1}>
                        <Stack direction="row" spacing={0.5}>
                            {event.Completed ? (
                                <CheckCircleIcon
                                    fontSize="medium"
                                    sx={{ color: 'success.main' }}
                                />
                            ) : (
                                <PendingIcon
                                    fontSize="medium"
                                    sx={{ color: 'primary.main' }}
                                />
                            )}
                            <Typography variant="h6" noWrap>
                                {event.EventName}
                            </Typography>
                        </Stack>
                        <Stack direction="column" spacing={0.5}>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <CalendarMonthIcon fontSize="small" />
                                <Typography variant="subtitle1">
                                    {event.Date !== undefined
                                        ? event.Date.format('DD MMM YY, HH:MM')
                                        : 'unknown'}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.5}>
                                <PlaceIcon fontSize="small" />
                                <Typography noWrap variant="subtitle1">
                                    {isLoading ? 'loading..' : venueString}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default EventCard
