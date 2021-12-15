import React from "react";
import { Drawer } from "@mui/material";
import { MenuItem } from "@mui/material";

const AppDrawer = (props) => {
  return (
    <Drawer
      open={false}
    >
    <MenuItem>Проекты</MenuItem>
    <MenuItem>Заявки</MenuItem>

    </Drawer>
  );
};

export default AppDrawer;
