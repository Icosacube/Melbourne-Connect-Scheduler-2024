import { Box } from '@mui/material'
import React, { FC } from 'react'
import { MainEvent } from '../../../../types/frontendTypes'

interface CanvassingCreationProps {
    event: MainEvent
}

export const CanvassingCreation: FC<CanvassingCreationProps> = ({ event }) => {
    return <Box>${event.RecordID}</Box>
}

export default CanvassingCreation
