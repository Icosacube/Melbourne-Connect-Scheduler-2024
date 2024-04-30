import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Text from "@mui/material/Typography";
import * as React from "react";
import SideBarItems from "./SideBarItems";

function SideNavBar() {
  const itemList = ["Inbox", "Starred", "Send email", "Drafts"];
  return (
    <>
      <Drawer open={true} variant="permanent">
        <Box className="bg-blue-500 grow justify-center p-4">
          <Text className="text-white text-center ">Menu</Text>
          <List>
            {itemList.map((text, index) => (
              <SideBarItems key={index} text={text} />
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default SideNavBar;
