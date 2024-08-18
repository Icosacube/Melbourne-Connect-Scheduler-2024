import React, { FC } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Typography,
} from '@mui/material'

interface DeleteDialogProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    name?: string
}

export const DeleteDialog: FC<DeleteDialogProps> = ({
    open,
    onClose,
    onConfirm,
    name = 'item',
}) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog">
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this {name}?
                </DialogContentText>
            </DialogContent>
            <DialogActions className="p-4">
                <Button onClick={onClose}>
                    <Typography variant="body1" color="grey">
                        Cancel
                    </Typography>
                </Button>
                <Button variant="contained" onClick={onConfirm} color="error">
                    <Typography variant="body1" color="white">
                        Delete
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}
