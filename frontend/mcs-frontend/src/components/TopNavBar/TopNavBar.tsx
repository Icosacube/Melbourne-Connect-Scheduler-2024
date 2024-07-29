import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useLocation } from "react-router-dom";
import DefaultTopNavBar from "./DefaultTopNavBar";

const pages = [
  {
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    name: "Events",
    url: "/events",
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
  { name: "Event", url: "/events/:id" },
];

export const TopNavBar: React.FC = () => {
  const curPath = useLocation().pathname;
  const isTopLevelPage = curPath.split("/").length - 1 === 1;
  const pageName = pages.find((page) => curPath.includes(page.url))?.name;

  return (
    <Toolbar className="bg-white h-24 shadow-md w-full">
      {isTopLevelPage ? <DefaultTopNavBar pageName={pageName} /> : <></>}
    </Toolbar>
  );
};
