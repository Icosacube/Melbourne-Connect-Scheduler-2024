import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import React from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const FormInputTime = ({ name, control, label }: FormInputProps) => {
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
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
            />
          </LocalizationProvider>
        )}
      />
    );
  };