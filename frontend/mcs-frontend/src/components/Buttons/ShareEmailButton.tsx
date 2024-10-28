import { Email } from '@mui/icons-material'
import { Button } from '@mui/material'
import { FC, useState } from 'react'
import { ShareCanvassingModal } from '../../pages/Event/EventView/TabPages/Canvassing/ShareCanvassingModal'
import { Academic, MainEvent } from '../../types/frontendTypes'

interface ShareEmailButtonProps {
    event: MainEvent
    academic: Academic
}

export const ShareEmailButton: FC<ShareEmailButtonProps> = ({
    event,
    academic,
}) => {
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
