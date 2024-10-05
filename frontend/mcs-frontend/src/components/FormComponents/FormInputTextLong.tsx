import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { FormInputProps } from './FormInputProps'
import React from 'react'

interface FormInputTextLongProps extends FormInputProps {
    rows?: number
    maxRows?: number
    required?: boolean
    hint?: string
}

export const FormInputTextLong: React.FC<FormInputTextLongProps> = ({
    name,
    control,
    label,
    rows = 3,
    maxRows = 10,
    required = false,
    hint = '',
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                    multiline
                    minRows={rows}
                    maxRows={maxRows}
                    required={required}
                    placeholder={hint}
                />
            )}
        />
    )
}
