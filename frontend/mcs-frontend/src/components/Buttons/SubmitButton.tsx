import { Button, CircularProgress } from '@mui/material'
import React from 'react'

interface SubmitButtonProps {
    submitting: boolean
    onClick: () => void
    disabled?: boolean
    startIcon?: React.ReactNode
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    submitting,
    onClick,
    disabled = false,
    startIcon = <></>,
}) => {
    return (
        <Button
            className="hover:bg-tertiary text-xl py-2 px-4"
            variant="contained"
            size="large"
            disableElevation
            onClick={onClick}
            disabled={disabled || submitting} // Disable button while submitting
            startIcon={
                submitting ? (
                    <CircularProgress size={20} color="inherit" />
                ) : (
                    startIcon
                )
            }
        >
            Submit
        </Button>
    )
}
