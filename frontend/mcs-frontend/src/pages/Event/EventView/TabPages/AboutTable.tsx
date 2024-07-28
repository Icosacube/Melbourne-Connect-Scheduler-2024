import { Box, Stack, TextField, Typography } from "@mui/material";
import React, { FC } from "react";
import { Event } from "../../../../types/types";

interface AboutTableProps {
  event: Event;
}

interface CustomTextAreaProps {
  title: string;
  text: string;
  minRows?: number;
}

const CustomTextArea: FC<CustomTextAreaProps> = ({ title, text, minRows }) => {
  return (
    <Stack>
      <Typography variant="subtitle1" className="text-gray-400">
        {title}
      </Typography>
      <TextField
        disabled
        minRows={minRows}
        multiline
        defaultValue={text}
        sx={{
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
          },
        }}
      />
    </Stack>
  );
};

export const AboutTable: FC<AboutTableProps> = ({ event }) => {
  const fakeAbstract =
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem  accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab  illo inventore veritatis et quasi architecto beatae vitae dicta sunt  explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut  odit aut fugit, sed quia consequuntur magni dolores eos qui ratione  voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum  quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam  eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat  voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam  corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?  Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse  quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo  voluptas nulla pariatur?";
  return (
    <Box className="w-full flex space-x-6">
      <Box className="w-1/2 space-y-4">
        <CustomTextArea title="Venue" text="Melbourne Connect" minRows={1} />
        <CustomTextArea
          title="Event Description"
          text="Event Description"
          minRows={5}
        />
      </Box>
      <Box className="w-1/2 space-y-4">
        <CustomTextArea
          title="Talk Abstract"
          text={fakeAbstract}
          minRows={10}
        />
      </Box>
    </Box>
  );
};

export default AboutTable;
