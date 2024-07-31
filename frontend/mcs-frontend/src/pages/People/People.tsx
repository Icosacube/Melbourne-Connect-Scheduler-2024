import { Box, Button, Typography } from "@mui/material";
import React, { FC } from "react";
import { PeopleTable } from "./PeopleTable";
import { PeopleWidgets } from "./PeopleWidgets";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import CreatePeopleModal from "./CreatePeopleModal";
import { useLoaderData } from "react-router-dom";


export const People: FC = () => {
  // TODO: handle loaded info
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const speakers = useLoaderData();
  return (
    <Box className="space-y-8 flex flex-col">
      <Box className=" flex flex-col">
        <Button
          variant="contained"
          className=" flex space-x-2 bg-secondary hover:bg-accent hover:text-black mb-3 self-end h-12"
          onClick={handleOpen}
        >
          <AddCircleOutlineOutlined />
          <Typography>New Speaker</Typography>
        </Button>

        <CreatePeopleModal open={open} handleClose={handleClose} />
      </Box>

      <PeopleWidgets />
      <PeopleTable data={speakers} />
    </Box>
  );
};
