import { UploadFile } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

interface UploadButtonProps {
    link: string
    name: string
}

export const UploadButton: React.FC<UploadButtonProps> = ({ link, name }) => {
    return (
        <Button
            className="hover:bg-tertiary text-xl py-2 px-4"
            variant="contained"
            size="large"
            disableElevation
            href={link}
        >
            <UploadFile />
            Upload {name}
        </Button>
    )
}
