import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { ProfileHeaderCard } from '../../../components'
import { Speaker } from '../../../types/frontendTypes'

interface ProfileProps {
    speaker: Speaker
}

export const Profile: React.FC<ProfileProps> = ({ speaker }) => {
    const email = speaker.PrimaryEmail
    const phone = speaker.Phone
    const bio = speaker.Bio

    return (
        <Box className="flex space-x-6">
            <Box className="w-9/12">
                <Box className="pb-10">
                    <ProfileHeaderCard speaker={speaker} />
                </Box>
                <Paper className="p-10">
                    <Typography variant="h6">Bio</Typography>
                    <Typography
                        paragraph
                        className="bg-gray-100 rounded-xl p-5 mt-4"
                    >
                        {bio}
                    </Typography>
                </Paper>
            </Box>
            <Box className="w-3/12 flex-col space-y-5 h-fit">
                <Paper className="p-7 w-full">
                    <Typography variant="h4">Contact</Typography>
                    <Box className="flex space-x-4 mt-3">
                        <Typography variant="h6">Email: </Typography>
                        <Typography variant="h6" className="font-semibold">
                            {email}
                        </Typography>
                    </Box>
                    <Box className="flex space-x-4 mt-3">
                        <Typography variant="h6">Phone: </Typography>
                        <Typography variant="h6" className="font-semibold">
                            {phone}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}
