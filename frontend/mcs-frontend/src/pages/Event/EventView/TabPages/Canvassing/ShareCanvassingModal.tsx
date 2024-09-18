// EmailComposerModal.tsx
import React from 'react'
import 'react-quill/dist/quill.snow.css'
import { EmailComposerModal } from '../../../../../components'
import { Academic, MainEvent, Speaker } from '../../../../../types/frontendTypes'
import { generateEmailTemplateForCanvassing } from '../../../../../scripts/email/functions'

interface ShareCanvassingModalProps {
    isOpen: boolean
    onClose: () => void
    event: MainEvent
    academic: Academic
}

export const ShareCanvassingModal: React.FC<ShareCanvassingModalProps> = ({
    isOpen,
    onClose,
    event,
    academic,
}) => {
    const { emailSubject, emailContent } = generateEmailTemplateForCanvassing(
        event,
        academic
    )

    return (
        <>
            <EmailComposerModal
                open={isOpen}
                onClose={onClose}
                modalTitle={`Share Canvassing: ${event.EventName}`}
                subject={emailSubject}
                body={emailContent}
            />
        </>
    )
}
