import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { MainEvent, Speaker } from '../../../types/frontendTypes'
import { EmailTemplatingChoiceModal } from './EmailTemplatingChoiceModal'

interface EmailSpeakersButtonProps {
    events: MainEvent[]
    speakers: Speaker[]
}

const EmailSpeakersButton: React.FC<EmailSpeakersButtonProps> = ({
    events,
    speakers,
}) => {
    const [emailTemplatingModal, setEmailTemplatingModal] = useState(false)

    const hanndleOpenEmailTemplatingModal = () => {
        setEmailTemplatingModal(true)
    }
    const handleCloseEmailTemplatingModal = () => {
        setEmailTemplatingModal(false)
    }

    return (
        <>
            <Box className="flex justify-end space-x-4">
                <Button
                    className="flex self-end bg-red-700 text-white hover:bg-red-500 py-2.5 px-3.5"
                    variant="contained"
                    size="large"
                    disableElevation
                    onClick={hanndleOpenEmailTemplatingModal}
                >
                    <EmailOutlinedIcon className="mr-1.5" />{' '}
                    <Typography className="text-[#EBF5EE]">
                        Email Speaker
                    </Typography>
                </Button>
            </Box>
            <EmailTemplatingChoiceModal
                open={emailTemplatingModal}
                onClose={handleCloseEmailTemplatingModal}
                events={events}
                speakers={speakers}
            />
        </>
    )
}

export default EmailSpeakersButton
