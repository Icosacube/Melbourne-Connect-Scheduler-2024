import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

const pages = ["Events", "Trips", "People", "Finance", "Profile"];

function TopNavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box>
          {pages.map((page) => (
            <Button key={page} sx={{ color: "white" }}>
              {page}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default TopNavBar;
