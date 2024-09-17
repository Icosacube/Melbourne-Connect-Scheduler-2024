import React from 'react'
import { FormInputProps } from './FormInputProps'
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export const FormInputPassword = ({
    name,
    control,
    label,
    required = false,
    hint = ''
}: FormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: required }} // Add validation rule based on `required`
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField
                    helperText={error ? error.message : null}
                    placeholder = {hint}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                    required={required}
                    type="password"
                />
            )}
        />
    );
};