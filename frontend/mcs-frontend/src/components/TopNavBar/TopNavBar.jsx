import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

const pages = ["Events", "Trips", "People", "Finance"];

function TopNavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box className="flex justify-end grow space-x-10">
          {pages.map((page) => (
            <Button key={page} className="text-white ">
              {page}
            </Button>
          ))}

          <Avatar className="size-8">A</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default TopNavBar;
