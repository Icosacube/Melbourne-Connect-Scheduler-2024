import { Box } from '@mui/material'
import React, { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import EventTopNavBar from '../../../components/TopNavBar/EventTopNavBar'
import { MainEvent, Speaker, Venue } from '../../../types/frontendTypes'
import { BodyLayout } from '../../Layout/BodyLayout'
import EditEventModal from './EditEventModal'
import { About } from './TabPages/About'
import { Participants } from './TabPages/Participants'
import Programme from './TabPages/Programme'
import { Services } from './TabPages/Services'

export const Event: FC = () => {
    const [tabName, setTabName] = useState('About')
    const [open, setOpen] = useState(false)
    const handleOpen = async () => {
        setOpen(true)
    }
    const { event, speakers, venues } = useLoaderData() as {
        event: MainEvent
        speakers: Speaker[]
        venues: Venue[]
    }

    const renderTabContent = (event: MainEvent) => {
        switch (tabName) {
            case 'About':
                return <About event={event} speakers={speakers} />
            case 'Participants':
                return <Participants speakers={speakers} />
            case 'Programme':
                return <Programme event={event} speakers={speakers} />
            case 'Services':
                return <Services event={event} />
            default:
                return <About event={event} speakers={speakers} />
        }
    }
    return (
        <Box>
            <EventTopNavBar
                getCurTab={setTabName}
                openEditModal={handleOpen}
                event={event}
            />
            <EditEventModal
                event={event}
                handleClose={() => {
                    setOpen(false)
                }}
                open={open}
            />
            <BodyLayout content={renderTabContent(event)}></BodyLayout>
        </Box>
    )
}
