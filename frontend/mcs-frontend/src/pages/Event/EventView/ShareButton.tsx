import ShareIcon from '@mui/icons-material/Share'
import { IconButton } from '@mui/material'
import { FC, useState } from 'react'
import { MainEvent, Speaker } from '../../../types/frontendTypes'
import { ShareEventModal } from './ShareEventModal'

interface ShareButtonProps {
    event: MainEvent
    speaker: Speaker
}

export const ShareButton: FC<ShareButtonProps> = ({ event, speaker }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
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
