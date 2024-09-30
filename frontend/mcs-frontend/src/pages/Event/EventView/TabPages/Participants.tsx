import { Box } from '@mui/material'
import React, { FC } from 'react'
import Headline from './Headline'
import { Speaker, Trip } from '../../../../types/frontendTypes'
import { SpeakerTable } from '../../../Speaker/SpeakerOverview/SpeakerTable'

interface ParticipantsProps {
    speakers: Speaker[]
    trips: Trip[]
}

export const Participants: FC<ParticipantsProps> = ({ speakers, trips }) => {
    return (
        <Box>
            <Headline />
            <SpeakerTable speakers={speakers} trips={trips} />
        </Box>
    )
}
