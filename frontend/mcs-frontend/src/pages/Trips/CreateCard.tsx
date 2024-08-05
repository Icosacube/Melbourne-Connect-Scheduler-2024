import React from 'react';
import { Card, CardActionArea, CardContent, Box, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface CreateCardProps {
  onClick: () => void;
  name: string;
}

const CreateCard: React.FC<CreateCardProps> = ({ onClick, name }) => {
  return (
    <Card onClick={onClick} sx={{ height: '100%' }}>
      <CardActionArea sx={{ height: '100%' }}>
        <CardContent sx={{ height: '100%' }}>
          <Box 
            display="flex" 
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center" 
            sx={{ height: '100%' }}
          >
            <AddCircleIcon style={{ fontSize: 64, color: 'gray' }} />
            <Typography>Add New {name}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CreateCard;
