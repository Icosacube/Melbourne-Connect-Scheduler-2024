import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { MainEvent } from '../../../../types/frontendTypes'
import CanvassingCreation from './CanvassingCreation'
import { CanvassingResultsFC } from './CanvassingResultsFC'
import { CanvassingResults } from '../../../Canvassing/CanvassingResults'

interface CanvassingAllProps {
    event: MainEvent
}

export const CanvassingAll: React.FC<CanvassingAllProps> = ({ event }) => {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                A Page Title
            </Typography>
            <CanvassingCreation event={event} />
            <CanvassingResultsFC />
            <CanvassingResults />
        </>
    )
}

export default CanvassingAll
