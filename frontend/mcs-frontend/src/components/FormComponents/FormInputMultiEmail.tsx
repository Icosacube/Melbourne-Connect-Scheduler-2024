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

    const handlePaste = (
        event: React.ClipboardEvent,
        onChange: (value: string[]) => void,
        currentValues: string[]
    ) => {
        event.preventDefault()
        const pastedData = event.clipboardData.getData('text')
        const emails = pastedData.split(/[\s,;]+/).filter(Boolean) // Split by whitespace, comma, or semicolon
        let validEmails = []
        let invalidEmails = []
        for (const email of emails) {
            if (validateEmail(email) === null) {
                validEmails.push(email)
            } else {
                invalidEmails.push(email)
            }
        }
        // const validEmails = emails.filter(
        //     (email) => validateEmail(email) === null
        // )

        console.log('Pasted emails:', emails)

        // Update the input value and call onChange with the valid emails
        onChange([...new Set([...currentValues, ...validEmails])]) // Add new valid emails to existing ones
        setInputValue(invalidEmails.join(',')) // Clear input after pasting
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
                            onPaste={(event) => {
                                handlePaste(event, onChange, value)
                            }}
                        />
                    )}
                    inputValue={inputValue}
                    onInputChange={(_, newInputValue) => {
                        setInputValue(newInputValue)
                        console.log('Input value:', newInputValue)
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
