import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

// Define the interface for the component props
interface AddButtonProps {
  type: string;
}

// Update the component definition
export const AddButton: FC<PropsWithChildren<AddButtonProps>> = ({ type, children }) => {
  return (
    <Card sx={{ flexGrow: 1, padding: 1 }} className="bg-primary">
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

