import { Button, IconButton, Typography } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import React, { FC, useState } from 'react'
import { MainEvent, Speaker } from '../../../types/frontendTypes'
import { ShareEventModal } from './ShareEventModal'
import { BottomSuccessSnackbar } from '../../../components'

interface ShareButtonProps {
    event: MainEvent
    speaker: Speaker
}

export const ShareButton: FC<ShareButtonProps> = ({ event, speaker }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setShowSuccess(true)
        setIsModalOpen(false)
    }

    return (
        <>
            <IconButton color={'primary'} onClick={openModal}>
                <ShareIcon />
            </IconButton>
            <ShareEventModal
                isOpen={isModalOpen}
                onClose={closeModal}
                event={event}
                speaker={speaker}
            />
        </>
    )
}
