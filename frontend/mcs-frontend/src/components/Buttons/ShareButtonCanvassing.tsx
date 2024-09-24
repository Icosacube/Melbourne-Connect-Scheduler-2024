import { Button, Typography } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import React, { FC, useState } from 'react'
import { Academic, MainEvent, Speaker } from '../../types/frontendTypes'
import { ShareCanvassingModal } from '../../pages/Event/EventView/TabPages/Canvassing/ShareCanvassingModal'
import { BottomSuccessSnackbar } from '../../components'

interface ShareButtonProps {
    event: MainEvent
    academic: Academic
}

export const ShareButton: FC<ShareButtonProps> = ({ event, academic }) => {
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
                sx={{height: '43px'}}
            >
                <ShareIcon />
                <Typography variant="h6" className="ml-3">
                    Share
                </Typography>
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

export default ShareButton