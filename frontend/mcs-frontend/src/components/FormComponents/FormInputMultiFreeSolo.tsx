import React from 'react'
import {
    Autocomplete,
    Avatar,
    Chip,
    FormControl,
    TextField,
    Typography,
    Box,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { DropdownOptions, FormInputProps } from './FormInputProps'

export const FormInputMultiFreeSolo: React.FC<FormInputProps> = ({
    name,
    control,
    label,
    options = [],
    required = true,
    hint = '',
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
                }) => {
                    // Filter out options that are already selected
                    const selectedValues =
                        value != null
                            ? value.map((item: DropdownOptions) => item.value)
                            : null
                    const filteredOptions = options.filter((option) =>
                        selectedValues != null
                            ? !selectedValues.includes(option.value)
                            : option
                    )

                    return (
                        <Autocomplete
                            multiple
                            freeSolo
                            options={filteredOptions}
                            getOptionLabel={(
                                option: string | DropdownOptions
                            ) =>
                                typeof option === 'string'
                                    ? option
                                    : option.label
                            }
                            value={value || []}
                            onChange={(event, newValue) => {
                                // Ensure the output format
                                const updatedValue = newValue.map((item) =>
                                    typeof item === 'string'
                                        ? { id: null, value: item, label: item }
                                        : {
                                              id: item.id,
                                              value: item.value,
                                              label: item.label,
                                          }
                                )
                                onChange(updatedValue)
                            }}
                            disableCloseOnSelect
                            renderOption={(
                                props,
                                option: string | DropdownOptions,
                                { selected }
                            ) => (
                                <li {...props}>
                                    <Box
                                        style={{
                                            backgroundColor: selected
                                                ? undefined
                                                : 'transparent',
                                            fontWeight: selected
                                                ? 'bold'
                                                : 'normal',
                                        }}
                                        display="flex"
                                        alignItems="center"
                                    >
                                        {typeof option !== 'string' ? (
                                            <Avatar
                                                alt={option.label}
                                                sx={{ marginRight: 1 }}
                                            />
                                        ) : (
                                            <Avatar sx={{ marginRight: 1 }}>
                                                {option[0].toUpperCase()}
                                            </Avatar>
                                        )}
                                        <Typography>
                                            {typeof option === 'string'
                                                ? option
                                                : option.label}
                                        </Typography>
                                    </Box>
                                </li>
                            )}
                            renderTags={(
                                selected: (string | DropdownOptions)[],
                                getTagProps
                            ) => (
                                <>
                                    {selected.map((option, index) => (
                                        <Chip
                                            {...getTagProps({ index })}
                                            avatar={
                                                typeof option !== 'string' ? (
                                                    <Avatar
                                                        alt={option.label}
                                                    />
                                                ) : (
                                                    <Avatar>
                                                        {option[0].toUpperCase()}
                                                    </Avatar>
                                                )
                                            }
                                            label={
                                                typeof option === 'string'
                                                    ? option
                                                    : option.label
                                            }
                                        />
                                    ))}
                                </>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label={label}
                                    placeholder={hint != null ? hint : label}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                        />
                    )
                }}
            />
        </FormControl>
    )
}

export default FormInputMultiFreeSolo
