import React from 'react'
import { Button, Typography } from '@mui/material'
import { AddCircleOutlineOutlined } from '@mui/icons-material'

interface AddButtonProps {
    name: string
    onClick: (arg0: any) => void
}

export const AddButton: React.FC<AddButtonProps> = ({ name, onClick }) => {
    return (
        <Button
            className="flex self-end hover:bg-tertiary py-2.5 px-3.5"
            variant="contained"
            size="large"
            disableElevation
            onClick={onClick}
        >
            <AddCircleOutlineOutlined className="mr-1.5" />{' '}
            <Typography>Add {name}</Typography>
        </Button>
    )
}
