import React, { useEffect, useState } from 'react'
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Modal,
    Button,
    Box,
    SelectChangeEvent,
} from '@mui/material'
import { Email } from '@mui/icons-material'
import { EmailComposerModal, SubmitButton } from '../../../../../components'
import { set } from 'react-hook-form'
import { getCanvassingByEventId } from '../../../../../scripts/canvassing/functions'
import { getAcademicById } from '../../../../../scripts/academic/functions'
import { generateEmailTemplateForCanvassing } from '../../../../../scripts/email/functions'
import { MainEvent } from '../../../../../types/frontendTypes'
import { getMainEventById } from '../../../../../scripts/event/functions'
import { get } from 'http'

interface Academic {
    RecordID: string
    Name: string
    Email: string
}

interface SelectAcademicModalProps {
    isOpen: boolean
    onClose: () => void
    mainEvent: MainEvent
}

const SelectAcademicModal: React.FC<SelectAcademicModalProps> = ({
    isOpen,
    onClose,
    mainEvent,
}) => {
    const [selectedAcademic, setSelectedAcademic] = useState<string>('')
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
    const [academics, setAcademics] = useState<Academic[]>([])
    const [submitted, setSubmitted] = useState(false)
    const [emailComposerData, setEmailComposerData] = useState({
        from: '',
        to: '',
        cc: '',
        subject: '',
        body: '',
    })

    //useEffect to fetch the academic based on the eventID
    const handleEmailClose = () => {
        setIsEmailModalOpen(false)
    }

    const handleEmailOpen = () => {
        setIsEmailModalOpen(true)
    }

    const handleSubmit = () => {
        setSubmitted(true)
    }

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedAcademic(event.target.value as string)
        const selectedAcademicTest = academics.find(
            (academic) => academic.Email === (event.target.value as string)
        )

        console.log(selectedAcademicTest)
        if (selectedAcademicTest) {
            const { emailSubject, emailContent } =
                generateEmailTemplateForCanvassing(
                    mainEvent,
                    selectedAcademicTest
                )

            setEmailComposerData({
                from: 'mcs083087@gmail.com',
                to: event.target.value as string,
                cc: '',
                subject: emailSubject,
                body: emailContent,
            })
        }
    }

    useEffect(() => {
        console.log('Selected Academic:', selectedAcademic)
    }, [selectedAcademic])

    const fetchAcademicEmails = async () => {
        const canvassingList = await getCanvassingByEventId(mainEvent.RecordID)

        // Extract unique academic IDs
        const uniqueAcademicIds = new Set<string>()
        canvassingList.forEach((canvassing) => {
            canvassing.Academic.forEach((id: string) =>
                uniqueAcademicIds.add(id)
            )
        })

        // Fetch academic details for unique IDs
        const academicPromises = Array.from(uniqueAcademicIds).map(
            async (id) => {
                const academic = await getAcademicById(id)
                return {
                    RecordID: academic.RecordID,
                    Name: academic.Name,
                    Email: academic.Email,
                }
            }
        )

        const academicResults = await Promise.all(academicPromises)
        setAcademics(academicResults)
        console.log(academicResults)
    }

    const emailComposer = () => {
        if (!isEmailModalOpen) {
            return <></>
        }
        return (
            <EmailComposerModal
                open={true}
                onClose={handleEmailClose}
                modalTitle="Draft email to speaker"
                from={emailComposerData.from}
                to={emailComposerData.to}
                cc={emailComposerData.cc}
                subject={emailComposerData.subject}
                body={emailComposerData.body}
            />
        )
    }

    useEffect(() => {
        if (isOpen) {
            fetchAcademicEmails()
        }
    }, [isOpen, mainEvent])

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
                            onChange={handleChange}
                            label="Select Academic"
                        >
                            {academics.map((academic) => (
                                <MenuItem
                                    key={academic.RecordID}
                                    value={academic.Email}
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
            {emailComposer()}
        </>
    )
}

export default SelectAcademicModal
