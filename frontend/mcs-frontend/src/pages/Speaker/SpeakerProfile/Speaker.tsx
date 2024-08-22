import { Box } from '@mui/material'
import React, { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Profile } from './Profile'
import { Speaker as SpeakerType } from '../../../types/frontendTypes'
import { BodyLayout } from '../../Layout/BodyLayout'
import { PageTopNavBar } from '../../../components'
import { EditSpeakerModal } from './EditSpeakerModal'

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
            <EditSpeakerModal
                open={isEditModalOpen}
                handleClose={closeEditModal}
                speaker={speaker}
            />
        </>
    )
}
