import React from 'react'
import {
    Autocomplete,
    FormControl,
    TextField,
    FormHelperText,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { FormInputProps, DropdownOptions } from './FormInputProps'

export const FormInputSingleAutocomplete: React.FC<FormInputProps> = ({
    name,
    control,
    label,
    options = [],
    required = false,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${label} is required` : false }}
            render={({ field, fieldState }) => (
                <FormControl
                    sx={{ margin: '8px 0' }}
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={!!fieldState.error}
                    required={required}
                >
                    <Autocomplete
                        options={options}
                        getOptionLabel={(option: DropdownOptions) =>
                            option.label
                        }
                        value={
                            options.find(
                                (option) => option.value === field.value[0]
                            ) || null
                        }
                        onChange={(event, newValue) => {
                            field.onChange(newValue ? [newValue.value] : [])
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                variant="outlined"
                                error={!!fieldState.error}
                            />
                        )}
                    />
                    {fieldState.error && (
                        <FormHelperText error>
                            {fieldState.error.message}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    )
}

export default FormInputSingleAutocomplete
