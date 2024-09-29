import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import { FC } from 'react'
import { MainEvent } from '../../types/frontendTypes'
import { useNavigate } from 'react-router-dom'

interface CalendarProps {
    events: MainEvent[] // Define the type of events array as per your application's event structure
}

export const Calendar: FC<CalendarProps> = ({ events }) => {
    const navigate = useNavigate()

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
        // alert(`Event clicked: ${info.event.title}`)
        console.log(info.event.id)
        navigate(`/event/${info.event.id}`)
    }

    return (
        <FullCalendar
            eventColor="#FBAB18"
            eventTextColor="#000000"
            editable={true}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={formattedEvents}
            height={550}
            eventClick={handleEventClick}
        />
    )
}
