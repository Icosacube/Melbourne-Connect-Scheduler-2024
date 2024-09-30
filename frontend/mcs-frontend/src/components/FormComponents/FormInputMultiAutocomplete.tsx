import React from 'react'
import { Autocomplete, FormControl, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { DropdownOptions, FormInputProps } from './FormInputProps'

interface FormInputMultiAutocomplete extends FormInputProps {
    defaultValueList?: DropdownOptions[]
}

export const FormInputMultiAutocomplete: React.FC<FormInputMultiAutocomplete> = ({
    name,
    control,
    label,
    options = [],
    required = false,
    hint = '',
    defaultValueList = [],
}) => {
    return (
        <FormControl
            size="small"
            variant="outlined"
            fullWidth
            required={required}
        >
            <Controller
                name={name}
                control={control}
                rules={{ required: required ? `${label} is required` : false }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <Autocomplete
                        multiple
                        options={options}
                        getOptionLabel={(option) => option.label}
                        value={options.filter((option) =>
                            (value || defaultValueList.map(option => option.value)).includes(option.value)
                        )}
                        onChange={(event, newValue) => {
                            onChange(newValue.map((item) => item.value))
                        }}
                        disableCloseOnSelect
                        renderOption={(props, option, { selected }) => (
                            <li
                                {...props}
                                style={{
                                    backgroundColor: selected
                                        ? undefined
                                        : 'transparent',
                                    fontWeight: selected ? 'bold' : 'normal',
                                }}
                            >
                                <Typography>{option.label}</Typography>
                            </li>
                        )}
                        renderTags={(selected, getTagProps) => (
                            <>
                                {selected.map((option, index) => (
                                    <Typography
                                        {...getTagProps({ index })}
                                        sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 1,
                                        }}
                                    >
                                        {option.label}
                                    </Typography>
                                ))}
                            </>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label={label}
                                placeholder={hint}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                    />
                )}
            />
        </FormControl>
    )
}

export default FormInputMultiAutocomplete
