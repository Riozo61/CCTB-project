import React, { useContext, useEffect } from 'react'
import { observer } from "mobx-react-lite";
import OrderTabs from "../../components/Tabs/OrderTabs";


const Orders = observer(() => {

  return (
    <div>
    <OrderTabs/>
    </div>
  );
});

export default Orders;
