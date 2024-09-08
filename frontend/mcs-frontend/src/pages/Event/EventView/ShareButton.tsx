import { Button, Typography } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import React, { FC, useState } from 'react'
import { MainEvent, Speaker } from '../../../types/frontendTypes'
import { EmailComposerModal } from './EmailComposerModal'
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
            <Button
                variant="contained"
                className="bg-accent2 hover:bg-secondary hover:text-white text-white"
                onClick={openModal}
            >
                <ShareIcon />
                <Typography variant="h6" className="ml-3">
                    Share
                </Typography>
            </Button>
            <EmailComposerModal
                isOpen={isModalOpen}
                onClose={closeModal}
                event={event}
                speaker={speaker}
            />
        </>
    )
}
