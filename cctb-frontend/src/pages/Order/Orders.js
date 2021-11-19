import React, { useContext, useEffect } from 'react'
import { observer } from "mobx-react-lite";
import OrderTabs from "../../components/Tabs/OrderTabs";
import { Context } from "../..";
import { getOrders } from '../../http/orderAPI';

const Orders = observer(() => {
  const {order} = useContext(Context)
  useEffect(() => {
    getOrders().then(data => {order.setOrder(data.rows)});
  }, [])
  return (
    <div>
    <OrderTabs orders={order}/>
    </div>
  );
});

export default Orders;
