import { Box, Button, Typography } from "@mui/material";
import React, { FC } from "react";
import { SpeakerTable } from "./SpeakerTable";
import { SpeakerWidgets } from "./SpeakerWidgets";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { CreateSpeakerModal } from "./CreateSpeakerModal";
import { useLoaderData } from "react-router-dom";
import { Speaker, Trip } from "../../../types/frontendTypes";

export const Speakers: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { speakers, trips } = useLoaderData() as {
    speakers: Speaker[];
    trips: Trip[];
  };
  console.log(speakers);
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

        <CreateSpeakerModal handleClose={handleClose} open={open} />
      </Box>

      <SpeakerWidgets />
      <SpeakerTable speakers={speakers} trips={trips} />
    </Box>
  );
};
