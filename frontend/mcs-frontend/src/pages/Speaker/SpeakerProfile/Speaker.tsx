import { Box } from '@mui/material'
import { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { PageTopNavBar } from '../../../components'
import { Speaker as SpeakerType } from '../../../types/frontendTypes'
import { BodyLayout } from '../../Layout/BodyLayout'
import { SpeakerFormModal } from '../SpeakerFormModal'
import { Profile } from './Profile'

export const Speaker: FC = () => {
    const speaker = useLoaderData() as SpeakerType
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const openEditModal = () => {
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false)
    }

    return (
        <>
            <Box>
                <PageTopNavBar
                    type={'Speaker'}
                    link={'/speakers'}
                    pageTitle={`${speaker.FirstName} ${speaker.LastName}`}
                    openEditModal={openEditModal}
                />
                <BodyLayout content={<Profile speaker={speaker} />} />
            </Box>
            <SpeakerFormModal
                open={isEditModalOpen}
                handleClose={closeEditModal}
                variant="edit"
                speaker={speaker}
            />
        </>
    )
}
