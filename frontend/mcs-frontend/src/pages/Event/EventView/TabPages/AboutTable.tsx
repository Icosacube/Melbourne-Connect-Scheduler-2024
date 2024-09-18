import { Box, Stack, TextField, Typography } from '@mui/material'
import { FC, useEffect } from 'react'
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
                }}
            />
        </Stack>
    )
}

export const AboutTable: FC<AboutTableProps> = ({ event, venues }) => {
    const venuesFiltered = venues.filter((venue) =>
        event.Venue.includes(venue.RecordID)
    )
    const venueFormatted = venuesFiltered
        .map((venue) => venue.VenueName)
        .join(', ')

    return (
        <Box className="w-full flex space-x-6">
            <Box className="w-1/2 space-y-4">
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
            </Box>
            <Box className="w-1/2 space-y-4">
                <CustomTextArea
                    title="Talk Abstract"
                    text={event?.EventAbstract}
                    minRows={10}
                />
            </Box>
        </Box>
    )
}

export default AboutTable
