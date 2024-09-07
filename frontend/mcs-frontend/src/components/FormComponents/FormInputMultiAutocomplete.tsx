import React from 'react'
import {
    Autocomplete,
    FormControl,
    TextField,
    Typography,
    Box,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { FormInputProps } from './FormInputProps'

export const FormInputMultiAutocomplete: React.FC<FormInputProps> = ({
    name,
    control,
    label,
    options = [],
}) => {
    return (
        <FormControl size="small" variant="outlined" fullWidth>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        multiple
                        options={options}
                        getOptionLabel={(option) => option.label}
                        value={options.filter((option) =>
                            (value || []).includes(option.value)
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
                                placeholder={label}
                            />
                        )}
                    />
                )}
            />
        </FormControl>
    )
}

export default FormInputMultiAutocomplete
