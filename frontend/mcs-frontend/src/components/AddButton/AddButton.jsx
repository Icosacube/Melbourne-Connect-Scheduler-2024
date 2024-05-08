import { Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import React from "react";

function AddButton({ type }) {
  return (
    <Card p={1} sx={{ flexGrow:1 }}>
      <CardActionArea>
        <CardContent>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <AddBoxIcon sx={{fontSize: "48px"}} />
            <Typography className="text-2xl">
              New {type}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default AddButton;
