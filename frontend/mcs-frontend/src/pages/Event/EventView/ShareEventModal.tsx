// EmailComposerModal.tsx
import React from 'react'
import 'react-quill/dist/quill.snow.css'
import { EmailComposerModal } from '../../../components'
import { MainEvent, Speaker } from '../../../types/frontendTypes'
import { generateEmailTemplateFromEvents } from '../../../scripts/email/functions'

interface ShareEventModalProps {
    isOpen: boolean
    onClose: () => void
    event: MainEvent
    speaker: Speaker
}

export const ShareEventModal: React.FC<ShareEventModalProps> = ({
    isOpen,
    onClose,
    event,
    speaker,
}) => {
    const { emailSubject, emailContent } = generateEmailTemplateFromEvents(
        event,
        speaker
    )

    return (
        <>
            <EmailComposerModal
                open={isOpen}
                onClose={onClose}
                modalTitle={`Share Event: ${event.EventName}`}
                subject={emailSubject}
                body={emailContent}
            />
        </>
    )
}
