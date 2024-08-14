import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Grid,
    Stack,
    Typography,
} from '@mui/material'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Speaker } from '../../types/frontendTypes'

interface ProfileHeaderCardProps {
    speaker: Speaker
}

export const ProfileHeaderCard: FC<ProfileHeaderCardProps> = ({ speaker }) => {
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/speaker/${speaker.RecordID}`)
    }

    return (
        <Card>
            <CardActionArea
                onClick={handleCardClick}
                sx={{ flexGrow: 1, width: '100%', height: '100%' }}
            >
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        {/* Avatar and Speaker Details */}
                        <Grid item>
                            <Avatar
                                sx={{ minWidth: '128px', minHeight: '128px' }}
                            >
                                A
                            </Avatar>
                        </Grid>
                        <Grid item xs={6} sm container>
                            <Grid item>
                                <Typography
                                    variant="h6"
                                    color={'primary'}
                                    sx={{ lineHeight: 1.2 }}
                                >
                                    {speaker.Title}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{ lineHeight: 1.2 }}
                                >
                                    {speaker.FirstName} {speaker.LastName}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    sx={{
                                        marginTop: '4px',
                                        lineHeight: 1.2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '2',
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                >
                                    {speaker.Organisation}
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* Chips Section */}
                        <Grid item xs={12} sm={4}>
                            <Stack
                                direction="row"
                                spacing={1}
                                rowGap={0.5}
                                justifyContent="flex-end"
                                flexWrap="wrap"
                            >
                                <Chip label={speaker.Pronouns} size="small" />
                                <Chip
                                    label={
                                        speaker.Category === ''
                                            ? 'unknown category'
                                            : speaker.Category
                                    }
                                    size="small"
                                    sx={{
                                        backgroundColor: '#FBE418',
                                        color: 'text.primary',
                                    }}
                                />
                                <Chip
                                    label={
                                        speaker.Area === ''
                                            ? 'unknown area'
                                            : speaker.Area
                                    }
                                    size="small"
                                    sx={{
                                        backgroundColor: '#FBE418',
                                        color: 'text.primary',
                                    }}
                                />
                                <Chip label={speaker.Country} size="small" />
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
