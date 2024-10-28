import { Alert, Snackbar } from '@mui/material'
import React from 'react'

interface Props {
    showSuccess: boolean
    setShowSuccess: (show: boolean) => void
    message: string
    variant?: 'success' | 'error' | 'warning' | 'info'
}

export const BottomSuccessSnackbar: React.FC<Props> = ({
    showSuccess,
    setShowSuccess,
    message,
    variant = 'success',
}) => {
    return (
        <Snackbar
            open={showSuccess}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={2000}
            onClose={() => setShowSuccess(false)}
        >
            <Alert severity={variant} onClose={() => setShowSuccess(false)}>
                {message}
            </Alert>
        </Snackbar>
    )
}
