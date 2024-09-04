import { Button, CircularProgress } from '@mui/material'
import React from 'react'

interface DeleteButtonProps {
    onClick: () => void
    deleting: boolean
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
    onClick,
    deleting,
}) => {
    return (
        <Button
            className="hover:bg-tertiary text-xl py-2 px-4"
            variant="contained"
            size="large"
            color="error"
            disableElevation
            onClick={onClick}
            disabled={deleting} // Disable button while submitting
            startIcon={
                deleting ? (
                    <CircularProgress size={20} color="inherit" />
                ) : undefined
            }
        >
            Delete
        </Button>
    )
}
