import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import React, { FC, useState } from 'react'
import { deleteMainEventById } from '../../../scripts/event/function'
import BottomSuccessSnackbar from '../../../components/BottomSuccessSnackbar/BottomSuccessSnackbar'
import { useNavigate } from 'react-router-dom'

interface DeleteEventButtonProps {
    eventId: string
}

export const DeleteEventButton: FC<DeleteEventButtonProps> = ({ eventId }) => {
    const [showSuccess, setShowSuccess] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const navigate = useNavigate()

    const handleDelete = async () => {
        await deleteMainEventById(eventId)
        setShowSuccess(true)
        setTimeout(() => {
            navigate('/events')
        }, 1000)
    }

    const handleDialogOpen = () => {
        setOpenDialog(true)
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
    }

    const handleConfirmDelete = () => {
        handleDialogClose()
        handleDelete()
    }

    return (
        <>
            <Button
                className="text-xl py-1.8 px-4"
                variant="outlined"
                size="large"
                disableElevation
                onClick={handleDialogOpen}
                color="error"
            >
                Delete
            </Button>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>{'Are you sure?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this event? This action
                        cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <BottomSuccessSnackbar
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                message="Event deleted"
            />
        </>
    )
}
