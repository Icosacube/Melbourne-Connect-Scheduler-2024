import { Box } from '@mui/material'
import { FC, useState } from 'react'
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
    console.log(event)

    const renderTabContent = (event: MainEvent) => {
        switch (tabName) {
            case 'About':
                return (
                    <About event={event} speakers={speakers} venues={venues} />
                )
            case 'Participants':
                return <Participants speakers={speakers} />
            case 'Programme':
                return <Programme event={event} speakers={speakers} />
            case 'Services':
                return <Services event={event} />
            default:
                return (
                    <About event={event} speakers={speakers} venues={venues} />
                )
        }
    }
    return (
        <Box>
            <EventTopNavBar
                getCurTab={setTabName}
                openEditModal={handleOpen}
                event={event}
                speaker={speakers[0]}
            />
            {open ? (
                <EditEventModal
                    event={event}
                    handleClose={() => {
                        setOpen(false)
                    }}
                    open={open}
                    venues={venues}
                />
            ) : (
                <></>
            )}
            <BodyLayout content={renderTabContent(event)}></BodyLayout>
        </Box>
    )
}
