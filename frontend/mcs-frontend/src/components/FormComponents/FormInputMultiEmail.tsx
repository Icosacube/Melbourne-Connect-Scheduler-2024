import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller } from 'react-hook-form'
import { FormInputProps } from './FormInputProps'

// Simulated contact list for auto-complete
const contacts = [
    { id: 1, email: 'john@example.com', name: 'John Doe' },
    { id: 2, email: 'jane@example.com', name: 'Jane Smith' },
    // Add more contacts as needed
]

export const FormInputMultiEmail = ({
    name,
    control,
    label,
    required = false,
    hint = '',
}: FormInputProps) => {
    const [inputValue, setInputValue] = useState('')

    const validateEmail = (email: string) => {
        const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        return re.test(email) ? null : 'Invalid email address'
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: required ? 'Email is required' : false,
                validate: (value) => {
                    if (Array.isArray(value)) {
                        return (
                            value.every((email) => !validateEmail(email)) ||
                            'One or more email addresses are invalid'
                        )
                    }
                    return !validateEmail(value) || 'Invalid email address'
                },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Autocomplete
                    multiple
                    freeSolo
                    options={contacts}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option
                        }
                        return option.email
                    }}
                    renderTags={(value: string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText={error ? error.message : null}
                            placeholder={hint}
                            size="small"
                            error={!!error}
                            fullWidth
                            label={label}
                            variant="outlined"
                            required={required}
                        />
                    )}
                    inputValue={inputValue}
                    onInputChange={(_, newInputValue) => {
                        setInputValue(newInputValue)
                    }}
                    onChange={(_, newValue) => {
                        onChange(
                            newValue.map((item) =>
                                typeof item === 'string' ? item : item.email
                            )
                        )
                    }}
                    value={value || []}
                />
            )}
        />
    )
}
