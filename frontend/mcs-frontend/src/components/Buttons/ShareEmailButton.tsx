import { Button, IconButton } from '@mui/material'
import React, { FC, useState } from 'react'
import { Academic, MainEvent, Speaker } from '../../types/frontendTypes'
import { ShareCanvassingModal } from '../../pages/Event/EventView/TabPages/Canvassing/ShareCanvassingModal'
import { Email } from '@mui/icons-material'

interface ShareEmailButtonProps {
    event: MainEvent;
    academic: Academic;
}

export const ShareEmailButton: FC<ShareEmailButtonProps> = ({
    event,
    academic,
}) => {
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
                variant="outlined"
                onClick={openModal}
                className="text-xl py-2 px-4"
                startIcon={<Email />}
            >
                Send
            </Button>
            <ShareCanvassingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                event={event}
                academic={academic}
            />
        </>
    )
}

export default ShareEmailButton
