import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography,
} from '@mui/material'
import { FC, useState } from 'react'
import { EmailComposerModal } from '../../../components'
import {
    generateEmailTemplateForBlankEventForm,
    generateEmailTemplateForBlankSpeakerEventForm,
    generateEmailTemplateForBlankSpeakerForm,
    generateEmailTemplateForExistingEventForm,
    generateEmailTemplateForExistingSpeakerEventForm,
    generateEmailTemplateForExistingSpeakerForm,
} from '../../../scripts/email/functions'
import { MainEvent, Speaker } from '../../../types/frontendTypes'

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

    const handleGenerate = async () => {
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
                        await generateEmailTemplateForExistingSpeakerForm(
                            fullSpeaker
                        )
                    to = emailData.to
                    subject = emailData.subject
                    body = emailData.body
                } else {
                    // Handle New Speaker case
                    const emailData =
                        await generateEmailTemplateForBlankSpeakerForm()
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
                        (speaker) => speaker.RecordID === selectedSpeaker
                    )
                    if (!fullEvent || !fullSpeaker) {
                        console.log('Invalid selection')
                        return
                    }
                    const emailData =
                        await generateEmailTemplateForExistingEventForm(
                            fullSpeaker,
                            fullEvent
                        )
                    to = emailData.to
                    subject = emailData.subject
                    body = emailData.body
                } else {
                    // Handle New Event case
                    const fullSpeaker = speakers.find(
                        (speaker) => speaker.RecordID === selectedSpeaker
                    )
                    if (!fullSpeaker) {
                        console.log('Invalid selection')
                        return
                    }
                    const emailData =
                        await generateEmailTemplateForBlankEventForm(
                            fullSpeaker
                        )
                    subject = emailData.subject
                    body = emailData.body
                }
                break

            case 'Speaker & Event Form':
                if (
                    eventType === 'Existing Speaker & Event' &&
                    speakerType === 'Existing Speaker & Event'
                ) {
                    // Handle Existing Speaker & Event case
                    const fullEvent = events.find(
                        (event) => event.RecordID === selectedEvent
                    )
                    const fullSpeaker = speakers.find(
                        (speaker) => speaker.RecordID === selectedSpeaker
                    )
                    if (!fullEvent || !fullSpeaker) {
                        console.log('Invalid selection')
                        return
                    }
                    const emailData =
                        await generateEmailTemplateForExistingSpeakerEventForm(
                            fullSpeaker,
                            fullEvent
                        )
                    to = emailData.to
                    subject = emailData.subject
                    body = emailData.body
                } else {
                    const emailData =
                        await generateEmailTemplateForBlankSpeakerEventForm()
                    subject = emailData.subject
                    body = emailData.body
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
        setEmailComposerOpen(true)
        handleClose()
    }

    const isGenerateDisabled = () => {
        if (speakerType === 'Existing Speaker' && !selectedSpeaker) {
            return true
        }
        if (eventType === 'Existing Event' && !selectedEvent) {
            return true
        }
        if (eventType === 'Existing Speaker & Event' && !selectedSpeaker) {
            return true
        }
        if (
            eventType === 'New Event' &&
            !selectedSpeaker &&
            formType === 'Event Form'
        ) {
            return true
        }
        if (eventType === 'Existing Event' && !selectedSpeaker) {
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
                to={[emailComposerData.to]}
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
                                if (e.target.value === 'Speaker Form') {
                                    setSpeakerType('New Speaker')
                                } else if (e.target.value === 'Event Form') {
                                    setEventType('New Event')
                                } else {
                                    setSpeakerType('New Speaker & Event')
                                    setEventType('New Speaker & Event')
                                }
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
                                            {speakers?.map((speaker, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={speaker.RecordID}
                                                >
                                                    {speaker.FirstName +
                                                        ' ' +
                                                        speaker.LastName}
                                                </MenuItem>
                                            ))}
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
                                                setSelectedEvent('')
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
                                    {eventType === 'Existing Event' ? (
                                        <>
                                            <FormControl
                                                fullWidth
                                                variant="outlined"
                                            >
                                                <InputLabel>
                                                    Select an Event
                                                </InputLabel>
                                                <Select
                                                    value={selectedEvent}
                                                    onChange={(e) => {
                                                        setSelectedEvent(
                                                            e.target.value
                                                        )
                                                    }}
                                                    defaultValue=""
                                                    MenuProps={{
                                                        PaperProps: {
                                                            style: {
                                                                maxHeight:
                                                                    '25vh',
                                                                overflowY:
                                                                    'auto',
                                                                width: '40%',
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select an Event
                                                    </MenuItem>
                                                    {events?.map(
                                                        (event, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                value={
                                                                    event.RecordID
                                                                }
                                                            >
                                                                <div
                                                                    style={{
                                                                        overflow:
                                                                            'hidden',
                                                                        textOverflow:
                                                                            'ellipsis',
                                                                    }}
                                                                >
                                                                    {
                                                                        event.EventName
                                                                    }
                                                                </div>
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            </FormControl>
                                            <FormControl
                                                fullWidth
                                                variant="outlined"
                                                disabled={selectedEvent === ''}
                                                sx={{ marginTop: 4 }}
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
                                                                maxHeight:
                                                                    '25vh',
                                                                overflowY:
                                                                    'auto',
                                                                width: '40%',
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select a Speaker
                                                    </MenuItem>
                                                    {(() => {
                                                        const fullEvent =
                                                            events.find(
                                                                (event) =>
                                                                    event.RecordID ===
                                                                    selectedEvent
                                                            )
                                                        const filteredSpeakers =
                                                            speakers.filter(
                                                                (speaker) =>
                                                                    fullEvent?.Speaker?.includes(
                                                                        speaker.RecordID
                                                                    )
                                                            )
                                                        return filteredSpeakers?.map(
                                                            (
                                                                speaker,
                                                                index
                                                            ) => (
                                                                <MenuItem
                                                                    key={index}
                                                                    value={
                                                                        speaker.RecordID
                                                                    }
                                                                >
                                                                    <div
                                                                        style={{
                                                                            overflow:
                                                                                'hidden',
                                                                            textOverflow:
                                                                                'ellipsis',
                                                                        }}
                                                                    >
                                                                        {speaker.FirstName +
                                                                            ' ' +
                                                                            speaker.LastName}
                                                                    </div>
                                                                </MenuItem>
                                                            )
                                                        )
                                                    })()}
                                                </Select>
                                            </FormControl>
                                        </>
                                    ) : (
                                        <FormControl
                                            fullWidth
                                            variant="outlined"
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
                                                {speakers?.map(
                                                    (speaker, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={
                                                                speaker.RecordID
                                                            }
                                                        >
                                                            {speaker.FirstName +
                                                                ' ' +
                                                                speaker.LastName}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    )}
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
                                            setSpeakerType(value)
                                            if (
                                                value === 'New Speaker & Event'
                                            ) {
                                                setSelectedEvent('')
                                                setSelectedSpeaker('')
                                            }
                                        }}
                                        sx={{ marginBottom: 4 }}
                                    >
                                        <FormGroup row>
                                            <FormControlLabel
                                                value="New Speaker & Event"
                                                control={<Radio />}
                                                label="New Speaker & Event"
                                            />
                                            <FormControlLabel
                                                value="Existing Speaker & Event"
                                                control={<Radio />}
                                                label="Existing Speaker & Event"
                                            />
                                        </FormGroup>
                                    </RadioGroup>
                                    <FormControl
                                        fullWidth
                                        variant="outlined"
                                        disabled={
                                            eventType === 'New Speaker & Event'
                                        }
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
                                    <FormControl
                                        fullWidth
                                        variant="outlined"
                                        disabled={
                                            eventType ===
                                                'New Speaker & Event' ||
                                            selectedEvent === ''
                                        }
                                        sx={{ marginTop: 4 }}
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
                                                        width: '40%',
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem value="" disabled>
                                                Select a Spekaer
                                            </MenuItem>
                                            {(() => {
                                                const fullEvent = events.find(
                                                    (event) =>
                                                        event.RecordID ===
                                                        selectedEvent
                                                )
                                                const filteredSpeakers =
                                                    speakers.filter((speaker) =>
                                                        fullEvent?.Speaker?.includes(
                                                            speaker.RecordID
                                                        )
                                                    )
                                                return filteredSpeakers?.map(
                                                    (speaker, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={
                                                                speaker.RecordID
                                                            }
                                                        >
                                                            <div
                                                                style={{
                                                                    overflow:
                                                                        'hidden',
                                                                    textOverflow:
                                                                        'ellipsis',
                                                                }}
                                                            >
                                                                {speaker.FirstName +
                                                                    ' ' +
                                                                    speaker.LastName}
                                                            </div>
                                                        </MenuItem>
                                                    )
                                                )
                                            })()}
                                        </Select>
                                    </FormControl>
                                </>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ mb: 2, mr: 2 }}>
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
