import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';

function AddButton({ type, children }) {
  return (
    <Card p={1} sx={{ flexGrow: 1 }} className="bg-primary">
      <CardActionArea>
        <CardContent>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            {children}
            <Typography className="text-2xl text-white">New {type}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default AddButton;
