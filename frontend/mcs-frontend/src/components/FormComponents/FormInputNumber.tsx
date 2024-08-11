import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./FormInputProps";
import React from "react";

export const FormInputNumber = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) =>
          !isNaN(Number(value)) || "Please enter a valid number",
      }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};
