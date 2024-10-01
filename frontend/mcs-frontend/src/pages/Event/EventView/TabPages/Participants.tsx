import { Box } from '@mui/material'
import { FC } from 'react'
import { Speaker, Trip } from '../../../../types/frontendTypes'
import { SpeakerTable } from '../../../Speaker/SpeakerOverview/SpeakerTable'

interface ParticipantsProps {
    speakers: Speaker[]
    trips: Trip[]
}

export const Participants: FC<ParticipantsProps> = ({ speakers, trips }) => {
    return (
        <Box>
            <SpeakerTable speakers={speakers} trips={trips} />
        </Box>
    )
}
