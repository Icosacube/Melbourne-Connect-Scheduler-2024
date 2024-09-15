import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { MainEvent } from '../../../../types/frontendTypes'
import CanvassingCreation from './CanvassingCreation'

interface CanvassingAllProps {
    event: MainEvent
}

export const CanvassingAll: React.FC<CanvassingAllProps> = ({ event }) => {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Create Canvassing Form
            </Typography>
            <CanvassingCreation event={event} />
        </>
    )
}

export default CanvassingAll
