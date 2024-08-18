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
                                    sx={{ lineHeight: 1.2}}
                                    noWrap
                                >
                                    {speaker.Title}{' '}
                                    {speaker.AlternativeTitle && ' / '}{' '}
                                    {speaker.AlternativeTitle}{' '}
                                    {speaker.WorkTitle && ' / '}{' '}
                                    {speaker.WorkTitle}
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
                                    {speaker.Department}
                                    {speaker.Department && ', '}
                                    {speaker.Organisation}
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* Chips Section */}
                        <Grid item xs={12} md={4}>
                            <Stack
                                direction="row"
                                spacing={1}
                                rowGap={1}
                                justifyContent="flex-end"
                                flexWrap="wrap"
                            >
                                {speaker.Pronouns && (
                                    <Chip label={speaker.Pronouns} />
                                )}
                                {speaker.Category && (
                                    <Chip
                                        label={speaker.Category}
                                        sx={{
                                            backgroundColor: 'secondary.main',
                                        }}
                                    />
                                )}
                                {speaker.Area && (
                                    <Chip
                                        label={speaker.Area}
                                        sx={{
                                            backgroundColor: 'secondary.main',
                                        }}
                                    />
                                )}
                                {speaker.Country && (
                                    <Chip label={speaker.Country} />
                                )}
                                {speaker.PreferredTimezone && (
                                    <Chip label={speaker.PreferredTimezone} />
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
