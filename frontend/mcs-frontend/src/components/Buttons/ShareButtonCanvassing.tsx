import ShareIcon from '@mui/icons-material/Share'
import { Button, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { ShareCanvassingModal } from '../../pages/Event/EventView/TabPages/Canvassing/ShareCanvassingModal'
import { Academic, MainEvent } from '../../types/frontendTypes'

interface ShareButtonProps {
    event: MainEvent
    academic: Academic
}

export const ShareButton: FC<ShareButtonProps> = ({ event, academic }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <Button
                variant="contained"
                className="bg-accent2 hover:bg-secondary hover:text-white text-white"
                onClick={openModal}
                sx={{ height: '43px' }}
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
