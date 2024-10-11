import React from 'react'
import { Grid } from '@mui/material'
import { OutlinedButton } from './OutlinedButton'
import { SubmitButton } from './SubmitButton'
import { UseFormHandleSubmit } from 'react-hook-form'

interface FormButtonGroupProps {
    handleClose: () => void
    handleSubmit: UseFormHandleSubmit<any, any>
    onSubmit: (data: any) => void
    submitting: boolean
}

export const FormButtonGroup: React.FC<FormButtonGroupProps> = ({
    handleClose,
    handleSubmit,
    onSubmit,
    submitting,
}) => {
    return (
        <Grid item xs={12} container justifyContent="space-between">
            <OutlinedButton name="Cancel" onClick={handleClose} />
            <SubmitButton
                submitting={submitting}
                onClick={handleSubmit(onSubmit)}
            />
        </Grid>
    )
}

