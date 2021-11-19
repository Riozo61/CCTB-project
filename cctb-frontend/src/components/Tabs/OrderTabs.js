import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { List } from "@mui/material";
import OrderButtons from "../OrderButtons/OrderButtons";
import OrderList from "../OrderList/OrderList";
import MaterialButtons from "../Materials/MaterialButtons";
import MaterialsList from "../Materials/MaterialsList";

export default function OrderTabs({orders}) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Закупки/заявки" value="1" />
            <Tab label="Материалы/оборудование" value="2" />
            <Tab label="Склад" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <List>
            <OrderButtons />
            {orders.order?.[0] && <OrderList order={orders.order}/>}
          </List>
        </TabPanel>
        <TabPanel value="2">
          <MaterialButtons/>
          <MaterialsList/>
        </TabPanel>
        <TabPanel value="3"></TabPanel>
      </TabContext>
    </Box>
  );
}
