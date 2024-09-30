import { Box, Menu, MenuItem } from '@mui/material'
import React, { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { CreateSpeakerModal } from './CreateSpeakerModal'
import { CreateSpeakerModalAlt } from './CreateSpeakerModalAlt'
import { SpeakerTable } from './SpeakerTable'
import {
    AddButton,
    EmailContentSpeakerForm,
    EmailFormModal,
} from '../../../components'
import EmailSpeakersButton from './EmailSpeakersButtons'
import { MainEvent, Speaker, Trip } from '../../../types/frontendTypes'

// Define the type for the loader data
interface LoaderData {
    speakers?: Speaker[]
    events?: MainEvent[]
    trips?: Trip[]
}

export const Speakers: FC = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openModalAlt, setOpenModalAlt] = useState(false)
    const [openEmailModal, setOpenEmailModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)

    const handleOpenModal = () => setOpenModal(true)
    const handleOpenModalAlt = () => setOpenModalAlt(true)
    const handleCloseModal = () => setOpenModal(false)
    const handleCloseModalAlt = () => setOpenModalAlt(false)

    const handleClickButton = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const handleMenuItemClick = (option: 1 | 2 | 3) => {
        handleCloseMenu()
        if (option === 1) {
            setOpenEmailModal(true)
        } else if (option === 2) {
            handleOpenModal()
        } else if (option === 3) {
            handleOpenModalAlt()
        }
    }

    const handleEmailSubmit = (
        recipientEmail: string,
        recipientTitle: string,
        recipientName: string
    ) => {
        const mailtoLinkSpeakerForm = EmailContentSpeakerForm({
            recipientEmail,
            recipientTitle: recipientTitle,
            recipientName: recipientName,
        })
        window.location.href = mailtoLinkSpeakerForm
    }

    const { speakers, events, trips } = useLoaderData() as LoaderData
    if (!speakers || !events || !trips) {
        return <div>Error</div>
    }

    return (
        <Box className="space-y-8 flex flex-col">
            <Box className="flex flex-col">
                <Box className="flex justify-end space-x-4">
                    <EmailSpeakersButton speakers={speakers} events={events} />
                    <AddButton name={'Speaker'} onClick={handleClickButton} />
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={() => handleMenuItemClick(1)}>
                        Email Speaker Form
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick(2)}>
                        Enter Full Detail
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick(3)}>
                        Enter Partial Detail
                    </MenuItem>
                </Menu>
                <CreateSpeakerModal
                    handleClose={handleCloseModal}
                    open={openModal}
                />
                <CreateSpeakerModalAlt
                    handleClose={handleCloseModalAlt}
                    open={openModalAlt}
                />
                <EmailFormModal
                    open={openEmailModal}
                    handleClose={() => setOpenEmailModal(false)}
                    onSubmit={handleEmailSubmit}
                />
            </Box>
            {/* <SpeakerWidgets /> */}
            <SpeakerTable speakers={speakers} trips={trips} />
        </Box>
    )
}
