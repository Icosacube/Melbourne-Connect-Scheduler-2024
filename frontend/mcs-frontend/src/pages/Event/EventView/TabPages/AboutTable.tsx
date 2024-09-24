import { Box, Grid, Stack, TextField, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { MainEvent, Venue } from '../../../../types/frontendTypes'

interface AboutTableProps {
    event: MainEvent
    venues: Venue[]
}

interface CustomTextAreaProps {
    title: string
    text: string
    minRows?: number
}

const CustomTextArea: FC<CustomTextAreaProps> = ({ title, text }) => {
    return (
        <Stack spacing={1}>
            <Typography variant="subtitle1" className="text-gray-400">
                {title}
            </Typography>
            <Box
                sx={{
                    backgroundColor: '#EFF0F1',
                    padding: '12px',
                    borderRadius: '8px',
                    width: '100%',
                    maxHeight: '800px',
                    lineHeight: '1.2',
                    overflowY: 'auto', // Scroll
                    color: '#000000',
                    whiteSpace: 'pre-line',
                }}
            >
                <Typography variant="body1">{text || 'N/A'}</Typography>
            </Box>
        </Stack>
    )
}

export const AboutTable: FC<AboutTableProps> = ({ event, venues }) => {
    const [venueFormatted, setVenueFormatted] = useState('')

    useEffect(() => {
        const venuesFiltered = venues.filter((venue) =>
            event.Venue.includes(venue.RecordID)
        )
        setVenueFormatted(
            venuesFiltered.map((venue) => venue.VenueName).join(', ')
        )
    }, [event.Venue, venues])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={6} container spacing={2}>
                <Grid item xs={12}>
                    <CustomTextArea
                        title="Venue"
                        text={venueFormatted}
                        minRows={1}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTextArea
                        title="Event Description"
                        text={event?.EventDescription}
                        minRows={5}
                    />
                </Grid>
            </Grid>

            <Grid item xs={12} lg={6}>
                <CustomTextArea
                    title="Talk Abstract"
                    text={event?.EventAbstract}
                    minRows={10}
                />
            </Grid>
        </Grid>
    )
}

export default AboutTable
