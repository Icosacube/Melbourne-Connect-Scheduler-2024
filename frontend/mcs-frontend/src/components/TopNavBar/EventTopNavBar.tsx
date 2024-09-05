import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import CreateIcon from '@mui/icons-material/Create'

import {
    Box,
    Breadcrumbs,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EventTabs } from '../../pages/Event/EventView/EventTabs'
import { ShareButton } from '../../pages/Event/EventView/ShareButton'
import { MainEvent } from '../../types/frontendTypes'

interface EventTopNavBarProps {
    getCurTab: (data: string) => void
    openEditModal: () => void
    event: MainEvent
}

const EventTopNavBar: React.FC<EventTopNavBarProps> = ({
    getCurTab,
    openEditModal,
    event,
}) => {
    const [tabName, setTabName] = useState('About')
    const navigate = useNavigate()

    const handleTabChange = (data: string) => {
        setTabName(data)
        getCurTab(data)
    }

    const breadcrumbs = [
        <Link
            key="1"
            // underline="hover"
            to={'/events'}
            color="inherit"
        >
            Events Overview
        </Link>,
        <Typography key="2" color="text.primary">
            Event
        </Typography>,
    ]

    return (
        <Toolbar className="bg-white h-24 shadow-md w-full mb-6">
            <Box className="flex justify-between w-full">
                <Box className="flex place-items-center">
                    <IconButton
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        {<ArrowBackIosIcon />}
                    </IconButton>
                    <Box className="ml-2">
                        <Typography variant="h2">{tabName}</Typography>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Box>
                </Box>
                <Box className="flex place-items-center">
                    <EventTabs getTabName={handleTabChange} />
                    <Box className="flex h-14 space-x-4 mx-12">
                        <ShareButton event={event} />
                        <Button
                            variant="contained"
                            onClick={openEditModal}
                            className="bg-primary hover:bg-secondary hover:text-white text-black"
                        >
                            <CreateIcon />
                            <Typography variant="h6" className="ml-3">
                                Edit
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Toolbar>
    )
}

export default EventTopNavBar
