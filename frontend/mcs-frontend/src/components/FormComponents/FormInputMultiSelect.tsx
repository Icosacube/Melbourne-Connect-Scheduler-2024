import React from 'react'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Box,
    Typography,
    Checkbox,
    ListItemText,
    Chip,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { FormInputProps } from './FormInputProps' // Make sure this type is correctly defined

export const FormInputMultiSelect: React.FC<FormInputProps> = ({
    name,
    control,
    label,
    options = [],
}) => {
    return (
        <FormControl
            size="small"
            variant="outlined"
            sx={{ margin: '8px 0' }}
            fullWidth
        >
            <InputLabel>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Select
                        multiple
                        value={value || []}
                        onChange={onChange}
                        renderValue={(selected) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                }}
                            >
                                {(selected as string[]).map((value) => (
                                    <Chip
                                        label={
                                            options.find(
                                                (option) =>
                                                    option.value === value
                                            )?.label
                                        }
                                        variant="outlined"
                                    />
                                ))}
                            </Box>
                        )}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                <Checkbox
                                    checked={(value || []).includes(
                                        option.value
                                    )}
                                />
                                <ListItemText primary={option.label} />
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
        </FormControl>
    )
}
