import { Box, Typography, Divider, Grid, Paper } from '@mui/material'
import EventIcon from '@mui/icons-material/Event'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { MainEvent, Venue } from '../../types/frontendTypes'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface EventListViewProps {
    events: MainEvent[]
    venues: Venue[]
}

export const EventListView: FC<EventListViewProps> = ({ events, venues }) => {
    const navigate = useNavigate()

    const navigateToEventPage = (eventId: string) => {
        navigate(`/event/${eventId}`)
    }

    return (
        <>
            {events.map((event) => (
                <Paper
                    key={event.RecordID}
                    onClick={() => navigateToEventPage(event.RecordID)}
                    elevation={2}
                    sx={{
                        p: 2,
                        mb: 2,
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: 3,
                            cursor: 'pointer',
                        },
                        overflow: 'hidden',
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <EventIcon
                                fontSize="small"
                                sx={{ color: 'text.secondary' }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="text.secondary">
                                {event.StartDate.format('M/D/YY, h:mm A')} -{' '}
                                {event.EndDate.format('M/D/YY, h:mm A')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {event.EventName}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <LocationOnIcon
                                fontSize="small"
                                sx={{ color: 'text.secondary' }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="text.secondary">
                                {(() => {
                                    const eventVenues = venues.filter((v) =>
                                        event.Venue.includes(v.RecordID)
                                    )
                                    return eventVenues
                                        .map((v) => v.VenueName)
                                        .join(', ')
                                })()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </>
    )
}
