import { Box } from '@mui/material'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Venue } from '../../types/frontendTypes'
import { VenuesTable } from './VenuesTable'

export const Venues: React.FC = () => {
    const venues = useLoaderData() as Venue[]
    return (
        <Box>
            <VenuesTable venues={venues} />
        </Box>
    )
}
