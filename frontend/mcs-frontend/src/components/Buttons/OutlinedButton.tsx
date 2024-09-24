import React from 'react'
import { Button } from '@mui/material'

interface OutlinedButtonProps {
    name: string
    onClick: () => void
}

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({ name, onClick }) => {
    return (
        <Button
            className="text-xl py-1.8 px-4"
            variant="outlined"
            size="large"
            disableElevation
            onClick={onClick}
        >
            {name}
        </Button>
    )
}