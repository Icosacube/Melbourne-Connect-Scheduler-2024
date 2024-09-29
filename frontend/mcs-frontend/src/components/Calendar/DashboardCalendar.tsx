import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import { FC, useState } from 'react'
import { MainEvent, Venue } from '../../types/frontendTypes'
import { useNavigate } from 'react-router-dom'
import { CreateEventModal } from '../../pages/Event/EventsOverview/CreateEventModal'
import dayjs, { Dayjs } from 'dayjs'

interface DashboardCalendarProps {
    events: MainEvent[]
    venues: Venue[]
}

export const DashboardCalendar: FC<DashboardCalendarProps> = ({
    events,
    venues,
}) => {
    const navigate = useNavigate()
    const [showCreateEventModal, setShowCreateEventModal] = useState(false)
    const [createEventModalDate, setCreateEventModalDate] = useState<
        Dayjs | undefined
    >()

    const formattedEvents = events.map((event) => {
        // Parse the event date using Day.js
        const startDate = event.Date

        // Generate a random number of days between 1 and 5
        const randomDays = Math.floor(Math.random() * 5) + 1 // Generates a number from 1 to 5

        // Calculate the end date by adding random days to the start date
        const endDate = startDate.add(randomDays, 'day')

        return {
            id: event.RecordID,
            title: event.EventName,
            date: startDate.format('YYYY-MM-DD'), // Format start date as YYYY-MM-DD
            end: endDate.format('YYYY-MM-DD'), // Format end date as YYYY-MM-DD
        }
    })

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
                dateClick={handleDateClick}
            />
            <CreateEventModal
                open={showCreateEventModal}
                handleClose={() => setShowCreateEventModal(false)}
                venues={venues}
                eventDate={createEventModalDate}
            />
        </>
    )
}
