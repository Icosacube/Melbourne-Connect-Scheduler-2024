import { Box } from '@mui/material'
import React, { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import EventTopNavBar from '../../../components/TopNavBar/EventTopNavBar'
import { MainEvent } from '../../../types/frontendTypes'
import { About } from './TabPages/About'
import Participants from './TabPages/Participants'
import Programme from './TabPages/Programme'
import Services from './TabPages/Services'

export const Event: FC = () => {
    const [tabName, setTabName] = useState('About')
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const { event, speakers } = useLoaderData() as {
        event: MainEvent
        speakers: any[]
    }

    const renderTabContent = (event: MainEvent) => {
        switch (tabName) {
            case 'About':
                return <About event={event} speakers={speakers} />
            case 'Participants':
                return <Participants />
            case 'Programme':
                return <Programme />
            case 'Services':
                return <Services />
            default:
                return <About event={event} speakers={speakers} />
        }
    }

    return (
        <Box>
            <EventTopNavBar getCurTab={setTabName} openEditModal={handleOpen} />
            {renderTabContent(event)}
        </Box>
    )
}
