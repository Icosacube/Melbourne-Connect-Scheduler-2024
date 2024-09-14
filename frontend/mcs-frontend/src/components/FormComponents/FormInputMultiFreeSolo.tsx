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

/* For selecting academics */
export const FormInputMultiFreeSolo: React.FC<FormInputProps> = ({
    name,
    control,
    label,
    options = [],
    required = false,
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
                        freeSolo
                        options={options}
                        getOptionLabel={(option: string | DropdownOptions) =>
                            typeof option === 'string' ? option : option.label
                        }
                        value={value || []}
                        onChange={(event, newValue) => {
                            onChange(
                                newValue.map((item: string | DropdownOptions) =>
                                    typeof item === 'string'
                                        ? { id: null, value: item, label: item }
                                        : item
                                )
                            )
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
                        renderTags={(selected, getTagProps) => (
                            <>
                                {selected.map((option, index) => (
                                    <Chip
                                        {...getTagProps({ index })}
                                        avatar={
                                            typeof option !== 'string' ? (
                                                <Avatar alt={option.label} />
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
                                placeholder={label}
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

export default FormInputMultiFreeSolo
