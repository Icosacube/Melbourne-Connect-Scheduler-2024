import { Box } from '@mui/material'
import React from 'react'
import { VenuesTable } from './VenuesTable'
import { useLoaderData } from 'react-router-dom'
import { Venue } from '../../types/frontendTypes'

export const Venues: React.FC = () => {
    const venues = useLoaderData() as Venue[]
    console.log(venues)
    return (
        <Box>
            <h1>Venue Page</h1>
            <VenuesTable venues={venues} />
        </Box>
    )
}
