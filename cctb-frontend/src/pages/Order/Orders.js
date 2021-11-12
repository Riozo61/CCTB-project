import * as React from "react";
import { observer } from "mobx-react-lite";
import OrderButtons from "../../components/OrderButtons/OrderButtons";
import { List } from "@mui/material";
import OrderList from "../../components/OrderList/OrderList";
import OrderTabs from "../../components/Tabs/OrderTabs";

const Orders = observer(() => {

  return (
    <div>
    <OrderTabs/>
    {/* <List>
      <OrderButtons />
      <OrderList/>
    </List> */}
    </div>
  );
});

export default Orders;
