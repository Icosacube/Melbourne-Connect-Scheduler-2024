import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PlaceIcon from '@mui/icons-material/Place'
import {
    Card,
    CardActionArea,
    CardContent,
    Stack,
    Typography,
} from '@mui/material'
import React from 'react'
import { MainEvent } from '../../types/frontendTypes'

interface EventTitleProps {
    event: MainEvent
}

export const EventTitle: React.FC<EventTitleProps> = ({ event }) => {
    return (
        <Card
            sx={{
                padding: 1,
                flexGrow: 1,
                minWidth: '320px',
                maxWidth: '480px',
                height: '136px',
            }}
        >
            <CardActionArea>
                <CardContent>
                    <Stack direction="row" spacing={0.5}>
                        <Typography
                            className="text-textAccent font-medium"
                            fontSize="large"
                            noWrap
                        >
                            {event.EventName}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                        <CalendarMonthIcon fontSize="small" />
                        <Typography color="text.secondary">
                            {event.Date.toString()}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                        <PlaceIcon fontSize="small" />
                        <Typography noWrap color="text.secondary">
                            {event.Venue}
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
