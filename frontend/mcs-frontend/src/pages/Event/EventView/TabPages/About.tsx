import {
    Avatar,
    Box,
    Chip,
    Grid,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import React, { FC } from 'react'
import { MainEvent, Speaker, Venue } from '../../../../types/frontendTypes'
import AboutTable from './AboutTable'
import Banner from './Banner'
import Headline from './Headline'
import { SpeakerNameCard } from '../../../../components'

interface AboutProps {
    event: MainEvent
    speakers: Speaker[]
    venues: Venue[]
}

export const About: FC<AboutProps> = ({ event, speakers, venues }) => {
    const firstSpeaker = speakers[0]
    const theRestOfSpeakers = speakers.slice(1)
    return (
        <Grid
            container
            spacing={8}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {/* Left side */}
            <Grid item xs={12} lg={9}>
                <Box className="bg-white pb-8">
                    <Banner image={event.EventBanner[0]?.url as string} />
                    <Box className="pl-8 pr-8">
                        {/* Date and Status */}
                        <Headline
                            date={event?.Date.toString()}
                            name={event?.EventName}
                        />

                        {/* Info Table */}
                        <AboutTable event={event} venues={venues} />
                    </Box>
                </Box>
            </Grid>

            {/* Right side */}
            <Grid item xs={12} lg={3}>
                <Box className=" bg-white rounded-2xl shadow-lg pt-8 pb-8 h-max">
                    <Box className="pl-8 pr-4 flex space-x-6 ">
                        <Avatar className="size-24 mb-4 " />
                        <Stack>
                            <Typography variant="h5">
                                {firstSpeaker?.FirstName}
                            </Typography>
                            <Typography variant="h5">
                                {firstSpeaker?.LastName}
                            </Typography>
                            <Typography variant="subtitle1">
                                {firstSpeaker?.Organisation}
                            </Typography>
                        </Stack>
                    </Box>
                    {/* Bio */}
                    <Typography
                        variant="body1"
                        className="pl-8 pr-4 overflow-hidden"
                        sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 9,
                        }}
                    >
                        {firstSpeaker?.Bio}
                    </Typography>
                </Box>

                {/* Attendees */}
                <Box className="flex pl-6 mt-4 space-x-4">
                    <Typography variant="h5">Attendees</Typography>
                    {/* To do: add academics in here */}
                    <Chip label={event.Speaker.length} />
                </Box>
                {theRestOfSpeakers.map((speaker) => (
                    <SpeakerNameCard
                        key={speaker.RecordID}
                        firstName={speaker?.FirstName}
                        lastName={speaker?.LastName}
                        position={speaker?.Organisation}
                    />
                ))}
            </Grid>
        </Grid>
    )
}
