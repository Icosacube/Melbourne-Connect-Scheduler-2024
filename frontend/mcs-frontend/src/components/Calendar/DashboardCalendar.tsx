import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import dayjs, { Dayjs } from 'dayjs'
import { FC, useState } from 'react'
import { useNavigate, useRevalidator } from 'react-router-dom'
import {
    defaultMainEvent,
    updateMainEventById,
} from '../../scripts/event/functions'
import { MainEvent, Speaker, Venue } from '../../types/frontendTypes'
import { BottomSuccessSnackbar } from '../BottomSuccessSnackbar'
import { EventFormModal } from '../../pages'

interface DashboardCalendarProps {
    events: MainEvent[]
    venues: Venue[]
    speakers: Speaker[]
}

export const DashboardCalendar: FC<DashboardCalendarProps> = ({
    events,
    venues,
    speakers,
}) => {
    const navigate = useNavigate()
    const revalidator = useRevalidator()
    const [showCreateEventModal, setShowCreateEventModal] = useState(false)
    const [createEventModalDate, setCreateEventModalDate] = useState<Dayjs>(
        dayjs()
    )
    const [showLoadingSnackbar, setShowLoadingSnackbar] = useState(false)
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false)

    const [formattedEvents, setFormattedEvents] = useState(
        events.map((event) => {
            return {
                id: event.RecordID,
                title: event.EventName,
                start: event.StartDate.format('YYYY-MM-DD'), // Format start date as YYYY-MM-DD
                end: event.EndDate.format('YYYY-MM-DD'), // Format end date as YYYY-MM-DD
            }
        })
    )

    const handleEventClick = (info: any) => {
        console.log(info.event.id)
        navigate(`/event/${info.event.id}`)
    }

    const handleDateClick = (arg: any) => {
        // Convert arg.date to a Day.js object
        const selectedDate = dayjs(arg.date) // arg.date can be a Date object or a string

        // Set the state with the Day.js date
        setCreateEventModalDate(selectedDate)
        setShowCreateEventModal(true)
    }

    const handleEventEdit = async (info: any) => {
        const { event } = info
        // Extract necessary information
        const updatedEvent = {
            ...event,
            start: event.start,
            end: event.end,
        }

        // Update the events state with the new event data
        setFormattedEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
            )
        )

        // Update the event in the database
        const selectedEvent = events.find((e) => e.RecordID === event.id)
        if (!selectedEvent) {
            console.error('Event not found')
            return
        }
        const formatedSelectedEvent = {
            ...selectedEvent,
            StartDate: info.event.start,
            EndDate: info.event.end,
        }
        handleShowLoading()
        const res = await updateMainEventById(formatedSelectedEvent)
        handleCloseLoading()

        if (res.status !== 200) {
            console.error('Error updating event')
            return
        } else {
            handleShowSuccess()
        }
        revalidator.revalidate()
    }

    const handleShowLoading = () => {
        setShowLoadingSnackbar(true)
    }

    const handleCloseLoading = () => {
        setShowLoadingSnackbar(false)
    }

    const handleShowSuccess = () => {
        setShowSuccessSnackbar(true)
    }

    return (
        <>
            <FullCalendar
                eventColor="#FBAB18"
                eventTextColor="#000000"
                editable={true}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={formattedEvents}
                height={550}
                eventClick={handleEventClick}
                eventDrop={handleEventEdit}
                dateClick={handleDateClick}
                eventStartEditable={true}
                eventResizableFromStart={true}
                eventResize={handleEventEdit}
            />

            <EventFormModal
                key={createEventModalDate.toString()}
                event={{ ...defaultMainEvent, StartDate: createEventModalDate }}
                open={showCreateEventModal}
                handleClose={() => setShowCreateEventModal(false)}
                venues={venues}
                speakers={speakers}
                variant="create"
            />
            <BottomSuccessSnackbar
                showSuccess={showSuccessSnackbar}
                setShowSuccess={setShowSuccessSnackbar}
                message="Event updated successfully"
            />
            <BottomSuccessSnackbar
                showSuccess={showLoadingSnackbar}
                setShowSuccess={setShowLoadingSnackbar}
                message="Loading..."
                variant="info"
            />
        </>
    )
}
