import React from "react";
import { Drawer } from "@mui/material";
import { MenuItem } from "@mui/material";

const AppDrawer = () => {
  return (
    <Drawer
      open={false}
    >
    <MenuItem>Проекты</MenuItem>
    </Drawer>
  );
};

export default AppDrawer;
