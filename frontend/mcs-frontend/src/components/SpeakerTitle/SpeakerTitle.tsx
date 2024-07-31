import React, { ReactNode } from 'react';
import { Avatar, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

interface SpeakerTitleProps {
  firstname: string;
  lastname: string;
  organisation: string;
  children: ReactNode[]; // ReactNode[] allows any valid JSX/React children
}

export const SpeakerTitle: React.FC<SpeakerTitleProps> = ({ firstname, lastname, organisation, children }) => {
  return (
    <Card>
      <Card sx={{ p: 1, flexGrow: 1, minWidth: '320px', maxWidth: '480px', height: '128px' }}>
        <CardContent className="flex flex-row space-x-4 space-y-1">
          <Avatar className="size-24">A</Avatar>
          <Stack>
            <Typography className="text-2xl">
              {firstname} {lastname}
            </Typography>
            <Typography color="text.secondary">{organisation}</Typography>
            <Stack direction="row" flexWrap="wrap" spacing={1}>
              {children.map((child, index) => (
                <Chip key={index} label={child} />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Card>
  );
}

