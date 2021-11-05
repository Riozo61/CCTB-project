import * as React from "react";
import { observer } from "mobx-react-lite";
import OrderButtons from "../../components/OrderButtons/OrderButtons";
import { List } from "@mui/material";
import OrderList from "../../components/OrderList/OrderList";

const Orders = observer(() => {

  return (
    <List>
      <OrderButtons />
      <OrderList/>
    </List>
  );
});

export default Orders;
