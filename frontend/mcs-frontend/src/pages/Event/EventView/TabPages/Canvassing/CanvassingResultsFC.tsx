import { Badge, Grid, Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { CanvassingResultsCalendar } from '../../../../../components'
import {
    Canvassing,
    MainEvent,
    Speaker,
} from '../../../../../types/frontendTypes'
import { CanvassingResultsFCSidebar } from './CanvassingResultsFCSidebar'

interface CanvassingResultsProps {
    event: MainEvent
    speakers: Speaker[]
    canvassingSlots: Canvassing[]
}

export const CanvassingResultsFC: React.FC<CanvassingResultsProps> = ({
    event,
    speakers,
    canvassingSlots,
}) => {
    const [filteredCanvassings, setFilteredCanvassings] = useState<
        Canvassing[]
    >([])
    const [selectedSlot, setSelectedSlot] = useState<Canvassing | null>(null)
    const [academicFilter, setAcademicFilter] = useState<string[]>([])
    const [academicMap, setAcademicMap] = useState<{ [id: string]: string }>({})
    const [minDate, setMinDate] = useState('')
    const [maxDate, setMaxDate] = useState('')

    useEffect(() => {
        setFilteredCanvassings(canvassingSlots)
        setMinDate(canvassingSlots[0].StartTime.startOf('day').toISOString())
        setMaxDate(
            canvassingSlots[canvassingSlots.length - 1].EndTime.endOf(
                'day'
            ).toISOString()
        )

        const map: { [id: string]: string } = {}
        canvassingSlots.forEach((slot) => {
            slot.Academic.forEach((id, index) => {
                map[id] = slot.AcademicName[index]
            })
        })
        setAcademicMap(map)
    }, [event, canvassingSlots])

    useEffect(() => {
        if (academicFilter.length === 0) {
            setFilteredCanvassings(canvassingSlots)
        } else {
            setFilteredCanvassings(
                canvassingSlots.filter((slot) =>
                    academicFilter.every((id) =>
                        slot.AvailableAcademic.includes(id)
                    )
                )
            )
        }
    }, [academicFilter, canvassingSlots])

    const handleEventClick = (info: any) => {
        const slot = canvassingSlots.find(
            (slot) => slot.RecordID === info.event.id
        )
        setSelectedSlot(slot || null)
    }
    const renderEventContent = (eventInfo: any) => {
        const slot = canvassingSlots.find(
            (slot) => slot.RecordID === eventInfo.event.id
        )
        const academicCount = slot ? slot.AvailableAcademic.length : 0
        const total = slot ? slot.Academic.length : 0
        return (
            <Badge
                badgeContent={academicCount}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    width: '100%',
                    '& .MuiBadge-badge': {
                        backgroundColor:
                            academicCount > 0
                                ? `rgba(251, 171, 24, ${Math.max(
                                      0.4,
                                      academicCount / total
                                  )})`
                                : '#CCCCCC',
                    },
                }}
            >
                <Typography
                    sx={{
                        width: '100%',
                        height: 48,
                        textAlign: 'center',
                        fontFamily: 'Futura, sans-serif',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                    }}
                >
                    {eventInfo.timeText && <div>{eventInfo.timeText}</div>}
                </Typography>
            </Badge>
        )
    }

    return (
        <Grid
            container
            spacing={3}
            direction="row-reverse"
            sx={{
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}
        >
            <Grid item xs={12} md={4} lg={3}>
                <CanvassingResultsFCSidebar
                    event={event}
                    speakers={speakers}
                    academicFilter={academicFilter}
                    setAcademicFilter={setAcademicFilter}
                    selectedSlot={selectedSlot}
                    academicMap={academicMap}
                />
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
                <Paper sx={{ p: 5 }}>
                    <CanvassingResultsCalendar
                        canvassings={filteredCanvassings}
                        eventDate={dayjs(canvassingSlots[0].StartTime).format(
                            'YYYY-MM-DD'
                        )}
                        dateRange={{ start: minDate, end: maxDate }}
                        handleEventClick={handleEventClick}
                        renderEventContent={renderEventContent}
                        setSelectedSlot={setSelectedSlot}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}
