import React, { useState } from 'react'
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Modal,
    Button,
    Box,
} from '@mui/material'
import { Email } from '@mui/icons-material'
import { EmailComposerModal, SubmitButton } from '../../../../../components'

interface Academic {
    RecordID: string
    Name: string
}

interface SelectAcademicModalProps {
    isOpen: boolean
    onClose: () => void
}

const dummyAcademics: Academic[] = [
    { RecordID: '1', Name: 'John Doe' },
    { RecordID: '2', Name: 'Jane Smith' },
    { RecordID: '3', Name: 'Alice Johnson' },
]

const SelectAcademicModal: React.FC<SelectAcademicModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [selectedAcademic, setSelectedAcademic] = useState<string>('')
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const handleEmailClose = () => {
        setIsEmailModalOpen(false)
    }

    const handleEmailOpen = () => {
        setIsEmailModalOpen(true)
    }

    const handleSubmit = () => {
        setSubmitted(true)
    }

    // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setSelectedAcademic(event.target.value as string);
    // };

    return (
        <>
            <Modal open={isOpen} onClose={onClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '25%',
                        height: '30vh',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="select-academic-label">
                            Select Academic
                        </InputLabel>
                        <Select
                            labelId="select-academic-label"
                            value={selectedAcademic}
                            // onChange={handleChange}
                            label="Select Academic"
                        >
                            {dummyAcademics.map((academic) => (
                                <MenuItem
                                    key={academic.RecordID}
                                    value={academic.RecordID}
                                >
                                    {academic.Name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button
                            variant="outlined"
                            onClick={handleEmailOpen}
                            className="text-xl py-2 px-4"
                            startIcon={<Email />}
                        >
                            Send Email
                        </Button>
                    </FormControl>
                </Box>
            </Modal>
            <EmailComposerModal
                open={isEmailModalOpen}
                onClose={handleEmailClose}
                // modalTitle={`Share Canvassing: ${event.EventName}`}
                // subject={emailSubject}
                // body={emailContent}
            />
        </>
    )
}

export default SelectAcademicModal
