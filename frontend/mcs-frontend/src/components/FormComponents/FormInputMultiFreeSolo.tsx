import React, { useState } from 'react'
import {
    Autocomplete,
    Avatar,
    Chip,
    FormControl,
    TextField,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { DropdownOptions, FormInputProps } from './FormInputProps'

interface FormInputMultiFreeSoloProps extends FormInputProps {
    valueName: string
    labelName: string
}

export const FormInputMultiFreeSolo: React.FC<FormInputMultiFreeSoloProps> = ({
    name,
    control,
    label,
    options = [],
    required = true,
    hint = '',
    valueName,
    labelName,
}) => {
    const [open, setOpen] = useState(false)
    const [newValue, setNewValue] = useState('')
    const [customLabel, setCustomLabel] = useState('')

    const handleOpenModal = (value: string) => {
        setNewValue(value)
        setCustomLabel('')
        setOpen(true)
    }

    const handleCloseModal = (
        save: boolean,
        onChange: any,
        currentValue: any
    ) => {
        if (save && newValue) {
            const newEntry = { id: null, value: newValue, label: customLabel }
            const updatedValue =
                currentValue != null ? [...currentValue, newEntry] : [newEntry]
            onChange(updatedValue)
        }
        setOpen(false)
    }

    return (
        <>
            <FormControl
                size="small"
                variant="outlined"
                fullWidth
                required={required}
            >
                <Controller
                    name={name}
                    control={control}
                    rules={{
                        required: required ? `${label} is required` : false,
                    }}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => {
                        // Get current selected values
                        const selectedValues =
                            value != null
                                ? value.map(
                                      (item: DropdownOptions) => item.value
                                  )
                                : null
                        // Filter out already selected options
                        const filteredOptions = options.filter((option) =>
                            selectedValues != null
                                ? !selectedValues.includes(option.value)
                                : option
                        )

                        return (
                            <>
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
                                        const lastValue =
                                            newValue[newValue.length - 1]
                                        if (typeof lastValue === 'string') {
                                            // Open modal for custom entry
                                            handleOpenModal(lastValue)
                                        } else {
                                            // Update the selected values
                                            onChange(newValue)
                                        }
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
                                                    <Avatar
                                                        sx={{ marginRight: 1 }}
                                                    >
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
                                                        typeof option !==
                                                        'string' ? (
                                                            <Avatar
                                                                alt={
                                                                    option.label
                                                                }
                                                            />
                                                        ) : (
                                                            <Avatar>
                                                                {option[0].toUpperCase()}
                                                            </Avatar>
                                                        )
                                                    }
                                                    label={
                                                        typeof option ===
                                                        'string'
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
                                            placeholder={
                                                hint != null ? hint : label
                                            }
                                            error={!!error}
                                            helperText={
                                                error ? error.message : null
                                            }
                                        />
                                    )}
                                />

                                {/* Modal for setting custom label */}
                                <Dialog
                                    open={open}
                                    onClose={() =>
                                        handleCloseModal(false, onChange, value)
                                    }
                                >
                                    <DialogTitle>
                                        <Typography variant="h6" paddingY={2}>
                                            Add New {label}
                                        </Typography>
                                    </DialogTitle>
                                    <DialogContent>
                                        <Grid
                                            container
                                            spacing={3}
                                            paddingX={1}
                                            paddingY={1.5}
                                        >
                                            <Grid item xs={12}>
                                                <TextField
                                                    label={labelName}
                                                    value={customLabel}
                                                    onChange={(e) =>
                                                        setCustomLabel(
                                                            e.target.value
                                                        )
                                                    }
                                                    fullWidth
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label={valueName}
                                                    value={newValue}
                                                    onChange={(e) =>
                                                        setNewValue(
                                                            e.target.value
                                                        )
                                                    }
                                                    fullWidth
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            sx={{
                                                marginRight: 1,
                                                marginBottom: 2,
                                            }}
                                            size="small"
                                            onClick={() =>
                                                handleCloseModal(
                                                    false,
                                                    onChange,
                                                    value
                                                )
                                            }
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            sx={{
                                                marginRight: 2,
                                                marginBottom: 2,
                                            }}
                                            size="small"
                                            variant="contained"
                                            onClick={() =>
                                                handleCloseModal(
                                                    true,
                                                    onChange,
                                                    value
                                                )
                                            }
                                            color="primary"
                                        >
                                            Save
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        )
                    }}
                />
            </FormControl>
        </>
    )
}

export default FormInputMultiFreeSolo
