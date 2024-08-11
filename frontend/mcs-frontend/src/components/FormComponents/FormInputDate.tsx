import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StoreMallDirectory } from "@mui/icons-material";

export const FormInputDate = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label={label} 
            value={value} 
            onChange={onChange}
            format="DD/MM/YYYY"
            slotProps={{ textField: { fullWidth: true, size: "small" }
          }}/>
        </LocalizationProvider>
      )}
    />
  );
};
