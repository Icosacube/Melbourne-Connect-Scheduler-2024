// EmailComposerModal.tsx
import React from 'react'
import 'react-quill/dist/quill.snow.css'
import { EmailComposerModal } from '../../../../components'
import { MainEvent, Speaker, SubEvent } from '../../../../types/frontendTypes'
import {
    generateEmailTemplateForCreateSubEvent,
    generateEmailTemplateFromEvents,
} from '../../../../scripts/email/functions'

interface ShareSubEventModalProps {
    isOpen: boolean
    onClose: () => void
    subEvent: SubEvent
    speakers: Speaker[]
}

export const ShareSubEventModal: React.FC<ShareSubEventModalProps> = ({
    isOpen,
    onClose,
    subEvent,
    speakers,
}) => {
    // const { emailSubject, emailContent } = generateEmailTemplateFromEvents(
    //     event,
    //     speaker
    // )

    const { subject, body } = generateEmailTemplateForCreateSubEvent(subEvent)
    const subEventSpeakerIDs = subEvent.Speakers
    const subEventSpeakerEmails: string[] = subEventSpeakerIDs
        .map((id) => speakers.find((speaker) => speaker.RecordID === id))
        .filter((speaker): speaker is Speaker => speaker !== undefined) // Type guard to filter out undefined values
        .map((speaker) => speaker.PrimaryEmail)

    return (
        <>
            <EmailComposerModal
                open={isOpen}
                onClose={onClose}
                to={subEventSpeakerEmails}
                modalTitle={`Share Event: ${subEvent.EventName}`}
                subject={subject}
                body={body}
            />
        </>
    )
}
