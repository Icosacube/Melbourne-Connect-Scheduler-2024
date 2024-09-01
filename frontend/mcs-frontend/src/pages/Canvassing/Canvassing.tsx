import { Box } from '@mui/material'
import React, { useState } from 'react'
import { TimeSlot } from '../../types/frontendTypes'
import dayjs from 'dayjs'
import { CheckboxRow } from '../Canvassing/CheckboxRow'
import { CanvassingResults } from './CanvassingResults'
import { CanvassingCreationCalendar, CheckboxCalendar } from '../../components'

export const Canvassing: React.FC = () => {
    const [demoTimeSlot, setDemoTimeSlot] = useState<TimeSlot[]>([])
    return (
        <>
            <Box>
                <CanvassingCreationCalendar
                    MainEvent="someEventIdFromEventPage"
                    setTimeSlots={setDemoTimeSlot}
                />
            </Box>
            <Box>
                <CheckboxRow
                    timeSlots={demoTimeSlot}
                    setTimeSlots={setDemoTimeSlot}
                />
            </Box>
            <Box>
                <CanvassingResults timeSlots={demoTimeSlot} />
            </Box>
        </>
    )
}

const temp = [
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-02T10:00:00'),
        EndTime: dayjs('2024-09-02T10:45:00'),
        AvailablePeople: ['person1@example.com'],
        People: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-02T11:00:00'),
        EndTime: dayjs('2024-09-02T11:45:00'),
        AvailablePeople: ['person1@example.com', 'person2@example.com'],
        People: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-02T14:00:00'),
        EndTime: dayjs('2024-09-02T14:45:00'),
        AvailablePeople: ['person2@example.com'],
        People: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-02T16:00:00'),
        EndTime: dayjs('2024-09-02T16:30:00'),
        AvailablePeople: ['person3@example.com'],
        People: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-03T10:00:00'),
        EndTime: dayjs('2024-09-03T10:45:00'),
        AvailablePeople: ['person1@example.com', 'person3@example.com'],
        People: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-03T11:00:00'),
        EndTime: dayjs('2024-09-03T11:45:00'),
        AvailablePeople: ['person1@example.com'],
        People: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-03T14:00:00'),
        EndTime: dayjs('2024-09-03T14:45:00'),
        AvailablePeople: ['person2@example.com'],
        People: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-04T16:00:00'),
        EndTime: dayjs('2024-09-04T16:30:00'),
        AvailablePeople: ['person1@example.com', 'person2@example.com'],
        People: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-04T17:00:00'),
        EndTime: dayjs('2024-09-04T17:45:00'),
        AvailablePeople: ['person1@example.com'],
        People: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },

    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-05T10:00:00'),
        EndTime: dayjs('2024-09-05T11:00:00'),
        AvailablePeople: ['person1@example.com', 'person3@example.com'],
        People: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-06T10:00:00'),
        EndTime: dayjs('2024-09-06T11:00:00'),
        AvailablePeople: ['person1@example.com', 'person3@example.com'],
        People: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
]
