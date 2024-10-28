import { Box } from '@mui/material'
import { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import EventTopNavBar from '../../../components/TopNavBar/EventTopNavBar'
import {
    Catering,
    FundingAccount,
    MainEvent,
    Service,
    Speaker,
    Trip,
    Venue,
} from '../../../types/frontendTypes'
import { BodyLayout } from '../../Layout/BodyLayout'
import EventFormModal from '../EventFormModal'
import { About } from './TabPages/About'
import CanvassingAll from './TabPages/Canvassing/CanvassingAll'
import { Participants } from './TabPages/Participants'
import Programme from './TabPages/Programme'
import { CateringTable } from './TabPages/Services/CateringTable'
import { RoomServicesTable } from './TabPages/Services/RoomServicesTable'

export const Event: FC = () => {
    const [tabName, setTabName] = useState('About')
    const [openEditModal, setOpenEditModal] = useState(false)
    const handleOpenEditModal = async () => {
        setOpenEditModal(true)
    }
    const handleCloseEditModal = () => {
        setOpenEditModal(false)
    }
    const {
        event,
        speakers,
        venues,
        catering,
        fundingAccounts,
        roomServices,
        trips,
    } = useLoaderData() as {
        event: MainEvent
        speakers: Speaker[]
        venues: Venue[]
        catering: Catering[]
        fundingAccounts: FundingAccount[]
        roomServices: Service[]
        trips: Trip[]
    }

    const filteredSpeakers = speakers.filter((speaker) =>
        event.Speaker.includes(speaker.RecordID)
    )
    const renderTabContent = (event: MainEvent) => {
        switch (tabName) {
            case 'About':
                return (
                    <About
                        event={event}
                        speakers={filteredSpeakers}
                        venues={venues}
                    />
                )
            case 'Participants':
                return (
                    <Participants speakers={filteredSpeakers} trips={trips} />
                )
            case 'Canvassing':
                return (
                    <CanvassingAll event={event} speakers={filteredSpeakers} />
                )
            case 'Programme':
                return <Programme event={event} speakers={filteredSpeakers} />
            case 'Catering':
                return (
                    <CateringTable
                        event={event}
                        catering={catering}
                        fundingAccounts={fundingAccounts}
                    />
                )
            case 'Room Services':
                return (
                    <RoomServicesTable
                        eventId={event.RecordID}
                        roomServices={roomServices}
                        fundingAccounts={fundingAccounts}
                    />
                )
            default:
                return (
                    <About
                        event={event}
                        speakers={filteredSpeakers}
                        venues={venues}
                    />
                )
        }
    }
    return (
        <Box>
            <EventTopNavBar
                getCurTab={setTabName}
                openEditModal={handleOpenEditModal}
                event={event}
                speaker={filteredSpeakers[0]}
            />
            <EventFormModal
                event={event}
                open={openEditModal}
                handleClose={handleCloseEditModal}
                variant="edit"
                speakers={speakers}
                venues={venues}
            />
            <BodyLayout content={renderTabContent(event)}></BodyLayout>
        </Box>
    )
}
