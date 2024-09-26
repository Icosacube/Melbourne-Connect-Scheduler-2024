import { Email } from '@mui/icons-material'
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { EmailComposerModal } from '../../../../../components'
import { getAcademicById } from '../../../../../scripts/academic/functions'
import { getCanvassingByEventId } from '../../../../../scripts/canvassing/functions'
import { generateEmailTemplateForCanvassing } from '../../../../../scripts/email/functions'
import { MainEvent } from '../../../../../types/frontendTypes'

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
                to={[emailComposerData.to]}
                cc={[emailComposerData.cc]}
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
                <Paper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px]">
                    <Box className="pt-12 px-8 pb-4">
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
                                className="text-xl py-2 px-4 my-4"
                                startIcon={<Email />}
                            >
                                Send Email
                            </Button>
                        </FormControl>
                    </Box>
                </Paper>
            </Modal>
            {emailComposer()}
        </>
    )
}

export default SelectAcademicModal
