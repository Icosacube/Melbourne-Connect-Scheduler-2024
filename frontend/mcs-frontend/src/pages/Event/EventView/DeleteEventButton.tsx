import { Button } from '@mui/material'
import React, { FC } from 'react'
import { deleteMainEventById } from '../../../scripts/event/function'

interface DeleteEventButtonProps {
    eventId: string
}

export const DeleteEventButton: FC<DeleteEventButtonProps> = ({ eventId }) => {
    const handleDelete = async () => {
        await deleteMainEventById(eventId)
    }
    return (
        <Button
            className="text-xl py-1.8 px-4"
            variant="outlined"
            size="large"
            disableElevation
            onClick={handleDelete}
            color="error"
        >
            Delete
        </Button>
    )
}
