import React, { useState } from 'react'
import dayjs from 'dayjs'
import { CheckboxRow } from '../Canvassing/CheckboxRow'
import { useParams } from 'react-router-dom'

export const Canvassing: React.FC = () => {
    let { eventId, academicId } = useParams()

    return <CheckboxRow mainEvent={eventId!} academic={academicId!} canvassingSlots={[]} />
}

const temp = [
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-02T10:00:00'),
        EndTime: dayjs('2024-09-02T10:45:00'),
        AvailableAcademic: ['person1@example.com'],
        MixedAcademic: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-02T11:00:00'),
        EndTime: dayjs('2024-09-02T11:45:00'),
        AvailableAcademic: ['person1@example.com', 'person2@example.com'],
        MixedAcademic: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-02T14:00:00'),
        EndTime: dayjs('2024-09-02T14:45:00'),
        AvailableAcademic: ['person2@example.com'],
        MixedAcademic: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-02T16:00:00'),
        EndTime: dayjs('2024-09-02T16:30:00'),
        AvailableAcademic: ['person3@example.com'],
        MixedAcademic: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-03T10:00:00'),
        EndTime: dayjs('2024-09-03T10:45:00'),
        AvailableAcademic: ['person1@example.com', 'person3@example.com'],
        MixedAcademic: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-03T11:00:00'),
        EndTime: dayjs('2024-09-03T11:45:00'),
        AvailableAcademic: ['person1@example.com'],
        MixedAcademic: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-03T14:00:00'),
        EndTime: dayjs('2024-09-03T14:45:00'),
        AvailableAcademic: ['person2@example.com'],
        MixedAcademic: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-04T16:00:00'),
        EndTime: dayjs('2024-09-04T16:30:00'),
        AvailableAcademic: ['person1@example.com', 'person2@example.com'],
        MixedAcademic: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-04T17:00:00'),
        EndTime: dayjs('2024-09-04T17:45:00'),
        AvailableAcademic: ['person1@example.com'],
        MixedAcademic: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },

    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-05T10:00:00'),
        EndTime: dayjs('2024-09-05T11:00:00'),
        AvailableAcademic: ['person1@example.com', 'person3@example.com'],
        MixedAcademic: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
    {
        MainEvent: '1',
        StartTime: dayjs('2024-09-06T10:00:00'),
        EndTime: dayjs('2024-09-06T11:00:00'),
        AvailableAcademic: ['person1@example.com', 'person3@example.com'],
        MixedAcademic: [
            { name: 'John Doe', email: 'person1@example.com' },
            { name: 'Jane Smith', email: 'person2@example.com' },
            { name: 'Alice Brown', email: 'person3@example.com' },
        ],
    },
]
