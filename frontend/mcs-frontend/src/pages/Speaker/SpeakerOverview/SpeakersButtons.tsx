import React, { useState, useRef } from 'react'
import { Box, Button, Typography, Menu, MenuItem } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { AddCircleOutlineOutlined } from '@mui/icons-material'

interface SpeakersButtonProps {}

const SpeakersButton: React.FC<SpeakersButtonProps> = ({}) => {
    const [emailAnchorEl, setEmailAnchorEl] = useState<null | HTMLElement>(null)
    const [addAnchorEl, setAddAnchorEl] = useState<null | HTMLElement>(null)
    const emailButtonRef = useRef<HTMLButtonElement>(null)
    const addButtonRef = useRef<HTMLButtonElement>(null)

    const handleEmailClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEmailAnchorEl(event.currentTarget)
    }

    const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddAnchorEl(event.currentTarget)
    }

    const handleEmailClose = () => {
        setEmailAnchorEl(null)
    }

    const handleAddClose = () => {
        setAddAnchorEl(null)
    }

    return (
        <Box className="flex justify-end space-x-4">
            <Button
                ref={emailButtonRef}
                className="flex self-end bg-red-700 text-white hover:bg-red-500 py-2.5 px-3.5"
                variant="contained"
                size="large"
                disableElevation
                onClick={handleEmailClick}
            >
                <EmailOutlinedIcon className="mr-1.5" />{' '}
                <Typography className="text-[#EBF5EE]">
                    Email Speaker
                </Typography>
            </Button>
            <Menu
                anchorEl={emailAnchorEl}
                open={Boolean(emailAnchorEl)}
                onClose={handleEmailClose}
                PaperProps={{
                    style: {
                        width: emailButtonRef.current?.offsetWidth,
                    },
                }}
            >
                <MenuItem onClick={handleEmailClose}>Option 1</MenuItem>
                <MenuItem onClick={handleEmailClose}>Option 2</MenuItem>
                <MenuItem onClick={handleEmailClose}>Option 3</MenuItem>
            </Menu>

            <Button
                className="flex self-end hover:bg-tertiary py-2.5 px-3.5"
                variant="contained"
                size="large"
                disableElevation
                ref={addButtonRef}
                onClick={handleAddClick}
            >
                <AddCircleOutlineOutlined className="mr-1.5" />{' '}
                <Typography>Add Speaker</Typography>
            </Button>
            <Menu
                anchorEl={addAnchorEl}
                open={Boolean(addAnchorEl)}
                onClose={handleAddClose}
                PaperProps={{
                    style: {
                        width: addButtonRef.current?.offsetWidth,
                    },
                }}
            >
                <MenuItem onClick={handleAddClose}>Add Option 1</MenuItem>
                <MenuItem onClick={handleAddClose}>Add Option 2</MenuItem>
                <MenuItem onClick={handleAddClose}>Add Option 3</MenuItem>
            </Menu>
        </Box>
    )
}

export default SpeakersButton
