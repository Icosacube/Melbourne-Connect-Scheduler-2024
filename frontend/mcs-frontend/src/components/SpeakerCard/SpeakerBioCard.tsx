import {
    Avatar,
    Box,
    Card,
    CardActionArea,
    CardContent,
    Stack,
    Typography,
} from '@mui/material'
import React, { FC } from 'react'
import { Speaker } from '../../types/frontendTypes'
import { useNavigate } from 'react-router-dom'

interface SpeakerBioCardProps {
    speaker: Speaker
}

export const SpeakerBioCard: FC<SpeakerBioCardProps> = ({ speaker }) => {
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/speaker/${speaker?.RecordID}`)
    }

    return (
        <Card>
            <CardActionArea
                className="p-2 h-max"
                onClick={handleCardClick}
            >
                <CardContent>
                    <Box className="flex space-x-6 ">
                        <Avatar className="size-24 mb-4 " />
                        <Stack>
                            <Typography variant="h5">
                                {speaker?.FirstName}
                            </Typography>
                            <Typography variant="h5">
                                {speaker?.LastName}
                            </Typography>
                            <Typography variant="subtitle1">
                                {speaker?.Organisation}
                            </Typography>
                        </Stack>
                    </Box>
                    {/* Bio */}
                    <Typography
                        variant="body1"
                        sx={{
                            marginLeft: '8px',
                            display: '-webkit-box',
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            maxHeight: '300px',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 9,
                        }}
                    >
                        {speaker?.Bio}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default SpeakerBioCard
