import { Alert, Slide, Snackbar } from '@mui/material'
import React from 'react'

interface Props {
    showSuccess: boolean
    setShowSuccess: (show: boolean) => void
    message: string
}

export const BottomSuccessSnackbar: React.FC<Props> = ({
    showSuccess,
    setShowSuccess,
    message,
}) => {
    return (
        <Snackbar
            open={showSuccess}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={2000}
            onClose={() => setShowSuccess(false)}
            TransitionComponent={(props) => <Slide {...props} direction="up" />}
        >
            <Alert severity="success" onClose={() => setShowSuccess(false)}>
                {message}
            </Alert>
        </Snackbar>
    )
}
