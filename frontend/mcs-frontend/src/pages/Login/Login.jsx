import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";

function Login() {
  return (
    <Stack component="form" className="space-y-8">
      <Typography variant="h4">Login</Typography>
      <TextField required id="outlined-required" label="Username" />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <Button variant="contained">Login</Button>
    </Stack>
  );
}

export default Login;
