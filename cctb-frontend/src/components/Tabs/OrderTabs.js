import React, { useContext, useEffect } from 'react'
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
import { Context } from '../..';
import { getOrders } from '../../http/axios/orderAPI';
import { getMaterials } from '../../http/axios/materialAPI';

export default function OrderTabs() {
  const {order} = useContext(Context)
  const {material} = useContext(Context)
  useEffect(() => {
    getOrders().then(data => {order.setOrder(data.rows)});
    getMaterials().then(data => {material.setMaterial(data.rows)})
  }, [])
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", marginLeft: 'auto', marginRight: 'auto'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Закупки/заявки" value="1" />
            <Tab label="Материалы/оборудование" value="2" />
            <Tab label="Склад" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" >
          <List>
            <OrderButtons />
            {order.order?.[0] && <OrderList orders={order.order}/>}
          </List>
        </TabPanel>
        <TabPanel value="2">
          <MaterialButtons/>
          {material.material?.[0] && <MaterialsList materials={material.material}/>}
        </TabPanel>
        <TabPanel value="3"></TabPanel>
      </TabContext>
    </Box>
  );
}
