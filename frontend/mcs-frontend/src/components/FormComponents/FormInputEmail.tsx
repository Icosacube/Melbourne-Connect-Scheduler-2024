import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import { FormInputProps } from './FormInputProps'

export const FormInputEmail = ({
    name,
    control,
    label,
    required = false,
    hint = '',
}: FormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: required ? 'Email is required' : false,
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                },
            }}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField
                    helperText={error ? error.message : null}
                    placeholder={hint}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                    required={required}
                    type="email"
                />
            )}
        />
    )
}
