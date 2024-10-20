import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs from 'dayjs'
import { CanvassingTemp, MainEvent } from '../../types/frontendTypes'
import { Typography } from '@mui/material'

interface CanvassingCreationCalendarProps {
    MainEvent: MainEvent
    canvassingSlots: CanvassingTemp[]
    setCanvassingSlots: (slots: CanvassingTemp[]) => void
    timeSlotSize: String
}

export const CanvassingCreationCalendar: React.FC<
    CanvassingCreationCalendarProps
> = ({ MainEvent, canvassingSlots, setCanvassingSlots, timeSlotSize }) => {
    const handleSlotResize = (info: any) => {
        const { event } = info

        const updatedSlots = canvassingSlots.map((slot) => {
            if (slot.id === event.id) {
                return {
                    ...slot,
                    id: dayjs(event.start).valueOf().toString(),
                    StartTime: dayjs(event.start),
                    EndTime: dayjs(event.end),
                }
            }
            return slot
        })
        setCanvassingSlots(updatedSlots)
    }

    const handleSlotDrag = (info: any) => {
        const { event } = info

        const updatedSlot = {
            id: dayjs(event.start).valueOf().toString(),
            StartTime: dayjs(event.start),
            EndTime: dayjs(event.end),
            MainEvent: [MainEvent.RecordID],
            Venue: [],
            MixedAcademic: [],
            AvailableAcademic: [],
        }

        const updatedSlots = canvassingSlots.map((slot) =>
            slot.id === event.id ? updatedSlot : slot
        )
        setCanvassingSlots(updatedSlots)
    }

    const handleDateClick = (info: any) => {
        const newCanvassingSlot: CanvassingTemp = {
            id: dayjs(info.date).valueOf().toString(),
            StartTime: dayjs(info.date),
            EndTime: dayjs(info.date).add(Number(timeSlotSize), 'minute'),
            MainEvent: [MainEvent.RecordID],
            Venue: [],
            MixedAcademic: [],
            AvailableAcademic: [],
        }
        setCanvassingSlots([...canvassingSlots, newCanvassingSlot])
    }

    const renderEventContent = (eventInfo: any) => {
        return (
            <Typography
                color={'white'}
                sx={{
                    width: '100%',
                    height: 48,
                    textAlign: 'center',
                    fontFamily: 'Futura, sans-serif',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}
            >
                {eventInfo.timeText && <span>{eventInfo.timeText}</span>}
            </Typography>
        )
    }

    return (
        <FullCalendar
            eventColor="#000000"
            eventTextColor="#ffffff"
            allDaySlot={false}
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            contentHeight="auto"
            events={canvassingSlots.map((slot) => ({
                id: dayjs(slot.StartTime).valueOf().toString(),
                start: slot.StartTime.toDate(),
                end: slot.EndTime.toDate(),
            }))}
            headerToolbar={{
                left: 'title',
                center: '',
                right: 'today prev,next',
            }}
            titleFormat={{ year: 'numeric', month: 'short' }}
            dayHeaderFormat={{ weekday: 'short', day: 'numeric' }}
            initialDate={dayjs(MainEvent.StartDate).format('YYYY-MM-DD')}
            slotMinTime="09:00:00"
            slotMaxTime="20:00:00"
            locale="en-GB"
            editable={true}
            eventResize={handleSlotResize}
            eventDrop={handleSlotDrag}
            dateClick={handleDateClick}
            eventContent={renderEventContent}
        />
    )
}
