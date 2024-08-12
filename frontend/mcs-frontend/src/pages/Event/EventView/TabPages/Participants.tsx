import { Box } from '@mui/material'
import React, { FC } from 'react'
import Headline from './Headline'
import { Speaker } from '../../../../types/frontendTypes'
import { SpeakerTable } from '../../../Speaker/SpeakerOverview/SpeakerTable'

interface ParticipantsProps {
    speakers: Speaker[]
}

export const Participants: FC<ParticipantsProps> = ({ speakers }) => {
    return (
        <Box>
            <Headline />
            <SpeakerTable data={speakers} />
        </Box>
    )
}
