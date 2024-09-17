// TODO templating for speaker event form
// TODO only showing speakers of an event in the dropdown when an event is selected

import React, { FC, useState } from 'react'
import {
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormGroup,
} from '@mui/material'
import { MainEvent, Speaker } from '../../../types/frontendTypes'
import { EmailComposerModal } from '../../../components'
import {
    generateEmailTemplateForExistingSpeakerForm,
    generateEmailTemplateForBlankSpeakerForm,
    generateEmailTemplateForExistingEventForm,
    generateEmailTemplateForBlankEventForm,
} from '../../../scripts/email/functions'
import { TrendingUpRounded } from '@mui/icons-material'
import { s } from '@fullcalendar/core/internal-common'
import { set } from 'react-hook-form'

interface EmailTemplatingChoiceModalProps {
    open: boolean
    onClose: () => void
    events: MainEvent[]
    speakers: Speaker[]
}

export const EmailTemplatingChoiceModal: FC<
    EmailTemplatingChoiceModalProps
> = ({ open, onClose, speakers, events }) => {
    const [formType, setFormType] = useState<string>('Speaker Form')
    const [speakerType, setSpeakerType] = useState<string>('New Speaker')
    const [eventType, setEventType] = useState<string>('New Event')
    const [selectedSpeaker, setSelectedSpeaker] = useState<string>('')
    const [selectedEvent, setSelectedEvent] = useState<string>('')
    const [speakersList, setSpeakersList] = useState<Speaker[]>(speakers)

    // Email Composer Modal
    const [emailComposerOpen, setEmailComposerOpen] = useState<boolean>(false)
    const [emailComposerData, setEmailComposerData] = useState({
        from: '',
        to: '',
        cc: '',
        subject: '',
        body: '',
    })

    const handleClose = () => {
        // Reset state when the modal closes
        resetChoices()
        onClose()
    }

    const resetChoices = () => {
        setFormType('Speaker Form')
        setSpeakerType('New Speaker')
        setEventType('New Event')
        setSelectedSpeaker('')
        setSelectedEvent('')
    }

    const handleCloseEmailComposer = () => {
        setEmailComposerOpen(false)
    }

    const handleGenerate = () => {
        let to = ''
        let subject = ''
        let body = ''

        switch (formType) {
            case 'Speaker Form':
                if (speakerType === 'Existing Speaker') {
                    // Handle Existing Speaker case
                    const fullSpeaker = speakers.find(
                        (speaker) => speaker.RecordID === selectedSpeaker
                    )
                    if (!fullSpeaker) {
                        console.log('Invalid selection')
                        return
                    }
                    const emailData =
                        generateEmailTemplateForExistingSpeakerForm(fullSpeaker)
                    to = emailData.to
                    subject = emailData.subject
                    body = emailData.body
                } else {
                    // Handle New Speaker case
                    const emailData = generateEmailTemplateForBlankSpeakerForm()
                    subject = emailData.subject
                    body = emailData.body
                }
                break

            case 'Event Form':
                if (eventType === 'Existing Event') {
                    // Handle Existing Event case
                    const fullEvent = events.find(
                        (event) => event.RecordID === selectedEvent
                    )
                    const fullSpeaker = speakers.find(
                        (speaker) => speaker.RecordID === fullEvent?.Speaker[0]
                    )
                    if (!fullEvent || !fullSpeaker) {
                        console.log('Invalid selection')
                        return
                    }
                    const emailData = generateEmailTemplateForExistingEventForm(
                        fullSpeaker,
                        fullEvent
                    )
                    to = emailData.to
                    subject = emailData.subject
                    body = emailData.body
                } else {
                    // Handle New Event case
                    const emailData = generateEmailTemplateForBlankEventForm()
                    subject = emailData.subject
                    body = emailData.body
                }
                break

            case 'Speaker & Event Form':
                if (
                    speakerType === 'Existing Speaker' &&
                    eventType === 'Existing Event'
                ) {
                }
                break

            default:
                console.log('Invalid Form Type')
                break
        }
        setEmailComposerData({
            from: '',
            to: to,
            cc: '',
            subject: subject,
            body: body,
        })
        // Log the emailComposerData after setting it
        setEmailComposerOpen(true) // Open the email composer modal
        console.log('EmailComposerData:', emailComposerData) // This may still show the previous state due to async nature
        handleClose()
    }

    const isGenerateDisabled = () => {
        if (speakerType === 'Existing Speaker' && !selectedSpeaker) {
            return true
        }
        if (eventType === 'Existing Event' && !selectedEvent) {
            return true
        }
        return false
    }

    const emailComposer = () => {
        if (!emailComposerOpen) {
            return <></>
        }
        return (
            <EmailComposerModal
                open={true}
                onClose={handleCloseEmailComposer}
                modalTitle="Draft email to speaker"
                from={emailComposerData.from}
                to={emailComposerData.to}
                cc={emailComposerData.cc}
                subject={emailComposerData.subject}
                body={emailComposerData.body}
            />
        )
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Select Email Template</DialogTitle>
                <DialogContent>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="subtitle1">
                            Choose a Form Type
                        </Typography>
                        <RadioGroup
                            value={formType}
                            onChange={(e) => {
                                setFormType(e.target.value)
                                setSelectedEvent('')
                                setSelectedSpeaker('')
                            }}
                        >
                            <FormGroup row>
                                <FormControlLabel
                                    value="Speaker Form"
                                    control={<Radio />}
                                    label="Speaker Form"
                                />
                                <FormControlLabel
                                    value="Event Form"
                                    control={<Radio />}
                                    label="Event Form"
                                />
                                <FormControlLabel
                                    value="Speaker & Event Form"
                                    control={<Radio />}
                                    label="Speaker & Event Form"
                                />
                            </FormGroup>
                        </RadioGroup>
                    </Box>

                    {formType && (
                        <Box>
                            {formType === 'Speaker Form' && (
                                <>
                                    <Typography variant="subtitle1">
                                        Select Speaker
                                    </Typography>
                                    <RadioGroup
                                        value={speakerType}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setSpeakerType(value)
                                            if (value === 'New Speaker') {
                                                setSelectedSpeaker('') // Clear selection when switching to New Speaker
                                            }
                                        }}
                                        sx={{ marginBottom: 4 }}
                                    >
                                        <FormGroup row>
                                            <FormControlLabel
                                                value="New Speaker"
                                                control={<Radio />}
                                                label="New Speaker"
                                            />
                                            <FormControlLabel
                                                value="Existing Speaker"
                                                control={<Radio />}
                                                label="Existing Speaker"
                                            />
                                        </FormGroup>
                                    </RadioGroup>
                                    <FormControl
                                        fullWidth
                                        variant="outlined"
                                        disabled={speakerType === 'New Speaker'}
                                    >
                                        <InputLabel>
                                            Select a Speaker
                                        </InputLabel>
                                        <Select
                                            value={selectedSpeaker}
                                            onChange={(e) =>
                                                setSelectedSpeaker(
                                                    e.target.value
                                                )
                                            }
                                            defaultValue=""
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: '25vh',
                                                        overflowY: 'auto',
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem value="" disabled>
                                                Select a Speaker
                                            </MenuItem>
                                            {speakersList?.map(
                                                (speaker, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={speaker.RecordID}
                                                    >
                                                        {speaker.FirstName +
                                                            ' ' +
                                                            speaker.LastName}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                </>
                            )}

                            {formType === 'Event Form' && (
                                <>
                                    <Typography variant="subtitle1">
                                        Select Event
                                    </Typography>
                                    <RadioGroup
                                        value={eventType}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setEventType(value)
                                            if (value === 'New Event') {
                                                setSelectedEvent('') // Clear selection when switching to New Event
                                            }
                                        }}
                                        sx={{ marginBottom: 4 }}
                                    >
                                        <FormGroup row>
                                            <FormControlLabel
                                                value="New Event"
                                                control={<Radio />}
                                                label="New Event"
                                            />
                                            <FormControlLabel
                                                value="Existing Event"
                                                control={<Radio />}
                                                label="Existing Event"
                                            />
                                        </FormGroup>
                                    </RadioGroup>
                                    <FormControl
                                        fullWidth
                                        variant="outlined"
                                        disabled={eventType === 'New Event'}
                                    >
                                        <InputLabel>Select an Event</InputLabel>
                                        <Select
                                            value={selectedEvent}
                                            onChange={(e) => {
                                                setSelectedEvent(e.target.value)
                                            }}
                                            defaultValue=""
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: '25vh',
                                                        overflowY: 'auto',
                                                        width: '40%',
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem value="" disabled>
                                                Select an Event
                                            </MenuItem>
                                            {events?.map((event, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={event.RecordID}
                                                >
                                                    <div
                                                        style={{
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                        }}
                                                    >
                                                        {event.EventName}
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </>
                            )}

                            {formType === 'Speaker & Event Form' && (
                                <>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ marginBottom: 1, marginTop: 4 }}
                                    >
                                        Select Form Variant
                                    </Typography>
                                    <RadioGroup
                                        value={eventType}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setEventType(value)
                                            if (value === 'New Event') {
                                                setSelectedEvent('') // Clear selection when switching to New Event
                                            }
                                        }}
                                        sx={{ marginBottom: 4 }}
                                    >
                                        <FormGroup row>
                                            <FormControlLabel
                                                value="New Event"
                                                control={<Radio />}
                                                label="New Speaker & Event"
                                            />
                                            <FormControlLabel
                                                value="Existing Event"
                                                control={<Radio />}
                                                label="Existing Speaker & Event"
                                            />
                                        </FormGroup>
                                    </RadioGroup>
                                    <FormControl
                                        fullWidth
                                        variant="outlined"
                                        disabled={eventType === 'New Event'}
                                    >
                                        <InputLabel>Select an Event</InputLabel>
                                        <Select
                                            value={selectedEvent}
                                            onChange={(e) =>
                                                setSelectedEvent(e.target.value)
                                            }
                                            defaultValue=""
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: '25vh',
                                                        overflowY: 'auto',
                                                        width: '40%',
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem value="" disabled>
                                                Select an Event
                                            </MenuItem>
                                            {events?.map((event, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={event.RecordID}
                                                >
                                                    <div
                                                        style={{
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                        }}
                                                    >
                                                        {event.EventName}
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        variant="outlined"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={handleGenerate}
                        color="primary"
                        variant="contained"
                        disabled={isGenerateDisabled()}
                    >
                        Generate
                    </Button>
                </DialogActions>
            </Dialog>
            {emailComposer()}
        </>
    )
}
