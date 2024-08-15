import { Box, Button, Typography, Menu, MenuItem } from '@mui/material'
import React, { FC } from 'react'
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined'
import { CreateSpeakerModal } from './CreateSpeakerModal'
import { useLoaderData } from 'react-router-dom'
import { SpeakerTable } from './SpeakerTable'
import { SpeakerWidgets } from './SpeakerWidgets'
import { CreateSpeakerModalAlt } from './CreateSpeakerModalAlt'
import { AddButton } from '../../../components'

export const Speakers: FC = () => {
    const [openModal, setOpenModal] = React.useState(false)
    const [openModalAlt, setOpenModalAlt] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
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
            handleOpenModal()
        } else {
            handleOpenModalAlt()
        }
    }

    const speakers = useLoaderData()

    return (
        <Box className="space-y-8 flex flex-col">
            <Box className="flex flex-col">
                <AddButton name={'Speaker'} onClick={handleClickButton} />
                <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={() => handleMenuItemClick(1)}>
                        Normal
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick(2)}>
                        Alt
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
            </Box>
            <SpeakerWidgets />
            <SpeakerTable data={speakers} />
        </Box>
    )
}
