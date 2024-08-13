import * as React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { FormInputProps } from './FormInputProps'
import { Controller } from 'react-hook-form'

export const FormInputDateTime = ({ name, control, label }: FormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label={label}
                        value={value}
                        onChange={onChange}
                        format="DD/MM/YYYY HH:mm"
                        slotProps={{
                            textField: { fullWidth: true, size: 'small' },
                        }}
                    />
                </LocalizationProvider>
            )}
        />
    )
}
