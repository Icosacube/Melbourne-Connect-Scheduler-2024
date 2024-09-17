import React, { useState, ChangeEvent, FocusEvent } from 'react'
import { TextField } from '@mui/material'

interface EmailFieldProps {
    label: string
    value: string
    onChange: (value: string) => void
}

export const EmailFormField: React.FC<EmailFieldProps> = ({
    label,
    value,
    onChange,
}) => {
    const [error, setError] = useState<string>('')
    const [touched, setTouched] = useState<boolean>(false)

    const isValidEmail = (email: string): boolean => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return re.test(String(email).toLowerCase())
    }

    const validateEmail = (email: string): string => {
        if (email.trim() === '') {
            return 'Email is required'
        } else if (!isValidEmail(email)) {
            return 'Invalid email address'
        }
        return ''
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value
        onChange(newEmail)

        if (touched) {
            setError(validateEmail(newEmail))
        }
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        if (!touched) {
            setTouched(true)
        }
        setError(validateEmail(value))
    }

    return (
        <TextField
            fullWidth
            label={label}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched && !!error}
            helperText={touched && error}
            margin="normal"
            sx={{ marginTop: '1.5rem' }}
        />
    )
}
