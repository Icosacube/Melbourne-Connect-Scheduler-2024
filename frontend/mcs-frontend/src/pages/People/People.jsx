import { Box, Button } from '@mui/material';
import React from 'react';
import PeopleTable from './PeopleTable';
import PeopleWidgets from './PeopleWidgets';
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
function People() {
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

export default People;
