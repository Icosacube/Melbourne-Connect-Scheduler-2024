import { Button, Typography } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import React, { FC } from 'react'
import { MainEvent } from '../../../types/frontendTypes'

interface ShareButtonProps {
    event: MainEvent
}

export const ShareButton: FC<ShareButtonProps> = ({ event }) => {
    const shareEvent = (event: MainEvent) => {
        console.log('Sharing event:', event)
    }

    return (
        <Button
            variant="contained"
            className="bg-accent2 hover:bg-secondary hover:text-white text-white"
            onClick={() => shareEvent(event)}
        >
            <ShareIcon />
            <Typography variant="h6" className="ml-3">
                Share
            </Typography>
        </Button>
    )
}
