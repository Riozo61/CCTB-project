import { observer } from 'mobx-react-lite';
import React from 'react';
import OrderItem from './OrderItem';

const OrderList = observer( ({orders}) => {

  return (
    <div>
      {orders.map((ord) => (
          <OrderItem key={ord.id} order={ord}/>
      ))}
    </div>
  )
}
)


export default OrderList
