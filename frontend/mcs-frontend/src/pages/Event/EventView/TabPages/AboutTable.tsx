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

const CustomTextArea: FC<CustomTextAreaProps> = ({ title, text, minRows }) => {
    return (
        <Stack>
            <Typography variant="subtitle1" className="text-gray-400">
                {title}
            </Typography>
            <TextField
                disabled
                minRows={minRows}
                multiline
                defaultValue={text}
                sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000000',
                    },
                    maxHeight: '800px',
                    overflow: 'auto',
                }}
            />
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
            <Grid item xs={12} md={6}>
                <CustomTextArea
                    title="Venue"
                    text={venueFormatted}
                    minRows={1}
                />

                <CustomTextArea
                    title="Event Description"
                    text={event?.EventDescription}
                    minRows={5}
                />
            </Grid>

            <Grid item xs={12} md={6}>
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
