import { Box, Button } from '@mui/material';
import React, { FC } from 'react';
import {PeopleTable} from './PeopleTable';
import {PeopleWidgets} from './PeopleWidgets';
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
export const People:FC=()=> {
  return (
    <Box className="space-y-8 flex flex-col">
      <Button
        startIcon={<AddCircleOutlineOutlined />}
        variant="contained"
        className="self-end bg-accent2 hover:bg-primary hover:text-black">
        Add New
      </Button>

      <PeopleWidgets />
      <PeopleTable />
    </Box>
  );
}


