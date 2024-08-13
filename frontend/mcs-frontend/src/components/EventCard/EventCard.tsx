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
import { yellow } from '@mui/material/colors'
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
                sx={{ flexGrow: 1, width: '100%', height: '100px' }}
            >
                <CardContent>
                    <Stack direction="row" spacing={0.5}>
                        {event.Completed ? (
                            <CheckCircleIcon
                                fontSize="medium"
                                sx={{ color: 'success.main' }}
                            />
                        ) : (
                            <PendingIcon
                                fontSize="medium"
                                sx={{ color: yellow[700] }}
                            />
                        )}
                        <Typography
                            className="text-textAccent font-medium"
                            fontSize="large"
                            noWrap
                        >
                            {event.EventName}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                        <CalendarMonthIcon fontSize="small" />
                        <Typography color="text.secondary">
                            {event.Date !== undefined
                                ? event.Date.format('DD MMM YY')
                                : 'unknown'}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                        <PlaceIcon fontSize="small" />
                        <Typography noWrap color="text.secondary">
                            {isLoading ? 'loading..' : venueString}
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default EventCard
