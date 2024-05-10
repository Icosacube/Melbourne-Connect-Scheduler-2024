import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

const pages = [
  {
    name: "Events",
    url: "/event",
  },
  {
    name: "Trips",
    url: "/trips",
  },
  {
    name: "People",
    url: "/people",
  },
  {
    name: "Finance",
    url: "/finance",
  },
  {
    name: "Components",
    url: "/components",
  },
];

function TopNavBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box className="flex">
          <Button key="Dashboard" className="text-white " href="/dashboard">
            Dashboard
          </Button>
        </Box>
        <Box className="flex justify-end grow space-x-10">
          {pages.map((page) => (
            <Button key={page.name} className="text-white " href={page.url}>
              {page.name}
            </Button>
          ))}

          <Avatar className="size-8">A</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default TopNavBar;
