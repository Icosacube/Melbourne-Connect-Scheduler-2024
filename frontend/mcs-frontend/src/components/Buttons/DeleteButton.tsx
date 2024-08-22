import React from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'

interface DeleteButtonProps {
    onClick: () => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
    onClick,
}) => {
    return (
        <Button
            className="hover:bg-tertiary text-xl py-2 px-4"
            variant="contained"
            size="large"
            color='error'
            disableElevation
            onClick={onClick}
        >
            Delete
        </Button>
    )
}
