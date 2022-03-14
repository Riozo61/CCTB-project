import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { List } from "@mui/material";
import OrderButtons from "../Order/OrderButtons";
import OrderList from "../Order/OrderList";
import MaterialButtons from "../Materials/MaterialButtons";
import MaterialsList from "../Materials/MaterialsList";
import { Context } from "../..";
import { getOrders } from "../../http/axios/orderAPI";
import { getMaterials } from "../../http/axios/materialAPI";
import { getEquipment } from "../../http/axios/equipmentAPI";
import EquipmentList from "../Equipment/EquipmentList";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    textDecoration: "none",
    color: "white",
    borderRadius: theme.spacing(0.5),
    background: "green",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    marginRight: theme.spacing(6),
    marginLeft: theme.spacing(6)
  },
  tabPanel: {
    padding: 30
  },
  tabElement: {

  },


}));


export default function OrderTabs() {
  const { order } = useContext(Context);
  const { material } = useContext(Context);
  const { equipment } = useContext(Context);
  const classes = useStyles();
  useEffect(() => {
    getOrders().then((data) => {
      order.setOrder(data.rows);
    });
    getMaterials().then((data) => {
      material.setMaterial(data.rows);
    });
    getEquipment().then((data) => {
      equipment.setEquipment(data.rows);
    });
  }, []);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList variant="fullWidth" centered onChange={handleChange} aria-label="lab API tabs example">
            <Tab className={classes.tabElement} label="Заявки" value="1" />
            <Tab className={classes.tabElement} label="Склад" value="2" />
            {value === '1' ? <OrderButtons className={classes.button} /> : <MaterialButtons className={classes.button} />}
          </TabList>
        </Box>
        <TabPanel className={classes.tabPanel} value="1">
          <List>
            <OrderList />
          </List>
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="2">
          <MaterialsList />
          <EquipmentList />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
