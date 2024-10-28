import { Box } from '@mui/material'
import { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { AddButton } from '../../../components'
import { MainEvent, Speaker, Trip } from '../../../types/frontendTypes'
import { SpeakerFormModal } from '../SpeakerFormModal'
import EmailSpeakersButton from './EmailSpeakersButtons'
import { SpeakerTable } from './SpeakerTable'

// Define the type for the loader data
interface LoaderData {
    speakers?: Speaker[]
    events?: MainEvent[]
    trips?: Trip[]
}

export const Speakers: FC = () => {
    const [openCreateSpeakerModal, setOpenCreateSpeakerModal] = useState(false)

    const handleOpenCreateSpeakerModal = () => {
        setOpenCreateSpeakerModal(true)
    }

    const handleCloseCreateSpeakerModal = () => {
        setOpenCreateSpeakerModal(false)
    }

    const { speakers, events, trips } = useLoaderData() as LoaderData
    if (!speakers || !events || !trips) {
        return <div>Error</div>
    }

    return (
        <Box className="space-y-8 flex flex-col">
            <Box className="flex flex-col">
                <Box className="flex justify-end space-x-4">
                    <EmailSpeakersButton speakers={speakers} events={events} />
                    <AddButton
                        name={'Speaker'}
                        onClick={handleOpenCreateSpeakerModal}
                    />
                </Box>
            </Box>
            <SpeakerTable speakers={speakers} trips={trips} />
            <SpeakerFormModal
                open={openCreateSpeakerModal}
                handleClose={handleCloseCreateSpeakerModal}
                variant="create"
            />
        </Box>
    )
}
