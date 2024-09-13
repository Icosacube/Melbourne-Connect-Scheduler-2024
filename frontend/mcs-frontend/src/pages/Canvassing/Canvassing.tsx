import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { TimeSlot } from '../../types/frontendTypes'
import dayjs from 'dayjs'
import { CheckboxRow } from '../Canvassing/CheckboxRow'
import { CanvassingResults } from './CanvassingResults'
import {
    CanvassingCreationCalendar,
    CheckboxCalendar,
    AvailabilityCalendar,
} from '../../components'
import { useParams } from 'react-router-dom'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export const Canvassing: React.FC = () => {
    let { eventId, academicId } = useParams()
    const [demoTimeSlot, setDemoTimeSlot] = useState<TimeSlot[]>([])
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Canvassing Form Creation" {...a11yProps(0)} />
                    <Tab label="Canvassing Form" {...a11yProps(1)} />
                    <Tab label="Canvassing Results" {...a11yProps(2)} />
                    <Tab
                        label="Canvassing Results (dummy data)"
                        {...a11yProps(3)}
                    />
                    <Tab label="Canvassing Form (alt)" {...a11yProps(4)} />
                    <Tab label="Canvassing Results (alt)" {...a11yProps(5)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <CanvassingCreationCalendar
                    MainEvent="someEventIdFromEventPage"
                    setTimeSlots={setDemoTimeSlot}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CheckboxRow
                    mainEvent={eventId!}
                    academic={academicId!}
                    timeSlots={demoTimeSlot}
                    setTimeSlots={setDemoTimeSlot}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <CanvassingResults timeSlots={demoTimeSlot} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <CanvassingResults timeSlots={temp} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <CheckboxCalendar timeSlots={temp} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                <AvailabilityCalendar timeSlots={temp} />
            </CustomTabPanel>
        </Box>
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
