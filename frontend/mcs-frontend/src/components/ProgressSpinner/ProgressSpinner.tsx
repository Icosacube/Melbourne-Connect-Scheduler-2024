import React from 'react'
import { CircularProgress, Box } from '@mui/material'

interface ProgressSpinnerProps {
    size?: number
}

export const ProgressSpinner: React.FC<ProgressSpinnerProps> = ({
    size = 40,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <CircularProgress size={size} color={'primary'} />
        </Box>
    )
}
