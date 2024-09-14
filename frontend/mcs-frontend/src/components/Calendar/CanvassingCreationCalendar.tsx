import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs from 'dayjs'
import { CanvassingTemp, MainEvent } from '../../types/frontendTypes'

interface CanvassingCreationCalendarProps {
    MainEvent: MainEvent
    canvassingSlots: CanvassingTemp[]
    setCanvassingSlots: (slots: CanvassingTemp[]) => void
}

export const CanvassingCreationCalendar: React.FC<
    CanvassingCreationCalendarProps
> = ({ MainEvent, canvassingSlots, setCanvassingSlots }) => {
    const handleSlotResize = (info: any) => {
        const { event } = info
        const updatedSlots = canvassingSlots.map((slot) => {
            if (slot.StartTime.isSame(event.start)) {
                return {
                    ...slot,
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
            StartTime: dayjs(event.start),
            EndTime: dayjs(event.end),
            MainEvent: [MainEvent.RecordID],
            MixedAcademic: [],
            AvailableAcademic: [],
        }

        const updatedSlots = canvassingSlots.map((slot) =>
            slot.StartTime.isSame(updatedSlot.StartTime) ? updatedSlot : slot
        )
        setCanvassingSlots(updatedSlots)
    }

    const handleDateClick = (info: any) => {
        const newCanvassingSlot: CanvassingTemp = {
            StartTime: dayjs(info.date),
            EndTime: dayjs(info.date).add(1, 'hour'),
            MainEvent: [MainEvent.RecordID],
            MixedAcademic: [],
            AvailableAcademic: [],
        }
        setCanvassingSlots([...canvassingSlots, newCanvassingSlot])
    }
    const renderEventContent = (eventInfo: any) => {
        return (
            <div
                style={{
                    padding: '2px',
                    textAlign: 'center',
                    fontFamily: 'Futura, sans-serif',
                }}
            >
                {eventInfo.timeText && <div>{eventInfo.timeText}</div>}
            </div>
        )
    }

    return (
        <FullCalendar
            eventColor="#000000"
            eventTextColor="#ffffff"
            allDaySlot={false}
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            height="auto"
            events={canvassingSlots.map((slot) => ({
                start: slot.StartTime.toDate(),
                end: slot.EndTime.toDate(),
            }))}
            headerToolbar={{
                left: 'title',
                center: '',
                right: 'today prev,next',
            }}
            initialDate={dayjs(MainEvent.Date).format('YYYY-MM-DD')}
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
