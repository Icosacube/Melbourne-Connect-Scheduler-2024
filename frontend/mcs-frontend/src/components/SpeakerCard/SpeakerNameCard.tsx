import { Avatar, Box, Chip, Paper, Stack, Typography } from '@mui/material'
import React, { FC } from 'react'

interface SpeakerNameCardProps {
    firstName: string
    lastName: string
    position: string
}

export const SpeakerNameCard: FC<SpeakerNameCardProps> = ({
    firstName,
    lastName,
    position,
}) => {
    return (
        <Paper className="pl-4 pr-4 flex space-x-6 mt-4 pt-4 pb-2">
            <Avatar className="size-24 mb-4 " />
            <Stack>
                <Typography variant="h5">{firstName}</Typography>
                <Typography variant="h5">{lastName}</Typography>
                <Typography variant="subtitle1">{position}</Typography>
            </Stack>
        </Paper>
    )
}
