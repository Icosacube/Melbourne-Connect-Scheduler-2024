import React from 'react'
import { Controller } from 'react-hook-form'
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material'
import { FormInputProps, DropdownOptions } from './FormInputProps'

export const FormInputDropdownSingle: React.FC<FormInputProps> = ({
    name,
    control,
    label,
    options = [],
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: `${label} is required` }}
            render={({ field, fieldState }) => (
                <FormControl
                    sx={{ margin: '8px 0' }}
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={!!fieldState.error}
                    required
                >
                    <InputLabel>{label}</InputLabel>
                    <Select
                        {...field}
                        label={label}
                        value={field.value[0] || ''}
                        onChange={(e) => field.onChange([e.target.value])}
                    >
                        {options.map((option: DropdownOptions) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {fieldState.error && (
                        <FormHelperText>
                            {fieldState.error.message}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    )
}
