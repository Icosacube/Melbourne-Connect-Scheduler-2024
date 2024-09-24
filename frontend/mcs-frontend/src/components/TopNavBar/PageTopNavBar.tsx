import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Box,
    Breadcrumbs,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import CreateIcon from '@mui/icons-material/Create'
import ShareIcon from '@mui/icons-material/Share'

interface PageTopNavBarProps {
    type: string
    link: string
    pageTitle: string
    openEditModal: () => void
}

export const PageTopNavBar: React.FC<PageTopNavBarProps> = ({
    type,
    link,
    pageTitle,
    openEditModal,
}) => {
    const navigate = useNavigate()

    const breadcrumbs = [
        <Link
            key="1"
            // underline="hover"
            to={link}
            color="inherit"
        >
            {type} Overview
        </Link>,
        <Typography key="2" color="text.primary">
            {pageTitle}
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
                        <Typography variant="h2">{type}</Typography>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Box>
                </Box>
                <Box className="flex place-items-center">
                    <Box className="flex h-14 space-x-4 mr-12">
                        <Button
                            variant="contained"
                            className="bg-accent2 hover:bg-secondary hover:text-white text-white"
                        >
                            <ShareIcon />
                            <Typography variant="h6" className="ml-3">
                                Share
                            </Typography>
                        </Button>
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
