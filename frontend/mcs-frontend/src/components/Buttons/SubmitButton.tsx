import { Button, CircularProgress } from '@mui/material'
import React from 'react'

interface SubmitButtonProps {
    submitting: boolean
    onClick: () => void
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    submitting,
    onClick,
}) => {
    return (
        <Button
            className="hover:bg-tertiary text-xl py-2 px-4"
            variant="contained"
            size="large"
            disableElevation
            onClick={onClick}
            disabled={submitting} // Disable button while submitting
            startIcon={
                submitting ? (
                    <CircularProgress size={20} color="inherit" />
                ) : undefined
            }
        >
            Submit
        </Button>
    )
}
